"use client";
// import { product } from "@/modals/products";
import useBasketStore from "@/store/store";
import React, { useEffect } from "react";
import { Product } from "../../sanity.types";

interface AddToCartButtonProps {
  product: Product;
  disable?: boolean;
}
const AddCartButton = ({ product, disable }: AddToCartButtonProps) => {
  const { addItem, removeItem, getCartCount } = useBasketStore();
  const cartCount = getCartCount(product._id);
  const handleAddToCart = () => {
    addItem(product);
  };
  const [isClient, setIsClient] = React.useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <div className=" flex items-center justify-center space-x-4">
      <button
        onClick={() => removeItem(product._id)}
        className={`w-8 h-8 rounded-3xl flex items-center justify-center transition-colors duration-200 ${
          cartCount === 0
            ? "bg-[#F5F5F5] cursor-not-allowed text-[#333333]"
            : "bg-base_color text-white hover:bg-base_color "
        }`}
      >
        <span
          className={`text-lg font-bold ${cartCount === 0 ? "text-gray-400" : "text-gray-200"}`}
        >
          -
        </span>
      </button>
      <span className=" text-[#333333] font-semibold"> {cartCount}</span>
      <button
        onClick={handleAddToCart}
        className={`w-8 h-8 rounded-3xl flex items-center justify-center transition-colors duration-200 ${
          disable
            ? "bg-[#F5F5F5] cursor-not-allowed text-[#333333]"
            : "bg-base_color text-white hover:bg-base_color"
        }`}
        disabled={disable}
      >
        <span className=" text-lg font-bold">+</span>
      </button>
    </div>
  );
};

export default AddCartButton;
