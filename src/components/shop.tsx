"use client";

import React from "react";
import { shop_goals } from "../data";
import Image from "next/image";
import { motion } from "framer-motion";

const ShopGoal = () => {
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
    <div className="px-[1rem] md:px-[2rem] lg:px-[4rem] mt-[20px">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={textVariants}
        className="md:max-w-[500px] mx-auto text-left md:text-center"
      >
        <h2 className=" text-base font-thin text-black">Shop By Goal</h2>
        <p className=" text-text_color md:text-sm text-xs py-[1.2rem] leading-6">
          Explore a curated selection of premium supplements and wellness
          products designed to elevate your mind, body, and spirit. At
          Annassecret, we believe in the power of natural enhancement and
          holistic living.
        </p>
        {/* <div className="h-[2px] w-[170px] md:w-[200px] mt-3 bg-[#DDDDDD]" /> */}
      </motion.div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:grid-cols-5 place-items-center mt-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={itemVariants}
      >
        {shop_goals.map((items, index) => (
          <motion.main key={index} className="relative" variants={itemVariants}>
            <div className="w-full h-fit">
              <Image
                src={items.image}
                alt={items.name}
                width={300}
                height={300}
                className="object-cover rounded-md w-full"
              />
            </div>
            <div className="group bg-white/50 absolute bottom-0 h-[45px] text-center w-full">
              <p className="pt-3 font-medium text-base capitalize group-hover:scale-110 transition-transform duration-200 ease-in-out text-black">
                {items.name}
              </p>
            </div>
          </motion.main>
        ))}
      </motion.div>
    </div>
  );
};

export default ShopGoal;
