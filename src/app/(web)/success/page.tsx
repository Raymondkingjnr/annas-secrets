"use client";
import React, { useEffect, useState } from "react";
import { CircleCheckIcon } from "lucide-react";
import { Order } from "../../../../sanity.types";

const SuccessPage = () => {
  const [order, setOrder] = useState<Order>();

  useEffect(() => {
    const storedOrder = sessionStorage.getItem("order");
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    }
  }, []);

  if (!order) {
    return;
  }

  return (
    <div className="min-h-screen px-4 flex items-center justify-center">
      <div className="max-w-lg w-full py-10 rounded-md flex flex-col justify-center items-center shadow-2xl px-4">
        <main className="h-[50px] w-[50px] rounded-3xl  ">
          <CircleCheckIcon size={40} color="#089246" />
        </main>
        <h2 className=" font-medium text-base md:text-lg flex justify-start">
          Order Number:
        </h2>
        <p className=" font-medium text-sm md:text-xl pb-6 ">
          {order.orderNumber ?? ""}
        </p>
        <p className="text-black font-medium text-lg w-full md:w-[400px] text-center leading-6">
          Thanks you{" "}
          <span className=" capitalize font-semibold text-xl">
            {order.customerName}
          </span>{" "}
          for shopping from Annas skincare!
        </p>

        <div className="flex flex-col gap-2 justify-center border border-gray-600 rounded-lg items-center p-4 mt-9">
          <p className=" font-semibold text-xl">We have Received your order</p>
          <h2 className=" text-center text-base font-medium pt-5 md:px-6 text-gray-600">
            {} We have received your order and will confirm your payment within
            the next 2 hours. Kindly note that a confirmation message will be
            sent to your as soon as we receive your payment
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
