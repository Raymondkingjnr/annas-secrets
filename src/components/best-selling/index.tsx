"use client";
import React from "react";
import ProductCard from "../product-card";
import { motion } from "framer-motion";
import { getTopSales } from "@/lib/api";
import useSWR from "swr";

const BestSelling = () => {
  const fetchProducts = async () => {
    const products = await getTopSales();

    return products;
  };

  const { data: products } = useSWR(`get/allPost`, fetchProducts);

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
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
    <div className=" px-[1rem] md:px-[2rem] lg:px-[4rem] mb-[8rem] max-w-[1800px] mx-auto ">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={textVariants}
        className=""
      >
        <h2 className="text-xl md:text-3xl font-bold text-center text-[#251d14]">
          Featured Products
        </h2>
      </motion.div>

      <motion.div
        className=" gridFit  pt-10"
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
