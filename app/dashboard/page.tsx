import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { formatPrice } from "@/util/PriceFormat";
import { prisma } from "@/util/prisma";
import { getServerSession } from "next-auth";
import Image from "next/image";

export const revalidate = 0;

const fetchOrders = async () => {
  const user = await getServerSession(authOptions);
  if (!user)
    return null;
  const orders = await prisma.order.findMany({
    where: {
      userId: user?.user?.id,
      status: 'complete'
    },
    include: {
      products: true
    },
    orderBy: {
      createdAt: 'desc'
    }

  })
  return orders;
}


export default async function Dashboard() {
  const orders = await fetchOrders();

  if (orders === null) return (<div>You need to be logged in to view your orders.</div>)
  if (orders.length === 0) return (<div>No orders placed.</div>)
  return (
    <div>
      <div>
        {orders.map((order) => (
          <div key={order.id} className="rounded-lg p-8 my-4 space-y-2 bg-base-200">
            <h2 className="text-xs font-medium">Order reference: {order.id}</h2>
            <p className="text-xs my-2">Status:
              <span className={`${order.status === 'complete' ? 'bg-teal-500' : 'bg-yellow-500'} 
              text-white py-1 px-2 mx-2 rounded-md text-xs`}
              >
                {`${order.status}`}
              </span>
            </p>
            <p className="text-xs">Order date: {new Date(order.createdAt).toLocaleString()}</p>
            <div className="text-sm lg:flex items-center gap-2">
              {order.products.map((product) => (
                <div className="py-2" key={product.id}>
                  <h2 className="py-2">{product.name}</h2>
                  <div className="flex items-center gap-2">
                    <Image
                      src={product.image!}
                      alt={product.name}
                      width={36}
                      height={36}
                      priority={true}
                      className="rounded-md object-cover h-8 w-8"
                    />
                    <p>{formatPrice(product.unit_amount)}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div> 
              ))}
            </div>
            <p> Total: {formatPrice(order.amount)}</p>
          </div>
        )
        )}
      </div>
    </div>
  )
}
