import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import Stripe from "stripe";
import { authOptions } from "./auth/[...nextauth]";
import { Prisma, PrismaClient } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

const prisma = new PrismaClient();

const calculateOrderAmount = (items: AddCartType[]) => {
  return items.reduce((total, item) => {
    return total + item.unit_amount! * item.quantity!;
  }, 0);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userSession = await getServerSession(req, res, authOptions);
  if (!userSession?.user) {
    res.status(403).json({ message: "Not loggen in" });
  }

  const { items, payment_intent_id } = req.body;
  // Create order data

  const orderData = {
    user: { connect: { id: userSession?.user?.id } },
    amount: calculateOrderAmount(items),
    currency: "pkr",
    status: "pending",
    paymentIntentID: payment_intent_id,
    products: {
      create: items.map((item) => ({
        name: item.name,
        description: item.description || null,
        unit_amount: parseFloat(item.unit_amount),
        quantity: item.quantity,
        image: item.image,
      })),
    },
  };

  // Check if payment intent id exists then just update the amount else create one
  if (payment_intent_id) {

    const currentIntent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );

    if (currentIntent) {
      const updatedIntent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: calculateOrderAmount(items) }
      );
      // Fetch order with product ids
      const existingOrder = await prisma.order.findFirst({
        where: { paymentIntentID: updatedIntent.id },
        include: { products: true },
      });

      if (!existingOrder) {
        res.status(400).json({ message: "Invalid Payment Intent" });
      }

      const upadatedOrder = await prisma.order.update({
        where: { id: existingOrder?.id },
        data: {
          amount: calculateOrderAmount(items),
          products: {
            deleteMany: {},
            create: items.map((item) => ({
              name: item.name,
              description: item.description || null,
              unit_amount: parseFloat(item.unit_amount),
              quantity: item.quantity,
              image: item.image,
            })),
          },
        },
      });

      res.status(200).json({ paymentIntent: updatedIntent });
    }
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "pkr",
      automatic_payment_methods: { enabled: true },
    });
    orderData.paymentIntentID = paymentIntent.id;
    const newOrder = await prisma.order.create({
      data: orderData,
    });
    res.status(200).json({ paymentIntent });
  }
}
