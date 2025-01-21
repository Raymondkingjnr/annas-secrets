"use client";

import { currencyFormatter } from "@/utilis/formatter";
import Image from "next/image";
import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";

type Product = {
  name: string;
  price: number;
  image: string;
  stock: number;
  AddCart: () => void;
};

const naira_sign = "\u20A6";
const ProductCard = ({ name, price, image, stock, AddCart }: Product) => {
  return (
    <div className=" grid gap-4 w-[160px] md:w-full">
      <div className="">
        <Image
          src={image}
          alt={name}
          width={300}
          height={300}
          className=" object-contain rounded-md w-full"
        />
      </div>

      <p className=" text-base font-medium capitalize text-[#333333]">{name}</p>
      <h4 className=" text-base font-medium text-[#333333]">stock: {stock}</h4>

      <h2 className=" font-semibold text-[#333333]">
        {naira_sign} {currencyFormatter(price)}
      </h2>
      <button
        onClick={AddCart}
        className="group w-full flex items-center place-content-center gap-3 border-[#ddddd] border h-[45px] text-white rounded-md bg-[#4CAF50] hover:bg-[#388E3C] duration-300 ease-in-out transition "
      >
        <p className="pt-[1.3px] font-extralight flex items-center place-content-center gap-3 group-hover:scale-110 transition-transform duration-200 ease-in-out">
          <span>Add</span>
          <HiOutlineShoppingBag />
        </p>
      </button>
    </div>
  );
};

export default ProductCard;
