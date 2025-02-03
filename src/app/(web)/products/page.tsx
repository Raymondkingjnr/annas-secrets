"use client";

import React, { useEffect } from "react";
// import { motion } from "framer-motion";
// import useSWR from "swr";
import { getProducts, getCategory, getTotalProducts } from "@/lib/api";
import ProductCard from "@/components/product-card";
import { Product } from "../../../../sanity.types";
import { Category } from "@/modals/products";
// import Loader from "@/components/loader";
import { PiEmptyThin } from "react-icons/pi";
import useSWR from "swr";

const Products = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [sortByPrice, setSortByPrice] = React.useState<"asc" | "desc" | "">("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const [page, setPage] = React.useState<number>(1);
  const pageSize = 12;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const productsData = await getProducts(
        page,
        pageSize,
        selectedCategory,
        searchQuery,
        sortByPrice || "asc" || "desc" || ""
      );
      const categoriesData = await getCategory();
      setProducts(productsData);
      setCategories(categoriesData);
      setLoading(false);
    };

    fetchData();
  }, [page, selectedCategory, searchQuery, sortByPrice]);

  const totalProduct = async () => {
    return getTotalProducts();
  };
  const { data: numOfPost } = useSWR("get/totalProduct", totalProduct);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
    setPage(1); // Reset to the first page when category changes
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to the first page when search query changes
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortByPrice(event.target.value as "asc" | "desc");
    setPage(1); // Reset to the first page when sort changes
  };

  const totalPages = Math.ceil(numOfPost / pageSize);

  return (
    <div className=" min-h-screen bg-gray-50 pt-[5rem] ">
      <div
        className="  bg-cover bg-center  product-bg md:h-[300px] "
        style={{
          background: `linear-gradient(to right, #a84545, #6b1a1a)`,
        }}
      >
        <div className="  py-14 md:py-20  text-center z-10  px-4 sm:px-6 lg:px-8">
          <h1 className=" font-medium text-2xl leading-9 text-gray-50">
            Our Products
          </h1>
          <p className="mt-4 text-base font-medium leading-7 text-gray-50">
            Explore our range of high-quality supplements and skincare products.
          </p>
        </div>
      </div>

      <main className=" px-[1rem] md:px-[2rem] lg:px-[4rem] pt-9">
        <h2 className=" font-thin text-lg md:text-2xl">Sort</h2>
        <form className="mt-5 flex flex-col md:flex-row gap-4 border-gray-300 ">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="  border h-[40px] px-2 w-full md:w-[300px] lg:w-[400px] text-xs text-[#757575] bg-white  border-black active:outline-none outline-none rounded-md"
          />
          {/*  */}

          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border h-[40px] px-2 w-full md:w-[300px] lg:w-[400px] text-xs text-[#757575] bg-white  border-black active:outline-none outline-none rounded-md"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category.slug.current}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={sortByPrice}
            onChange={handleSortChange}
            className="border h-[40px] px-2 w-full md:w-[140px]  text-xs text-[#757575] bg-white  border-black active:outline-none outline-none rounded-md"
          >
            <option value="">Sort by Price</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>

          {/* <button className=" h-[40px] rounded-md w-[150px] border border-[#4CAF50] text-[#4CAF50] px-4 py-2 hover:bg-[#4CAF50] hover:text-white duration-500 transition-all">
            search
          </button> */}
        </form>
      </main>
      {products.length === 0 && !loading && (
        <div className="flex flex-col items-center gap-6 justify-center h-[50vh] text-gray-600">
          <PiEmptyThin size={40} />
          <h2 className="text-xl font-semibold">No products found</h2>
          <p className="text-gray-500">Try searching for something else.</p>
        </div>
      )}
      {loading ? (
        <div className=" flex justify-center items-center my-[4rem] ">
          <div className=" animate-spin rounded-full h-32 w-32 border-b-2 border-base_color" />
        </div>
      ) : (
        <main className="grid grid-cols-2 place-items-center md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-7 px-[1rem] md:px-[2rem] lg:px-[4rem] my-8">
          {products?.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </main>
      )}
      <div className="flex gap-5 justify-center items-center px-[1rem] md:px-[4rem]">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="rounded-lg w-[120px] border-none text-gray-100 btn btn-outline font-normal text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: `linear-gradient(to right, #309185, #1a6b5f)`,
          }}
        >
          Previous
        </button>
        <div className=" flex gap-2 items-center">
          <p className=" h-[20px] w-[20px]  rounded-full grid place-content-center p-3 font-semibold text-gray-100 bg-base_color">
            {" "}
            <span>{page}</span>{" "}
          </p>{" "}
          <p className=" font-semibold text-sm">Of</p>
          <p className=" h-[20px] w-[20px] rounded-full grid place-content-center p-3 font-semibold text-gray-100 bg-base_color">
            {" "}
            <span>{totalPages}</span>{" "}
          </p>{" "}
        </div>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="rounded-lg w-[120px] border-none btn btn-outline font-normal text-sm disabled:opacity-50 disabled:cursor-not-allowed text-gray-100"
          style={{
            background: `linear-gradient(to right, #309185, #1a6b5f)`,
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
