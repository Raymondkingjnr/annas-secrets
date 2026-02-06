import { getClientOrder } from "@/lib/api";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import Image from "next/image";
import OrderHistory from "@/components/order-details";
import { emptyStateImg } from "@/asset";

async function OrderPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const orders = await getClientOrder(userId);

  return (
    <div className="mt-[8rem] h-screen container mx-auto px-5">
      <h1 className="text-xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ?
        <div className=" grid place-content-center place-items-center">
          <div>
            <Image
              src={emptyStateImg}
              height={150}
              width={150}
              alt="./placeholder-image"
              className=" rounded-lg"
            />
          </div>
          <p className="text-base font-bold py-3 text-muted-foreground text-center">
            You have not placed any orders yet.
          </p>
        </div>
      : <OrderHistory orders={orders} />}
    </div>
  );
}

export default OrderPage;
