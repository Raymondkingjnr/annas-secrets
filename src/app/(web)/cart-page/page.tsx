"use client";
import useBasketStore from "@/store/store";
import React from "react";
import { useRouter } from "next/navigation";
import AddCartButton from "@/components/add-cart-button";
import Image from "next/image";
import { imageUrl } from "@/lib/image-url";
import { currencyFormatter } from "@/utilis/formatter";
// import { v4 as uuidv4 } from "uuid";
import Loader from "@/components/loader";
import Modal from "@/components/modal";
// import toast from "react-hot-toast";
import { ClerkLoaded, SignInButton, useUser } from "@clerk/nextjs";
// import { Order } from "../../../../sanity.types";
import { Spinner } from "@/components/ui/spinner";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { emptyCartImg } from "@/asset";
import { Button } from "@/components/ui/button";

const CartPage = () => {
  const groupItems = useBasketStore((state) => state.getGroupedItems());
  // const clearBaseket = useBasketStore((state) => state.clearBasket);
  const { push } = useRouter();
  const [isClient, setIsClient] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [phone, setPhone] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { user } = useUser();

  React.useEffect(() => {
    setIsClient(true);
    setIsLoading(false);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  // const saveOrderToSanity = async (orderDetails: Order) => {
  //   try {
  //     const response = await fetch("/api/save-order", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(orderDetails),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to save order");
  //     }

  //     return response.json();
  //   } catch (error) {
  //     console.error("Error saving order to Sanity:", error);
  //     throw error;
  //   }
  // };

  // const handleCheckout = async () => {
  //   setIsLoading(true);

  //   if (!phone || !address) {
  //     alert("Please fill all fields");
  //   }
  //   const PaystackPop = (await import("@paystack/inline-js")).default;
  //   const paystack = new PaystackPop();
  //   const totalAmount = useBasketStore.getState().getTotalPrice();

  //   paystack.newTransaction({
  //     key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_TOKEN || "",
  //     email: user?.emailAddresses?.[0]?.emailAddress ?? "",
  //     amount: totalAmount * 100,
  //     currency: "NGN",
  //     lastName: user?.firstName ?? "",
  //     firstName: user?.lastName ?? "",
  //     phone,

  //     onSuccess: async (transaction) => {
  //       const orderDetails = {
  //         products: groupItems.map((item) => ({
  //           _key: uuidv4(),
  //           product: {
  //             _type: "reference",
  //             _ref: item.product._id,
  //           },
  //           quantity: item.quantity,
  //         })),
  //         totalPrice: totalAmount,
  //         orderNumber: crypto.randomUUID(),
  //         clerkUserId: user?.id,
  //         status: "Paid",
  //         OrderDate: new Date().toISOString(),
  //         email: user?.emailAddresses?.[0]?.emailAddress ?? "",
  //         customerName: user?.fullName ?? "",
  //         phone: phone,
  //         address: address,
  //       } as Partial<Order>;
  //       console.log(transaction);

  //       try {
  //         await saveOrderToSanity(orderDetails as Order);
  //         setIsLoading(false);
  //         push("/success"); // Redirect to a success page
  //         toast.success("Payment Successfull");
  //         clearBaseket();
  //       } catch (error) {
  //         setIsLoading(false);
  //         console.error("Error saving order to Sanity:", error);
  //         alert(
  //           "Failed to save order. Please contact support, with your payment receipt if you have been debited",
  //         );
  //       }
  //     },
  //     onCancel: () => {
  //       setIsLoading(false);
  //       toast.error("Payment was cancelled");
  //     },
  //   });
  // };

  const handlePaymentCheckout = () => {
    setIsLoading(true);
    push(`/payment?address=${address}&phone=${phone}`);
    setIsLoading(false);
  };

  const naira_sign = "\u20A6";
  if (groupItems.length === 0) {
    return (
      <div className="min-h-screen px-4 flex items-center justify-center">
        <div className="max-w-2xl w-full py-10 rounded-md flex flex-col items-center bg-transparent px-4">
          <div>
            <Image
              src={emptyCartImg}
              height={250}
              width={250}
              alt="./placeholder-image"
              className=" rounded-lg"
            />
          </div>
          <p className=" text-gray-600 text-lg py-5 font-semibold">
            You Cart is Empty
          </p>
          <button
            className=" bg-base_color text-white px-4 py-2 mt-4 rounded-md hover:bg-[#333333] duration-200 transition-all"
            onClick={() => push("/products")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className=" h-screen container mx-auto pt-6 mt-[6rem] px-4 md:px-0">
      <h1 className=" text-2xl md:text-3xl font-bold mb-4 text-center pb-4 text-black">
        Your Cart
      </h1>
      <div className=" grid lg:grid-cols-12 gap-8">
        <div className=" w-full lg:pr-4 lg:col-span-9 ">
          <Table className="bg-white">
            <TableHeader className="hidden md:table-header-group mb-3">
              <TableRow>
                <TableHead className=" font-bold">Product</TableHead>
                <TableHead className="text-center font-bold">Price</TableHead>
                <TableHead className="text-center font-bold">
                  Quantity
                </TableHead>
                <TableHead className="text-center font-bold">Total</TableHead>
                <TableHead className="text-center font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className=" mt-4">
              {groupItems.map((item) => (
                <TableRow key={item.product._id} className=" rounded-lg mb-8">
                  <TableCell className="py-4">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() =>
                        push(`/product/${item.product.slug?.current}`)
                      }
                    >
                      <div className="w-16 h-16 flex-shrink-0 mr-4">
                        {item.product.image && (
                          <Image
                            src={imageUrl(item.product.image).url()}
                            alt={item.product.name ?? ""}
                            width={70}
                            height={70}
                            className="rounded-md object-contain"
                          />
                        )}
                      </div>

                      <div>
                        <h2 className="font-bold text-sm capitalize truncate w-[100px] md:w-fit">
                          {item.product.name}
                        </h2>

                        {/* Mobile total */}
                        <p className="md:hidden text-sm font-semibold pt-2">
                          {naira_sign}{" "}
                          {currencyFormatter(
                            (item.product.price ?? 0) * item.quantity,
                          )}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="hidden md:table-cell text-center text-sm font-bold">
                    {naira_sign} {currencyFormatter(item.product.price ?? 0)}
                  </TableCell>

                  <TableCell className="hidden md:table-cell text-center text-sm font-bold">
                    {item.quantity}
                  </TableCell>

                  <TableCell className="hidden md:table-cell text-center text-sm font-bold">
                    {naira_sign}{" "}
                    {currencyFormatter(
                      (item.product.price ?? 0) * item.quantity,
                    )}
                  </TableCell>

                  <TableCell className="text-center">
                    <AddCartButton product={item.product} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="  bg-white p-4 rounded-lg shadow-lg lg:col-span-3  w-full h-fit">
          <h1 className=" text-lg font-normal">Order Summary</h1>
          <div className=" mt-4 space-y-2">
            <p className=" flex justify-between">
              <span className=" text-base font-medium">Items:</span>
              <span className=" text-xs font-semibold text-black">
                {groupItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </p>
            <p className=" flex justify-between text-lg font-thin border-t pt-2">
              <span className=" text-base font-medium">Total:</span>
              <span className=" text-base font-medium text-black">
                {naira_sign}
                {currencyFormatter(useBasketStore.getState().getTotalPrice())}
              </span>
            </p>
          </div>
          <Button
            onClick={() => user && setIsModalOpen(true)}
            className={`mt-[1rem]  w-full font-semibold rounded-md shadow 
              ${!user ? "bg-gray-500 text-white hover:bg-gray-600 " : "bg-[#d09e80] text-white hover:bg-[#bc8969]"} 
              transition-all duration-300`}
          >
            {!user ?
              <ClerkLoaded>
                <SignInButton>Sign In To Checkout</SignInButton>
              </ClerkLoaded>
            : "Proceed To Checkout"}
          </Button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h1 className=" text-lg font-normal pb-4 pt-8 text-center">
          Delivery Details
        </h1>
        <div className=" mt-4 space-y-2">
          <p className=" flex justify-between">
            <span className=" text-base font-medium">Items:</span>
            <span className=" text-xs font-semibold text-black">
              {groupItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </p>
          <p className=" flex justify-between text-lg font-thin border-t pt-2">
            <span className=" text-base font-medium">Total:</span>
            <span className=" text-base font-medium text-black">
              {naira_sign}
              {currencyFormatter(useBasketStore.getState().getTotalPrice())}
            </span>
          </p>
        </div>
        <main className=" my-6 grid gap-5 pt-5">
          <div>
            <label htmlFor="phone" className=" pl-2 pb-2 text-xs font-normal">
              Phone Number:
            </label>
            <input
              type="tel"
              // placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className=" p-2 border border-t-transparent border-gray-400 border-r-transparent border-l-transparent active:outline-none bg-white outline-none text-sm rounded w-full"
            />
          </div>

          <div>
            <label htmlFor="address" className=" pl-2 pb-2 text-xs font-normal">
              Enter full Address:
            </label>
            <input
              type="address"
              placeholder="Eg: 6 ebe street, abia state "
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className=" p-2 border border-t-transparent border-gray-400 border-r-transparent border-l-transparent active:outline-none bg-white outline-none text-sm rounded w-full"
            />
          </div>
        </main>
        <Button
          disabled={isLoading || !phone || !address}
          onClick={handlePaymentCheckout}
          className={` mt-[1rem] w-full flex justify-center items-center ${isLoading || !phone || !address ? "bg-gray-500" : "bg-[#bc8969]"}`}
        >
          {isLoading ?
            <Spinner />
          : "Continue to Payment"}
        </Button>
      </Modal>
    </div>
  );
};

export default CartPage;
