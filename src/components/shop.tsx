"use client";

import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { getTopSales } from "@/lib/api";
import useSWR from "swr";
import { imageUrl } from "@/lib/image-url";
import { naira_sign } from "./product-card";
import { currencyFormatter } from "@/utilis/formatter";
import Marquee from "react-fast-marquee";
import StarRating from "./star-ratings";
import { bannerImg } from "@/asset";
import Image from "next/image";

const ShopGoal = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const [rating, setRating] = useState(3);

  const controls = useAnimation();
  const tickerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const tickerWidth = tickerRef.current?.scrollWidth || 0;
    const duration = tickerWidth / 100; // Adjust speed by changing the divisor

    const sequence = async () => {
      await controls.set({ x: 0 }); // Reset position
      await controls.start({
        x: -tickerWidth / 2,
        transition: { duration, ease: "linear", repeat: Infinity },
      });
    };

    sequence();
  }, [controls]);

  const fetchProducts = async () => {
    const products = await getTopSales();

    return products;
  };
  const { data: products } = useSWR(`get/allPost`, fetchProducts);

  return (
    <>
      <div className="px-[1rem] md:px-[2rem] lg:px-[4rem] mt-[5rem] max-w-[1600px] mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={textVariants}
          className=""
        >
          <h2 className=" text-xl  font-bold text-[#251d14]">
            Our Bestsellers{" "}
          </h2>
          <p className=" text-[#aaa9a9] md:text-sm leading-7 text-sm font-medium py-[1rem] md:w-[400px]">
            Explore a curated selection of premium supplements and wellness
            products designed to elevate your mind, body, and spirit.
          </p>

          {/* <div className="h-[2px] w-[170px] md:w-[200px] mt-3 bg-[#DDDDDD]" /> */}
        </motion.div>

        <div className="overflow-hidden ">
          <Marquee
            pauseOnHover={true}
            autoFill={true}
            ref={tickerRef}
            speed={50}
            style={{
              height: "500px",
            }}
            className="flex  items-center justify-between"
          >
            {products?.map((items, index) => (
              <div
                key={index}
                className="relative border border-gray-200 rounded-md p-2 mx-3 gap-4"
              >
                <div className=" h-[300px] w-[300px]  bg-gray-100   ">
                  {items?.image && (
                    <Image
                      width={300}
                      height={300}
                      src={imageUrl(items.image).url()}
                      alt={items.slug?.current || "Product Image"}
                      className="object-contain rounded-md w-[300px] h-[300px] "
                    />
                  )}
                </div>
                <div className=" items-center flex flex-col mt-2">
                  <p className="text-sm font-bold">
                    {naira_sign} {currencyFormatter(Number(items?.price))}
                  </p>
                  <p className=" font-normal text-sm">{items?.name}</p>
                  <StarRating rating={rating} onChange={setRating} />
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
      <div
        className=" w-full  h-[500px] my-[5rem] border rounded bg-cover bg-no-repeat bg-center px-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bannerImg.src})`,
        }}
      >
        <section className=" max-w-[1550px] md:ml-14 h-full flex items-end pb-20">
          <div className="flex flex-col justify-center items-center md:items-start">
            <h3 className=" text-[#f6f5f2] text-2xl md:text-5xl md:leading-[4rem] font-extrabold tracking-wide">
              Love Your Skin, Every Day
            </h3>
            <p className="w-full md:w-[500px] text-center md:text-left text-[#f6f5f2] leading-7 my-5 font-normal">
              Elevete Your Glow with clean, science-backed skincare
              cruelty-free, sustainable, and packed with anitioxidants for skin
              that looks healthy and Every Age
            </p>
            <div className=" flex items-center gap-8 mt-6">
              <button className=" bg-[#E3D1C6] h-[40px] w-[120px] rounded-md text-sm font-bold text-[#57524b]">
                Expore More
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ShopGoal;
