"use client";
import React from "react";
import { motion } from "framer-motion";
import { getCategory } from "@/lib/api";
import useSWR from "swr";
import { Category } from "../../sanity.types";
import { imageUrl } from "@/lib/image-url";
import Link from "next/link";
import Image from "next/image";
import { ProductCardSkeleton } from "./skeleton-comp";

const Collection = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
  const fetchCategories = async () => {
    const categories = await getCategory();

    return categories;
  };

  const { data: categories, isLoading } = useSWR(
    "get/categories",
    fetchCategories,
  );

  const ProductSkeletonGrid = ({ count = 4 }: { count?: number }) => {
    return (
      <div className=" gridFit gap-3 my-[4rem]">
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };

  return (
    <div className=" max-w-[1500px] px-5 md:px-0 mx-auto pt-[5rem]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={textVariants}
        className=" flex justify-between md:px-[2rem] px-1 items-center pb-2"
      >
        <h2 className="text-xl md:text-2xl font-bold text-center  text-[#251d14]">
          Collection
        </h2>
        <Link
          href={"/service"}
          className=" text-base text-[#b5844d]   underline font-semibold"
        >
          See All
        </Link>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={itemVariants}
        className=" gridFit "
      >
        {isLoading ?
          <ProductSkeletonGrid count={2} />
        : categories && categories.length > 0 ?
          categories.map((category: Category) => (
            <motion.main
              key={category._id}
              className="relative"
              variants={itemVariants}
            >
              <div
                className=" border md:w-fit border-gray-400 rounded-md p-2"
                key={category._id}
              >
                <div className=" md:w-[280px] md:h-[280px]  bg-gray-100 rounded-sm ">
                  {category?.image && (
                    <Image
                      width={280}
                      height={280}
                      src={imageUrl(category.image).url()}
                      alt={category.slug?.current || "Product Image"}
                      className="object-contain rounded-md md:w-[280px] md:h-[280px] "
                    />
                  )}
                </div>
                <div className=" border rounded-md my-2 cursor-pointer ">
                  <Link
                    href={`/products/${category.slug?.current}`}
                    className=" text-center py-2 flex justify-center items-center font-bold text-xs md:text-sm capitalize"
                  >
                    {category.name}
                  </Link>
                </div>
              </div>
            </motion.main>
          ))
        : <p>No categories found.</p>}
      </motion.div>
    </div>
  );
};

export default Collection;
