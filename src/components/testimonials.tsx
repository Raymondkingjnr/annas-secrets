"use client";
import React, { useState } from "react";
import { testimonails } from "@/data";
import Marquee from "react-fast-marquee";
import StarRating from "./star-ratings";

const Testimonials = () => {
  const [rating, setRating] = useState(3);
  const tickerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="my-6">
      <h1 className="text-xl md:text-3xl font-bold text-center text-[#251d14]">
        What people are saying
      </h1>
      <div className=" overflow-hidden max-w-[99%] py-6">
        <Marquee
          pauseOnHover={true}
          autoFill={true}
          ref={tickerRef}
          speed={50}
          style={{
            height: "400px",
          }}
          className="flex  items-center justify-between"
        >
          {testimonails.map((item) => (
            <div
              className=" flex mx-6 flex-col justify-between max-w-[350px] h-[300px] rounded-xl shadow-xl px-3 py-7 bg-white flex-shrink-0"
              key={item.id}
            >
              <div>
                <div className=" py-3">
                  <StarRating rating={rating} onChange={setRating} size={16} />
                </div>
                <p className="text-xs md:text-sm leading-7 pb-[1px] font-normal text-gray-700">
                  {item.text}
                </p>
              </div>
              <h2 className=" py-4 text-right font-bold text-lg text-[#333333]">
                {item.name}
              </h2>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Testimonials;
