"use client";
import React from "react";
import ProductCard from "../product-card";
import { motion } from "framer-motion";
import { getFeaturedProduct } from "@/lib/api";
import useSWR from "swr";
import { ProductCardSkeleton } from "../skeleton-comp";
import Link from "next/link";

const BestSelling = () => {
  const fetchProducts = async () => {
    const products = await getFeaturedProduct();

    return products;
  };

  const { data: featuredProducts, isLoading } = useSWR(
    `get/allPost`,
    fetchProducts,
  );

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
    <div className=" px-5 md:px-[2rem]   lg:px-[4rem] mb-[8rem] max-w-[1800px] mx-auto ">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={textVariants}
        className=" flex  justify-between md:px-[2rem] px-1 pb-4 items-center"
      >
        <h2 className="text-lg  md:text-2xl font-bold text-center text-[#251d14]">
          Featured Products
        </h2>
        <Link
          href="/products"
          className=" text-base text-[#b5844d]   underline font-semibold"
        >
          See All
        </Link>
      </motion.div>
      {isLoading && <ProductSkeletonGrid count={4} />}

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
