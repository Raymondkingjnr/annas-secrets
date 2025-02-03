import { hero1, hero4 } from "@/asset";
import React from "react";
import Image from "next/image";
import CountUpNumber from "./Counter";

const LearnMore = () => {
  return (
    <div className="px-5 md:px-[4rem] mt-[4rem] mb-[2rem]">
      <h2 className=" text-secondary_color font-medium text-base">
        Our Product
      </h2>
      <main className=" flex flex-col md:flex-row gap-x-9 justify-between">
        <section className=" grid gap-4 text-left">
          <h2 className=" font-thin text-xl pt-2">
            Produced from high quality <br /> materials
          </h2>
          <p className=" text-text_color text-xs md:w-[370px] leading-7">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
            blanditiis veritatis nemo officia voluptatem excepturi aut sint esse
            tenetur iusto? Placeat voluptate eaque eos dicta consequuntur ipsa
            fugiat repudiandae temporibus.
          </p>
          <button className=" bg-base_color text-white h-[45px] rounded-sm w-full md:w-[150px]">
            Learn More
          </button>
          <main className=" flex md:hidden justify-center gap-3 text-center">
            <div>
              <h2 className=" font-medium text-xl text-black">5+</h2>
              <h1 className=" text-text_color text-sm pt-3">
                Years of Experience
              </h1>
            </div>
            <div>
              <h2 className=" font-medium text-xl text-black ">200+</h2>
              <h1 className=" text-text_color text-sm pt-3">Happy Customers</h1>
            </div>
            <div>
              <h2 className=" font-medium text-xl text-black">100+</h2>
              <h1 className=" text-text_color text-sm pt-3">Products</h1>
            </div>
          </main>
          <div className=" h-[170px] ">
            <Image
              src={hero1}
              alt=""
              width={300}
              height={300}
              className="rounded w-full md:w-[370px] lg:w-[500px]  h-[190px] object-cover "
            />
          </div>
        </section>
        <section className="grid gap-4">
          <main className=" hidden md:flex gap-3 text-center">
            <div>
              <h1>
                {" "}
                <CountUpNumber duration={3000} endValue={6} />
              </h1>
              <h1 className=" text-text_color text-sm pt-3">
                Years of Experience
              </h1>
            </div>
            <div>
              <CountUpNumber duration={3000} endValue={2000} />
              <h1 className=" text-text_color text-sm pt-3">Happy Customers</h1>
            </div>
            <div>
              <CountUpNumber duration={3000} endValue={400} />
              <h1 className=" text-text_color text-sm pt-3">Products</h1>
            </div>
          </main>
          <Image
            src={hero4}
            alt=""
            width={300}
            height={300}
            className="rounded w-full lg:w-[500px] mt-[4rem] lg:mt-0  h-fit object-contain "
          />
        </section>
      </main>
    </div>
  );
};

export default LearnMore;
