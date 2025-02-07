import { ChoicesIcon, PriceIcon, TimeIcon } from "@/asset/icons/choosIcon";
import React from "react";

const Choose = () => {
  return (
    <div className=" bg-[#F5F5F5] py-[7px] px-[1rem] md:px-[2rem] lg:px-[4rem]">
      <main className=" grid md:grid-cols-3 gap-7 py-8 items-center">
        <div className="flex flex-col bg-white p-[1rem] rounded">
          <div>
            <ChoicesIcon />
          </div>
          <h4 className="  py-4 font-thin text-xl text-[#333333]">
            Many Choices
          </h4>
          <p className=" text-xs leading-6 text-text_color">
            Variety is the spice of life! Explore our wide range of products
            tailored to meet your unique needs. Whether you&apos;re looking for
            focus, relaxation, or vitality, we’ve got something just for you
          </p>
        </div>
        <div className=" flex flex-col bg-white p-[1rem] rounded">
          <div>
            <TimeIcon />
          </div>
          <h4 className="  py-4 font-thin text-xl text-[#333333] ">
            Fast and On Time
          </h4>
          <p className=" text-xs leading-6 text-text_color">
            Your time matters. Enjoy quick, reliable delivery so you can start
            your wellness journey without delay. We’re committed to getting your
            products to you fast and on schedule.
          </p>
        </div>
        <div className=" flex flex-col bg-white p-[1rem] rounded">
          <div>
            <PriceIcon />
          </div>
          <h4 className="  py-4 font-thin text-xl text-[#333333]">
            Affordable Price
          </h4>
          <p className=" text-xs leading-6 text-text_color">
            Premium quality doesn’t have to come with a premium price tag. We
            believe in making wellness accessible to everyone, offering
            top-notch products at prices that won’t break the bank.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Choose;
