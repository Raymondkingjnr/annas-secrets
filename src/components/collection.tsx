"use client";
import React from "react";
import { motion } from "framer-motion";
import { getCategory } from "@/lib/api";
import useSWR from "swr";
import { Category } from "../../sanity.types";
import { imageUrl } from "@/lib/image-url";

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
    <div className=" max-w-[1500px] mx-auto pt-[2rem]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={textVariants}
        className=""
      >
        <h2 className="text-xl md:text-3xl font-bold text-center text-[#251d14]">
          Our Collection
        </h2>
      </motion.div>

      <div className=" gridFit pt-6">
        {categories && categories.length > 0 ?
          categories.map((category: Category) => (
            <div className=" border rounded-md p-2" key={category._id}>
              <div className="w-[300] h-[400px]  bg-gray-100 rounded-sm ">
                {category?.image && (
                  <img
                    src={imageUrl(category.image).url()}
                    alt={category.slug?.current || "Product Image"}
                    className="object-cover rounded-md w-[300] h-[400px] "
                  />
                )}
              </div>
              <div className=" border rounded-md my-2 cursor-pointer ">
                <p className=" text-center py-2  font-bold text-sm capitalize">
                  {category.name}
                </p>
              </div>
            </div>
          ))
        : <p>No categories found.</p>}
      </div>
    </div>
  );
};

export default Collection;
