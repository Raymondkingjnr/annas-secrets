"use client";

import React from "react";
import { shop_goals } from "../data";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";

const duplicatedShopGoals = [...shop_goals, ...shop_goals];

const ShopGoal = () => {
  const { push } = useRouter();
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const controls = useAnimation();
  const tickerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const tickerWidth = tickerRef.current?.scrollWidth || 0;
    const duration = tickerWidth / 100; // Adjust speed by changing the divisor

    const sequence = async () => {
      await controls.set({ x: 0 }); // Reset position
      await controls.start({
        x: -tickerWidth / 2, // Scroll to the halfway point (since items are duplicated)
        transition: { duration, ease: "linear", repeat: Infinity },
      });
    };

    sequence();
  }, [controls]);

  return (
    <div className="px-[1rem] md:px-[2rem] lg:px-[4rem] mt-[5rem]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={textVariants}
        className="md:max-w-[500px] mx-auto text-left md:text-center"
      >
        <h2 className=" text-xl font-font  font-thin text-secondary_color">
          Shop By Goal
        </h2>
        <p className=" text-text_color md:text-sm text-xs py-[1.2rem] leading-6">
          Explore a curated selection of premium supplements and wellness
          products designed to elevate your mind, body, and spirit.
        </p>
        <button className="btn w-[150px]" onClick={() => push("/products")}>
          Shop Now
        </button>
        {/* <div className="h-[2px] w-[170px] md:w-[200px] mt-3 bg-[#DDDDDD]" /> */}
      </motion.div>

      <div className="overflow-hidden mt-10">
        <motion.div
          ref={tickerRef}
          className="flex gap-5 w-max"
          animate={controls}
        >
          {duplicatedShopGoals.map((items, index) => (
            <motion.div
              key={index}
              className="relative w-[200px] flex-shrink-0" // Adjust width as needed
            >
              <div className="w-full h-fit">
                <Image
                  src={items.image}
                  alt={items.name}
                  width={300}
                  height={300}
                  className="object-cover rounded-md w-full"
                />
              </div>
              <div className="group bg-black/40 absolute bottom-0 h-[45px] text-center w-full">
                <p className="pt-3 font-semibold text-sm capitalize group-hover:scale-110 transition-transform duration-200 ease-in-out text-gray-50">
                  {items.name}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ShopGoal;
