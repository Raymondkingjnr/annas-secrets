// components/product-list.tsx
"use client";
import React from "react";
import { getSearchedProduct } from "@/lib/api";
import ProductCard from "@/components/product-card";
import useSWR from "swr";
import { PiEmptyThin } from "react-icons/pi";

const fetcher = (query: string) => getSearchedProduct(query);

function ProductList({ query }: { query: string }) {
  const {
    data: products,
    error,
    isLoading,
  } = useSWR(query && query.trim() ? query : null, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // Show message if no query provided
  if (!query || !query.trim()) {
    return (
      <div className="flex flex-col items-center gap-6 justify-center h-[50vh] text-gray-600">
        <PiEmptyThin size={60} className="text-gray-400" />
        <h2 className="text-xl font-semibold">Start searching</h2>
        <p className="text-gray-500">
          Enter a product name, brand, or category
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[50vh]">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 border-4 border-[#d09e80] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">Searching products...</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex flex-col items-center justify-center h-[50vh] text-red-500">
          <p className="text-xl font-semibold">Something went wrong!</p>
          <p className="text-gray-500 mt-2">Please try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#d09e80] text-white rounded-md hover:bg-[#c08a6a] transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Product List */}
      {!isLoading && !error && products && products.length > 0 && (
        <main className=" gridFit  ">
          {products.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </main>
      )}

      {/* No Products Found */}
      {!isLoading && !error && products && products.length === 0 && (
        <div className="flex flex-col items-center gap-6 justify-center h-[50vh] text-gray-600">
          <PiEmptyThin size={60} className="text-gray-400" />
          <h2 className="text-xl font-semibold">No products found</h2>
          <p className="text-gray-500">
            No results for{" "}
            <span className="font-semibold text-black">{query}</span>
          </p>
          <p className="text-sm text-gray-400">
            Try searching for something else.
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductList;
