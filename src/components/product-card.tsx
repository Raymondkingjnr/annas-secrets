"use client";

import { currencyFormatter } from "@/utilis/formatter";
import Image from "next/image";
import React from "react";
import { Product } from "../../sanity.types";
import { imageUrl } from "@/lib/image-url";
import AddCartButton from "./add-cart-button";
import { useRouter } from "next/navigation";

export const naira_sign = "\u20A6";
const ProductCard = ({ product }: { product: Product }) => {
  const isOutOfStock = product?.stock != null && product?.stock <= 0;

  const router = useRouter();
  return (
    <div
      className={`group grid shadow-md rounded-lg border border-gray-300 p-4 w-[300px] ${isOutOfStock ? " opacity-50" : ""}`}
    >
      <div className=" relative aspect-square overflow-hidden">
        {product.image && (
          <div className=" ">
            <Image
              src={imageUrl(product?.image).url()}
              alt={product.name ?? ""}
              width={200}
              height={200}
              className="  rounded-lg w-[340px] object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
        {isOutOfStock && (
          <div className=" absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className=" text-white font-bold text-lg z-10">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className=" pl-1 ">
        <div className=" py-5 flex justify-between items-center">
          <div>
            <p className="  text-xs md:text-sm font-bold capitalize">
              {product.name ?? ""}
            </p>
            <p className=" pt-[2px] text-sm font-bold text-gray-500">
              In Stock: {product.stock}
            </p>
          </div>
          <h2 className=" font-bold text-base  text-[#333333]">
            {naira_sign} {currencyFormatter(Number(product?.price))}
          </h2>
        </div>
        <div className=" flex justify-between items-center gap-4">
          <button
            className=" border border-[#e7ba9e] h-[40px] w-[120px] rounded-md text-sm font-bold text-[#57524b]"
            onClick={() => router.push(`/product/${product?.slug?.current}`)}
          >
            Details
          </button>
          <AddCartButton product={product} disable={isOutOfStock} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
