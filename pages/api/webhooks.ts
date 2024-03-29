import { prisma } from "@/util/prisma";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    return res.status(400).send("No stripe signature");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    // Handle different events
    console.log("event here", { event }, event?.type);
    switch (event?.type) {
      case "payment_intent.created":
        const payment_intent = event.data.object;
        break;
      case "charge.succeeded":
        const charge = event.data.object as Stripe.Charge;
        if (charge.payment_intent) {
          if (typeof charge.payment_intent === "string") {
            const order = await prisma.order.update({
              where: { paymentIntentID: charge.payment_intent },
              data: { status: "complete" },
            });
          }
        }
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    res.json({ received: true });
  } catch (error) {
    return res.status(400).send(`Webhook error: ${error.message}`);
  }
}
