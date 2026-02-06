"use client";
import React from "react";
import { getBrands } from "@/lib/api";
import { imageUrl } from "@/lib/image-url";
import Link from "next/link";
import Image from "next/image";
import { ProductCardSkeleton } from "./skeleton-comp";
import useSWR from "swr";
import { motion } from "framer-motion";

const BrandsCom = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
  const fetchBrands = async () => {
    const data = await getBrands();

    return data;
  };

  const { data: brandsList, isLoading } = useSWR("get/brands", fetchBrands);

  const ProductSkeletonGrid = ({ count = 4 }: { count?: number }) => {
    return (
      <div className=" gridFit gap-3 my-[4rem]">
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  };

  return (
    <div className=" max-w-[1500px] px-5 md:px-0 mx-auto mb-[5rem]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={textVariants}
        className=" flex justify-between px-1 md:px-[2rem] items-center w-full"
      >
        <h2 className="text-xl md:text-2xl pt-5 pb-2 font-bold text-center  text-[#251d14]">
          Brands
        </h2>

        <Link
          href={"/brands"}
          className=" text-base text-[#b5844d] pt-2  underline font-semibold"
        >
          See All
        </Link>
      </motion.div>

      <div className=" gridFit ">
        {isLoading ?
          <ProductSkeletonGrid count={2} />
        : brandsList && brandsList.length > 0 ?
          brandsList.slice(0, 4).map((brand) => (
            <div
              className=" border md:w-fit border-gray-400 rounded-md p-2"
              key={brand._id}
            >
              <div className=" md:w-[280px] md:h-[280px]  bg-gray-100 rounded-sm ">
                {brand?.image && (
                  <Image
                    width={280}
                    height={280}
                    src={imageUrl(brand.image).url()}
                    alt={brand.slug?.current || "Product Image"}
                    className="object-contain rounded-md md:w-[280px] md:h-[280px] "
                  />
                )}
              </div>
              <div className=" border rounded-md my-2 cursor-pointer ">
                <Link
                  href={`/brands/${brand.slug?.current}`}
                  className=" text-center py-2 flex justify-center items-center font-bold text-xs md:text-sm capitalize"
                >
                  {brand.name}
                </Link>
              </div>
            </div>
          ))
        : <p>No brandsList found.</p>}
      </div>
    </div>
  );
};

export default BrandsCom;
