"use client";
import useBasketStore from "@/store/store";
import React from "react";
import { PiEmptyThin } from "react-icons/pi";
import { useRouter } from "next/navigation";
import AddCartButton from "@/components/add-cart-button";
import Image from "next/image";
import { imageUrl } from "@/lib/image-url";
import { currencyFormatter } from "@/utilis/formatter";
import { v4 as uuidv4 } from "uuid";
import Loader from "@/components/loader";

const CartPage = () => {
  const groupItems = useBasketStore((state) => state.getGroupedItems());
  const clearBaseket = useBasketStore((state) => state.clearBasket);
  const { push } = useRouter();
  const [isClient, setIsClient] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [customerName, setCustomerName] = React.useState("");
  const [phone, setPhone] = React.useState<string>("");
  const [address, setAddress] = React.useState<string>("");

  React.useEffect(() => {
    setIsClient(true); // Mark that the component is now running on the client
    setIsLoading(false);
  }, []);

  if (!isClient) {
    return <Loader />; // Show a loader while waiting for client-side rendering
  }

  const saveOrderToSanity = async (orderDetails) => {
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

  const handleCheckout = async () => {
    setIsLoading(true);
    const PaystackPop = (await import("@paystack/inline-js")).default;
    const paystack = new PaystackPop();
    const totalAmount = useBasketStore.getState().getTotalPrice();

    paystack.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_KEY || "", // Your Paystack public key
      email,
      amount: totalAmount * 100, // Convert to kobo
      currency: "NGN",
      lastName: customerName,
      firstName: address,
      phone,

      onSuccess: async (transaction) => {
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
          status: "Paid",
          OrderDate: new Date().toISOString(),
          email: email,
          customerName: customerName,
          phone: phone,
          address: address,
        };
        console.log(transaction);

        try {
          await saveOrderToSanity(orderDetails);
          setIsLoading(false);
          push("/"); // Redirect to a success page
          clearBaseket();
        } catch (error) {
          setIsLoading(false);
          console.error("Error saving order to Sanity:", error);
          alert("Failed to save order. Please contact support.");
        }
      },
      onCancel: () => {
        setIsLoading(false);
        alert("Payment was cancelled");
      },
    });
  };

  const naira_sign = "\u20A6";
  if (groupItems.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] container mx-auto p-4 flex-col">
        <h1 className=" text-2xl font-bold mb-6 text-gray-800">Your Cart</h1>
        <PiEmptyThin size={40} />
        <p className=" text-gray-600 text-lg">You Cart is Empty</p>
        <button
          className=" bg-base_color text-white px-4 py-2 mt-4 rounded-md hover:bg-[#333333] duration-200 transition-all"
          onClick={() => push("/products")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }
  return (
    <div className=" container mx-auto pt-[7rem] px-4 md:px-0">
      <h1 className=" text-xl font-normal mb-4 text-center pb-4 text-black">
        Your Cart
      </h1>
      <div className=" flex flex-col gap-8 lg:flex-row ">
        <div className="flex-grow">
          <table className="min-w-full bg-white">
            <thead className=" hidden md:table-header-group pb-5">
              <tr>
                <th className="py-2">Product</th>
                <th className="py-2">Price</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Total</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupItems.map((item) => (
                <tr
                  key={item.product._id}
                  className="border-b shadow-md rounded-lg mb-8 pt-6"
                >
                  <td className="py-2 flex md:items-center">
                    <div
                      className="w-full h-full flex items-center cursor-pointer"
                      onClick={() =>
                        push(`/product/${item?.product.slug?.current}`)
                      }
                    >
                      <div className="w-20 h-20 sm:w-24 flex-shrink-0 mr-4 pl-3">
                        {item.product.image && (
                          <Image
                            src={imageUrl(item.product.image).url()}
                            alt={item.product.name ?? ""}
                            width={80}
                            height={80}
                            className="rounded-md w-[80px] object-contain"
                          />
                        )}
                      </div>
                      <div>
                        <h2 className="font-semibold pt-1 truncate text-xs">
                          {item.product.name}
                        </h2>
                        <h2 className="text-xs pt-2 md:hidden flex font-semibold truncate text-black">
                          {naira_sign}{" "}
                          {currencyFormatter(
                            (item.product.price ?? 0) * item.quantity
                          )}
                        </h2>
                      </div>
                    </div>
                  </td>
                  <td className="hidden md:table-cell py-2 text-center text-xs font-semibold text-black">
                    {naira_sign} {currencyFormatter(item.product.price ?? 0)}
                  </td>
                  <td className="py-2 text-center text-xs font-semibold hidden md:table-cell text-black">
                    {item.quantity}
                  </td>
                  <td className="hidden md:table-cell py-2 text-center text-xs font-semibold text-black">
                    {naira_sign}{" "}
                    {currencyFormatter(
                      (item.product.price ?? 0) * item.quantity
                    )}
                  </td>
                  <td className="py-2 text-center text-sm">
                    <AddCartButton product={item.product} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="  w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-4 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
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
          <main className=" my-6 grid gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-4 p-2 border active:outline-none outline-none text-sm rounded w-full"
            />
            <input
              type="address"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-4 p-2 border active:outline-none outline-none text-sm rounded w-full"
            />
            <input
              type="text"
              placeholder="Enter your name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="mt-4 p-2 border active:outline-none outline-none text-sm rounded w-full"
            />
            <input
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-4 p-2 border active:outline-none outline-none text-sm rounded w-full"
            />
          </main>
          <button
            disabled={isLoading}
            onClick={handleCheckout}
            className=" mt-[1rem] h-[40px] w-full bg-base_color rounded-md hover:bg-[#333333] duration-200 transition-all text-white"
          >
            {isLoading ? "Processing..." : "Checkout"}
          </button>
        </div>
        <div className=" h-64 lg:h-0">{/* SPaceer */}</div>
      </div>
    </div>
  );
};

export default CartPage;
