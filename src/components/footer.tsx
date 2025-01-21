import { paystack } from "@/asset";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#333333] py-4 mt-5 text-white px-[1rem] md:px-[2rem] lg:px-[4rem] flex flex-col md:flex-row gap-x-[5rem] lg:gap-x-[15rem] gap-y-5 ">
      <main>
        <h3 className="font-font2">Annas_Secrets</h3>
        <p className=" w-[150px] text-xs font-thin leading-5 py-3 text-[#757575]">
          Nnewi, <br /> Anambra Nigeria.
        </p>
        <p className=" text-sm font-thin leading-5 text-[#757575] ">
          Contact Number: 08060665069
        </p>
      </main>
      <main className=" grid">
        <h1 className=" text-lg pb-3 font-thin">Information</h1>
        <div className=" grid gap-4 text-[#757575]">
          <p className=" font-thin text-xs">About us</p>
          <p className=" font-thin text-xs">Contact us</p>
          <p className=" font-thin text-xs">Privacy Policy</p>
          <p className=" font-thin text-xs">Blog</p>
        </div>
      </main>
      <main>
        <h1 className=" text-lg pb-3 font-thin">Sign up for news & offers</h1>
        <div>
          <input
            placeholder="Enter email address"
            className="  border h-[40px] px-2 w-full lg:w-[400px] text-xs text-black bg-white active:outline-none outline-none rounded-md"
          />

          <Image
            src={paystack}
            alt=""
            width={50}
            height={50}
            className=" object-contain bg-white w-fit rounded-md mt-4"
          />
        </div>
      </main>
    </div>
  );
};

export default Footer;
