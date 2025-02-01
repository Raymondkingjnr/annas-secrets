"use client";
import useBasketStore from "@/store/store";
import React from "react";
import { PiEmptyThin } from "react-icons/pi";
import { useRouter } from "next/navigation";
import AddCartButton from "@/components/add-cart-button";
import Image from "next/image";
import { imageUrl } from "@/lib/image-url";
import { currencyFormatter } from "@/utilis/formatter";
import Loader from "@/components/loader";
// import PaystackPop from '@paystack/inline-js';

const CartPage = () => {
  const groupItems = useBasketStore((state) => state.getGroupedItems());
  const { push } = useRouter();
  const [isClient, setIsClient] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isClient) {
    return <Loader />;
  }

  console.log(setIsClient);

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
                <tr key={item.product._id} className="border-b shadow-md mb-4">
                  <td className="py-2 flex md:items-center">
                    <div
                      className="w-full h-full flex items-center cursor-pointer"
                      onClick={() =>
                        push(`/product/${item?.product.slug?.current}`)
                      }
                    >
                      <div className="w-20 h-20 sm:w-24 flex-shrink-0 mr-4">
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
                        <h2 className="text-xs pt-2 md:hidden flex font-semibold truncate">
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
        <div className="  w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
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

          <button
            disabled={isLoading}
            onClick={() => {}}
            className=" mt-[3rem] h-[40px] w-full bg-base_color rounded-md hover:bg-[#333333] duration-200 transition-all text-white"
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
