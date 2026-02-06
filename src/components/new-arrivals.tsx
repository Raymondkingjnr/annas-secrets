"use client";
import React from "react";
import useSWR from "swr";
import { motion } from "framer-motion";
import { Product } from "../../sanity.types";
import { getNewArrivalProduct } from "@/lib/api";
import ProductCard from "./product-card";
import { ProductCardSkeleton } from "./skeleton-comp";

const NewArrival = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
  const fetchNewArrivals = async () => {
    const newArrival = await getNewArrivalProduct();

    return newArrival;
  };

  const { data: newArrivals, isLoading } = useSWR(
    "get/new-arrivals",
    fetchNewArrivals,
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

  return (
    <div className=" max-w-[1800px] mx-auto px-5 md:px-[2rem]   lg:px-[4rem]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={textVariants}
        className=" flex flex-col justify-center items-center pb-6"
      >
        <h2 className="text-xl md:text-3xl pb-2 font-bold text-center text-[#251d14]">
          Back In Stock
        </h2>
        <div className=" h-[1.6px] w-[160px] md:w-[300px] bg-black mb-4" />
      </motion.div>

      {isLoading && <ProductSkeletonGrid count={4} />}

      <div className=" gridFit ">
        {newArrivals && newArrivals.length > 0 ?
          newArrivals
            .slice(0, 8)
            .map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))
        : <p>No New Arrivals.</p>}
      </div>
    </div>
  );
};

export default NewArrival;
