"use client";
import React from "react";
import ProductCard from "../product-card";
import { motion } from "framer-motion";
import { getFeaturedProduct } from "@/lib/api";
import useSWR from "swr";

const BestSelling = () => {
  const fetchProducts = async () => {
    const products = await getFeaturedProduct();

    return products;
  };

  const { data: featuredProducts } = useSWR(`get/allPost`, fetchProducts);

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
    <div className=" px-5 md:px-[2rem]   lg:px-[4rem] mb-[8rem] max-w-[1800px] mx-auto ">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={textVariants}
        className=" flex flex-col justify-center items-center pb-6"
      >
        <h2 className="text-xl  md:text-4xl pb-2 font-bold text-center text-[#251d14]">
          Featured Products
        </h2>
        <div className=" h-[1.6px] w-[170px] md:w-[300px] bg-black mb-4" />
      </motion.div>

      <motion.div
        className=" gridFit  "
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={itemVariants}
      >
        {featuredProducts && featuredProducts.length > 0 ?
          featuredProducts?.slice(0, 8).map((item) => (
            <motion.main
              key={item._id}
              className="relative"
              variants={itemVariants}
            >
              <ProductCard key={item._id} product={item} />
            </motion.main>
          ))
        : <p>No Featured Products.</p>}
      </motion.div>
    </div>
  );
};

export default BestSelling;
