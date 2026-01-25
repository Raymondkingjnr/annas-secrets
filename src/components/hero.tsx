import { heroImage } from "@/asset";
import React from "react";
import Link from "next/link";
const Hero = () => {
  return (
    <div
      className=" w-full h-[600px] md:h-[800px] border rounded bg-cover bg-no-repeat bg-center px-5"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroImage.src})`,
      }}
    >
      <section className=" max-w-[1550px] md:ml-14 h-full flex items-center">
        <div className=" flex flex-col justify-center items-center md:items-start">
          <h3 className=" text-[#f6f5f2] md:max-w-[800px] text-3xl text-center md:text-left md:text-8xl md:leading-[7rem] font-extrabold tracking-wide">
            Love Your Skin, Every Day
          </h3>
          <p className=" w-full md:w-[500px] text-center md:text-left text-[#f6f5f2] leading-7 my-5 font-normal">
            Elevete Your Glow with clean, science-backed skincare cruelty-free,
            sustainable, and packed with anitioxidants for skin that looks
            healthy and Every Age
          </p>
          <div className=" flex items-center gap-8 mt-6">
            <Link
              href={"./products"}
              className=" bg-[#E3D1C6] py-2 w-[120px] rounded-md text-sm text-center font-bold text-[#57524b]"
            >
              Order Now
            </Link>
            <Link
              href={"/"}
              className=" border border-[#E3D1C6] py-2 w-[120px] text-center text-sm  rounded-md font-bold text-[#f6f5f2]"
            >
              Read More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
