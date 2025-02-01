"use client";
import React from "react";
import ProductCard from "../product-card";
import { motion } from "framer-motion";
// import { getAllProduct } from "@/lib/product/getAllProducts";
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

  console.log(products);

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
        className="md:max-w-[400px] px-4 mx-auto text-center"
      >
        <h2 className="text-xl font-thin text-black">Best Selling Products</h2>
        <p className=" text-text_color text-sm py-[1.2rem] leading-6">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam placeat
          minus dolor veniam culpa labore porro ab excepturi quia fugiat.
        </p>
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
