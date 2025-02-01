"use client";
import { hero5 } from "@/asset";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Form from "next/form";
import { IoSearchOutline } from "react-icons/io5";
import { VectorIcon } from "@/asset/icons/vector";
import TypingEffect from "./typing-effect";

const Hero = () => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate a search action
    setTimeout(() => {
      setLoading(false);
      push(`/search?query=${query}`);
    }, 2000);
  };

  return (
    <section className=" pt-[5rem] relative pb-3 md:pb-[6rem] flex flex-col items-center text-center justify-between px-[1rem] md:px-[4rem] lg:px-[6rem] bg-white">
      <section className="  md:w-[600px] pt-[4rem] gap-[2rem] flex flex-col justify-end pb-7 ">
        <h3 className=" font-medium text-xl text-center leading-9 text-black/70">
          <TypingEffect text=" Optimize Your Health, Naturally" speed={100} />
        </h3>
        <p className=" w-full leading-6 text-text_color py-5 text-base">
          Discover premium supplements designed to support your health and
          wellness journey. Shop now and take the first step toward a stronger,
          healthier you.
        </p>
        <Form
          action={"/search"}
          className="flex relative items-center mb-[-65px]"
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
            className="  border-l-transparent border h-[60px] px-2 w-full active:outline-none outline-none rounded-tr-md rounded-br-md bg-white"
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
        <div className=" hidden lg:flex md:absolute top-28 md:left-[18rem]">
          <VectorIcon />
        </div>
      </section>

      <div className=" h-[550px] w-full">
        <Image
          src={hero5}
          alt=""
          width={300}
          height={300}
          className="rounded w-full h-[550px] object-cover "
        />
      </div>
    </section>
  );
};

export default Hero;
