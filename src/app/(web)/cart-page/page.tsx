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
// import { M } from "@/components/modal"; // Import the Modal component
import Modal from "@/components/modal";
import toast from "react-hot-toast";

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
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    setIsLoading(false);
  }, []);

  if (!isClient) {
    return <Loader />;
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

    if (!customerName || !email || !phone || !address) {
      alert("Please fill all fields");
    }
    const PaystackPop = (await import("@paystack/inline-js")).default;
    const paystack = new PaystackPop();
    const totalAmount = useBasketStore.getState().getTotalPrice();

    paystack.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_TOKEN || "",
      email,
      amount: totalAmount * 100,
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
          alert(
            "Failed to save order. Please contact support, with your payment receipt"
          );
        }
      },
      onCancel: () => {
        setIsLoading(false);
        toast.error("Payment was cancelled");
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
    <div className=" container mx-auto pt-6 px-4 md:px-0">
      <h1 className=" text-xl font-normal mb-4 text-center pb-4 text-black">
        Your Cart
      </h1>
      <div className=" flex flex-col lg:flex-row justify-between gap-8">
        <div className=" w-full lg:pr-4">
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
                  className="shadow-lg rounded-lg mb-8 pt-6"
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
                            width={70}
                            height={70}
                            className="rounded-md w-[60px] object-contain"
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
        <div className="  bg-white p-4 rounded-lg shadow-lg  w-full lg:w-1/3 h-fit md:mt-10">
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
            onClick={() => setIsModalOpen(true)} // Open modal on button click
            className=" mt-[1rem] btn w-full "
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h1 className=" text-lg font-normal pb-4 pt-8 text-center">Shipping</h1>
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
            <label
              htmlFor="customerName"
              className=" pl-2 pb-2 text-xs font-normal"
            >
              Full Name:
            </label>
            <input
              type="text"
              // placeholder="Enter your name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className=" p-2 border border-t-transparent border-gray-400 border-r-transparent border-l-transparent active:outline-none bg-white outline-none text-sm rounded w-full"
            />
          </div>
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
            <label htmlFor="email" className=" pl-2 pb-2 text-xs font-normal">
              Email Address:
            </label>

            <input
              type="email"
              // placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" p-2 border border-t-transparent border-gray-400 border-r-transparent border-l-transparent active:outline-none bg-white outline-none text-sm rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="address" className=" pl-2 pb-2 text-xs font-normal">
              Address:
            </label>
            <input
              type="address"
              // placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className=" p-2 border border-t-transparent border-gray-400 border-r-transparent border-l-transparent active:outline-none bg-white outline-none text-sm rounded w-full"
            />
          </div>
        </main>
        <button
          disabled={isLoading || !email || !customerName || !phone || !address}
          onClick={handleCheckout}
          className=" mt-[1rem] btn w-full "
        >
          {isLoading ? "Processing..." : "Continue to Payment"}
        </button>
      </Modal>
    </div>
  );
};

export default CartPage;
