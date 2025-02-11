"use client";
import React from "react";
import ProductCard from "../product-card";
import { motion } from "framer-motion";
import { getTopSales } from "@/lib/api";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { GrFormNext } from "react-icons/gr";

const BestSelling = () => {
  const route = useRouter();
  const fetchProducts = async () => {
    const products = await getTopSales();

    return products;
  };

  const {
    data: products,
    // isLoading,
    // error,
  } = useSWR(`get/allPost`, fetchProducts);

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };
  return (
    <div className=" px-[1rem] md:px-[2rem] lg:px-[4rem] my-[6rem] ">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={textVariants}
        className=" flex justify-between items-center"
      >
        <h2 className="text-sm md:text-base font-thin text-black">
          Best Selling Products
        </h2>
        <span className=" flex items-center gap-1">
          <p
            className=" text-base_color md:text-base text-xs underline cursor-pointer"
            onClick={() => route.push("/products")}
          >
            view more
          </p>
          <GrFormNext className=" mt-[1px] text-base_color" />
        </span>
      </motion.div>

      <motion.div
        className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-8  pt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={itemVariants}
      >
        {products?.map((item) => (
          <motion.main
            key={item._id}
            className="relative"
            variants={itemVariants}
          >
            <ProductCard key={item._id} product={item} />
          </motion.main>
        ))}
      </motion.div>
    </div>
  );
};

export default BestSelling;
