"use client";

import React from "react";
import useSWR from "swr";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/product-card";

const Products = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 5;

  const fetchProducts = async () => {
    const products = await getProducts(currentPage, pageSize);

    return products;
  };

  const {
    data: products,
    // isLoading,
    // error,
  } = useSWR(`get/allPost?page=${currentPage}`, fetchProducts);

  console.log(setCurrentPage);

  return (
    <div className=" min-h-screen">
      <div className=" bg-[#F5F5F5] text-black px-[1rem] md:px-[2rem] lg:px-[4rem] h-[150px] md:h-[300px] pt-[5rem] md:pt-[6rem]">
        <h1 className=" font-thin text-lg md:text-2xl">Home / Products</h1>
      </div>

      <main className=" px-[1rem] md:px-[2rem] lg:px-[4rem] pt-9">
        <h2 className=" font-thin text-lg md:text-2xl">Sort</h2>
        <form className="mt-5 flex flex-col md:flex-row gap-4 border-gray-300 ">
          <input
            id="productName"
            name="productName"
            placeholder="Search product"
            className="  border h-[40px] px-2 w-full md:w-[300px] lg:w-[400px] text-xs text-[#757575] bg-white  border-black active:outline-none outline-none rounded-md"
          />

          <select
            id="options"
            name="options"
            defaultValue="Vitamins"
            className="border h-[40px] px-2 w-full md:w-[300px] lg:w-[400px] text-xs text-[#757575] bg-white  border-black active:outline-none outline-none rounded-md"
          >
            <option value="" disabled selected>
              Select an option
            </option>
            <option className=" capitalize" value="vitamins">
              vitamins
            </option>
            <option className=" capitalize" value="skins">
              skins
            </option>
            <option className=" capitalize" value="boosters">
              boosters
            </option>
            <option className=" capitalize" value="vagina">
              vagina
            </option>
            <option className=" capitalize" value="weight">
              weight
            </option>
          </select>

          <button className=" h-[40px] rounded-md w-[150px] border border-[#4CAF50] text-[#4CAF50] px-4 py-2 hover:bg-[#4CAF50] hover:text-white duration-500 transition-all">
            search
          </button>
        </form>
      </main>

      <main className=" grid grid-cols-2 place-items-center md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-7 px-[1rem] md:px-[2rem] lg:px-[4rem] my-8">
        {products?.map((item) => (
          <ProductCard
            key={item._id}
            image={item.image.asset.url}
            name={item.name}
            price={item.price}
            stock={item.stock}
            AddCart={() => {}}
          />
        ))}
      </main>
    </div>
  );
};

export default Products;
