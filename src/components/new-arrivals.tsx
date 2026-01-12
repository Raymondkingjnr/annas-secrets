"use client";
import React from "react";
import useSWR from "swr";
import { imageUrl } from "@/lib/image-url";
import Link from "next/link";
import { motion } from "framer-motion";
import { NewArrivals, Product } from "../../sanity.types";
import { getAllNewArrivals } from "@/lib/api";
import Image from "next/image";
import { naira_sign } from "./product-card";
import { currencyFormatter } from "@/utilis/formatter";
import AddCartButton from "./add-cart-button";
import { useRouter } from "next/navigation";

const NewArrival = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
  const fetchNewArrivals = async () => {
    const newArrival = await getAllNewArrivals();

    return newArrival;
  };

  const { data: newArrivals } = useSWR("get/new-arrivals", fetchNewArrivals);

  const router = useRouter();

  return (
    <div className=" max-w-[1500px] mx-auto pb-[5rem] px-5">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={textVariants}
        className=""
      >
        <h2 className="text-xl md:text-3xl font-bold text-center text-[#251d14]">
          Our New Arrivals
        </h2>
      </motion.div>

      <div className=" gridFit pt-6">
        {newArrivals && newArrivals.length > 0 ?
          newArrivals.slice(0, 4).map((product: NewArrivals) => (
            <div
              className={`group grid shadow-md rounded-md p-4 w-full md:w-[300px] `}
              key={product._id}
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
                <div className=" flex justify-between items-center">
                  <button
                    className=" border border-[#e7ba9e] h-[40px] w-[120px] rounded-md text-sm font-bold text-[#57524b]"
                    onClick={() =>
                      router.push(
                        `/product/newArrival/${product?.slug?.current}`
                      )
                    }
                  >
                    Details
                  </button>
                  <AddCartButton product={product} />
                </div>
              </div>
            </div>
          ))
        : <p>No New Arrivals.</p>}
      </div>
    </div>
  );
};

export default NewArrival;
