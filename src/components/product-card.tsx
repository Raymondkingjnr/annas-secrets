"use client";

import { currencyFormatter } from "@/utilis/formatter";
import React from "react";
import { Product } from "../../sanity.types";
import { imageUrl } from "@/lib/image-url";
import AddCartButton from "./add-cart-button";
import Image from "next/image";
import Link from "next/link";

export const naira_sign = "\u20A6";
const ProductCard = ({ product }: { product: Product }) => {
  const isOutOfStock = product?.stock === null && product?.stock <= 0;

  return (
    <div
      className={`group grid shadow-md rounded-lg border border-gray-400 w-[300px] ${isOutOfStock ? " opacity-50" : ""}`}
    >
      <Link href={`/product/${product?.slug?.current}`}>
        <div className=" relative aspect-square rounded-t-lg bg-white overflow-hidden">
          <div className=" h-[250px] w-[280px]   ">
            {product.image && (
              <div className=" ">
                <Image
                  width={280}
                  height={280}
                  src={imageUrl(product.image).url()}
                  alt={product.slug?.current || "Product Image"}
                  className="object-contain rounded-md w-[280px] h-[280px] "
                />
              </div>
            )}
          </div>
          {isOutOfStock && (
            <div className=" absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className=" text-white font-bold text-lg z-10">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="  p-4 ">
        <div className=" py-2 flex justify-between items-center">
          <div>
            <p className="  text-xs md:text-sm font-bold capitalize">
              {product.name ?? ""}
            </p>
            <p className=" pt-[2px] text-sm font-bold text-gray-500">
              In Stock: {product.stock ?? 0}
            </p>
          </div>
        </div>
        <div className=" flex justify-between pb-3 items-center gap-4">
          <h2 className=" font-bold text-lg  text-[#333333]">
            {naira_sign} {currencyFormatter(Number(product?.price))}
          </h2>
          <AddCartButton product={product} disable={isOutOfStock} />
        </div>
        {/* <Link
          className=" border border-[#e7ba9e] py-2 w-full text-center rounded-md text-sm font-bold text-[#57524b]"
        >
          Details
        </Link> */}
      </div>
    </div>
  );
};

export default ProductCard;
