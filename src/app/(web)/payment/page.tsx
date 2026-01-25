"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { currencyFormatter } from "@/utilis/formatter";
import { naira_sign } from "@/components/product-card";
import useBasketStore from "@/store/store";
import { Button } from "@/components/ui/button";
import { Order } from "../../../../sanity.types";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

const PaymentScreen = () => {
  const searchParams = useSearchParams();
  const address = searchParams.get("address");
  const phone = searchParams.get("phone");
  const [isLoading, setIsLoading] = React.useState(false);

  const groupItems = useBasketStore((state) => state.getGroupedItems());
  const totalAmount = useBasketStore.getState().getTotalPrice();
  const clearBaseket = useBasketStore((state) => state.clearBasket);
  const { user } = useUser();
  const { push } = useRouter();

  const saveOrderToSanity = async (orderDetails: Order) => {
    try {
      const response = await fetch("/api/save-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        throw new Error("Failed to save order");
      }

      return response.json();
    } catch (error) {
      console.error("Error saving order to Sanity:", error);
      throw error;
    }
  };

  const handlePaymentComfirmation = async () => {
    setIsLoading(true);

    const orderDetails = {
      products: groupItems.map((item) => ({
        _key: uuidv4(),
        product: {
          _type: "reference",
          _ref: item.product._id,
        },
        quantity: item.quantity,
      })),
      totalPrice: totalAmount,
      orderNumber: crypto.randomUUID(),
      clerkUserId: user?.id,
      status: "pending",
      OrderDate: new Date().toISOString(),
      email: user?.emailAddresses?.[0]?.emailAddress ?? "",
      customerName: user?.firstName ?? "",
      phone: phone,
      address: address,
    } as Partial<Order>;

    try {
      const orderItem = await saveOrderToSanity(orderDetails as Order);
      toast.success("Order succefully saved");
      clearBaseket();
      sessionStorage.setItem("order", JSON.stringify(orderItem.order));
      push("/success");
    } catch (error) {
      console.error("Error saving order to Sanity:", error);
      alert(
        "Failed to save order. Please contact support, if you have made payment",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" px-4 mt-[6rem] flex items-center justify-center">
      <div className="max-w-2xl w-full py-10 rounded-md shadow-2xl px-4">
        <p className=" flex justify-end text-base font-normal">{address}</p>
        <main className=" flex pt-4 justify-between items-center border-b border-gray-300 pb-3">
          <p className=" font-semibold">Payment Method</p>
          <h1 className="font-semibold">Direct Bank transfer</h1>
        </main>

        <main className=" flex justify-between mt-5">
          <p className=" text-lg font-semibold">Total</p>
          <span className=" text-lg font-semibold text-black">
            {naira_sign}
            {currencyFormatter(useBasketStore.getState().getTotalPrice())}
          </span>
        </main>
        <main className="mt-5">
          <p>
            Kindly make payment for this order directly into our bank details as
            stated below.As soon as we receive your payment, we will confirm
            your payment and you will get a mail so you don&apos;t need to send
            us a message.Please note that this order will be <b>CANCELLED</b> IF
            we don&apos;t receive your payment within 1 hour after order has
            been placed.
          </p>
          <h2 className=" font-medium text-xl py-4">Our Bank Details</h2>
          <p className="text-lg font-semibold mt-[1.7rem]">Annas Skincare:</p>
          <div className=" flex gap-[4rem] mt-1 ">
            <div className=" ">
              <p>Bank:</p>
              <p className=" font-bold text-base">Moniepoint</p>
            </div>
            <div>
              <p>Account Number:</p>
              <p className=" font-bold text-base">0000111122</p>
            </div>
          </div>

          <Button
            className=" mt-5 w-[200px] font-bold flex justify-center items-center"
            onClick={handlePaymentComfirmation}
          >
            {isLoading ?
              <Spinner />
            : "I have Paid"}
          </Button>
        </main>
      </div>
    </div>
  );
};

export default PaymentScreen;
