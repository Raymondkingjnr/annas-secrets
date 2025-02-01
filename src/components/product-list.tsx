"use client";

import React from "react";
import { getSearchedProduct } from "@/lib/api";
import ProductCard from "@/components/product-card";
import useSWR from "swr";
import { PiEmptyThin } from "react-icons/pi";

// SWR fetcher function
const fetcher = (query: string) => getSearchedProduct(query);

function ProductList({ query }: { query: string }) {
  const {
    data: products,
    error,
    isLoading,
  } = useSWR(query ? query : null, fetcher);

  return (
    <div className="relative w-full">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex flex-col items-center justify-center h-[50vh] text-red-500">
          <p className="text-xl font-semibold">Something went wrong!</p>
          <p className="text-gray-500">Please try again later.</p>
        </div>
      )}

      {/* Product List */}
      {!isLoading && products && products.length > 0 ? (
        <main className="grid place-items-center md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-7 px-4 md:px-8 lg:px-16 my-8">
          {products.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </main>
      ) : (
        // No Products Found
        !isLoading &&
        !error && (
          <div className="flex flex-col items-center gap-6 justify-center h-[50vh] text-gray-600">
            <PiEmptyThin size={40} />
            <h2 className="text-xl font-semibold">No products found</h2>
            <p className="text-gray-500">Try searching for something else.</p>
          </div>
        )
      )}
    </div>
  );
}

export default ProductList;
