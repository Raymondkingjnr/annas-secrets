"use client";
import { hero1, hero2, hero3, hero4 } from "@/asset";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Hero = () => {
  const { push } = useRouter();

  return (
    <section className=" pt-[7rem] pb-3 md:pb-[6rem] flex flex-col md:flex-row justify-between px-[1rem] md:px-[4rem] lg:px-[6rem] bg-[#F5F5F5]">
      <section className=" flex flex-col justify-end pb-7 ">
        <h3 className=" md:w-[500px] font-semibold text-2xl leading-9 text-[#4CAF50]">
          Fuel Your Body, Elevate Your Life
        </h3>
        <p className="md:w-[600px] w-full leading-6 text-gray-700 py-5 text-base">
          Discover premium supplements designed to support your health and
          wellness journey. Shop now and take the first step toward a stronger,
          healthier you.
        </p>
        <button
          className=" bg-[#FF9800] hover:bg-[#E91E63] duration-300 ease-in-out transition-all text-white h-[40px] text-sm font-medium rounded-md w-[150px]"
          onClick={() => push("/products")}
        >
          Shop Now
        </button>
      </section>
      <section className=" carousel carousel-center bg-slate-200 rounded-box max-w-[500px] space-x-4 p-4">
        <div className=" carousel-item">
          <Image
            src={hero1}
            alt=""
            width={300}
            height={300}
            className="rounded-box object-cover"
          />
        </div>
        <div className=" carousel-item">
          <Image
            src={hero2}
            alt=""
            width={300}
            height={300}
            className="rounded-box object-cover"
          />
        </div>
        <div className=" carousel-item">
          <Image
            src={hero3}
            alt=""
            width={300}
            height={300}
            className="rounded-box object-cover"
          />
        </div>
        <div className=" carousel-item">
          <Image
            src={hero4}
            alt=""
            width={300}
            height={300}
            className="rounded-box object-cover"
          />
        </div>
      </section>
    </section>
  );
};

export default Hero;
