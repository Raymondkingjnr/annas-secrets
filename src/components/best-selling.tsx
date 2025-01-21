"use client";
import React from "react";
import ProductCard from "./product-card";
import { motion } from "framer-motion";
import { getProducts } from "@/lib/api";
import useSWR from "swr";

const BestSelling = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 5;

  const fetchProducts = async () => {
    const products = await getProducts(currentPage, pageSize);

    return products;
  };

  const {
    data: products,
    // isLoading,
    // error,
  } = useSWR(`get/allPost?page=${currentPage}`, fetchProducts);

  console.log(setCurrentPage);

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
    <div className=" px-[1rem] md:px-[2rem] lg:px-[4rem] mt-[5rem] mb-[5rem] ">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={textVariants}
      >
        <div>
          <h2 className=" md:text-3xl text-2xl font-thin text-black">
            Best Selling Products
          </h2>

          <div className=" h-[2px] w-[170px] md:w-[200px] mt-3 bg-[#DDDDDD]" />
        </div>
      </motion.div>

      <motion.div
        className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-8  pt-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={itemVariants}
      >
        {products?.map((item, index) => (
          <motion.main key={index} className="relative" variants={itemVariants}>
            <ProductCard
              key={index}
              image={item.image.asset.url}
              name={item.name}
              price={item.price}
              stock={item.stock}
              AddCart={() => {}}
            />
          </motion.main>
        ))}
      </motion.div>
    </div>
  );
};

export default BestSelling;
