"use client";

import { currencyFormatter } from "@/utilis/formatter";
import Image from "next/image";
import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Product } from "../../sanity.types";
import { imageUrl } from "@/lib/image-url";
import Link from "next/link";
import { shortenDescription } from "@/utilis/descriptionShorten";

const naira_sign = "\u20A6";
const ProductCard = ({ product }: { product: Product }) => {
  const isOutOfStock = product?.stock != null && product?.stock <= 0;
  return (
    <Link
      href={`/product/${product?.slug?.current}`}
      className={`group grid shadow-md rounded-md p-4 w-full md:w-full ${isOutOfStock ? " opacity-50" : ""}`}
    >
      <div className=" relative aspect-square overflow-hidden">
        {product.image && (
          <div className=" grid place-content-center">
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
          <div className=" absolute inset-0 flex items-center justify-center">
            <span className=" text-black font-bold text-lg z-10">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className=" pl-1">
        <p className="  text-sm md:text-lg mt-8  font-bold capitalize text-[#333333]">
          {product.name ?? ""}
        </p>
        <p className=" text-xs font-semibold text-text_color py-3 leading-6 ">
          {shortenDescription(product?.description ?? "", 170)}
        </p>
        <h2 className=" font-semibold text-sm  text-[#333333]">
          {naira_sign} {currencyFormatter(Number(product?.price))}
        </h2>
      </div>
    </Link>
  );
};

export default ProductCard;
