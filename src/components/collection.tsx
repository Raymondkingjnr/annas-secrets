"use client";
import React from "react";
import { motion } from "framer-motion";
import { getCategory } from "@/lib/api";
import useSWR from "swr";
import { Category } from "../../sanity.types";
import { imageUrl } from "@/lib/image-url";
import Link from "next/link";
import Image from "next/image";

const Collection = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
  const fetchCategories = async () => {
    const categories = await getCategory();

    return categories;
  };

  const { data: categories } = useSWR("get/categories", fetchCategories);

  return (
    <div className=" max-w-[1500px] px-5 md:px-0 mx-auto pt-[2rem]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={textVariants}
        className=" flex flex-col justify-center items-center pb-6"
      >
        <h2 className="text-xl md:text-4xl pt-5 pb-2 font-bold text-center  text-[#251d14]">
          Our Collection
        </h2>
        <div className=" h-[1.6px] w-[130px] md:w-[240px] bg-black mb-4" />
      </motion.div>

      <div className=" gridFit ">
        {categories && categories.length > 0 ?
          categories.map((category: Category) => (
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
          ))
        : <p>No categories found.</p>}
      </div>
    </div>
  );
};

export default Collection;
