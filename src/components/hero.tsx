"use client";
// import { hero2 } from "@/asset";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import Form from "next/form";
// import { IoSearchOutline } from "react-icons/io5";
// import { VectorIcon } from "@/asset/icons/vector";
// import TypingEffect from "./typing-effect";
// import { GrFormNext } from "react-icons/gr";

const Hero = () => {
  // const { push } = useRouter();
  // const [loading, setLoading] = useState(false);
  // const [query, setQuery] = useState("");

  // const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   // Simulate a search action
  //   setTimeout(() => {
  //     setLoading(false);
  //     push(`/search?query=${query}`);
  //   }, 2000);
  // };

  return (
    <section className=" pt-[5rem] custom-bg relative pb-7 h-[250px] md:pb-[6rem] backdrop-opacity-100 flex flex-col items-center text-center justify-between px-[1rem] md:px-[4rem] lg:px-[6rem] bg-white bg-cover bg-center">
      {/* <h3 className=" font-medium text-xl text-center leading-9 text-black/70">
        <TypingEffect text=" Optimize Your Health, Naturally" speed={100} />
      </h3>
      <p className=" w-full text-sm md:text-base leading-6 text-text_color py-3">
        Discover premium supplements designed to support your health and
        wellness journey. Shop now and take the first step toward a stronger,
        healthier you.
      </p> */}
      {/* <section className="  md:w-[600px] pt-[4rem] gap-[1rem] flex flex-col justify-end pb-7 ">
        <Form
          action={"/search"}
          className="md:flex relative items-center md:mb-[-65px] mb-[-70px] hidden"
          onSubmit={handleSubmit}
        >
          <div className="  border border-r-transparent bg-white p-[13.9px] rounded-tl-md rounded-bl-md">
            <IoSearchOutline
              className=" text-black/65 font-extrabold"
              size={30}
            />
          </div>
          <input
            name="query"
            placeholder="search product"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="   border-l-transparent border h-[60px] px-2 w-full active:outline-none outline-none rounded-tr-md rounded-br-md bg-white"
          />
          <button
            type="submit"
            className="absolute right-2 h-[40px] w-[120px] md:w-[180px] bg-base_color rounded-md hover:bg-[#333333] duration-200 transition-all text-white"
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border animate-spin inline-block w-6 h-6 mt-2 border-4 rounded-full"></div>
            ) : (
              "search"
            )}
          </button>
        </Form>
        <div className=" grid place-content-center">
          <button
            className=" flex items-center justify-center gap-3 md:hidden  h-[40px] w-[160px] md:w-[180px]  bg-base_color rounded-md hover:bg-[#333333] duration-200 transition-all text-white"
            onClick={() => push("/products")}
          >
            <p>Shop Now</p>
            <GrFormNext size={25} />
          </button>
        </div>
        <div className=" hidden lg:flex md:absolute top-28 md:left-[18rem]">
          <VectorIcon />
        </div>
      </section> */}

      {/* <div className=" md:h-[550px] w-full hidden md:block">
        <Image
          src={hero2}
          alt=""
          width={300}
          height={300}
          className="rounded-lg w-full md:h-[550px] object-contain md:object-contain aspect-auto"
        />
      </div> */}
    </section>
  );
};

export default Hero;
