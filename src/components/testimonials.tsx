import React from "react";
import { testimonails } from "@/data";
import { SemiColon } from "@/asset/icons/semi-colon";

const Testimonials = () => {
  return (
    <div className=" my-[6px]">
      <h1 className=" text-center pt-[4rem] pb-7 font-thin text-xl text-[#333333]">
        What people are saying
      </h1>
      <div className=" overflow-hidden max-w-[99%] py-6">
        <main className="flex gap-3 justify-between w-max animate-scroll">
          {testimonails.map((item) => (
            <div
              className=" max-w-[350px] rounded-md shadow-xl h-max px-3 py-7 bg-white flex-shrink-0"
              key={item.id}
            >
              <div className="rounded-full">
                <SemiColon />
              </div>
              <h2 className=" py-4 font-thin text-lg text-[#333333]">
                {item.name}
              </h2>
              <p className=" text-xs md:text-sm leading-7 pb-[1px] font-normal text-text_color">
                {item.text}
              </p>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default Testimonials;
