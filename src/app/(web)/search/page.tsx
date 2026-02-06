import React from "react";
import ProductList from "@/components/product-list";

async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const params = await searchParams;
  const query = params?.query || "";

  return (
    <section className="min-h-screen md:mt-[6rem] mt-[9rem] flex flex-col items-center bg-gray-50">
      <div className="w-full max-w-[1800px] px-4 md:px-8 lg:px-16">
        <div className="shadow-sm bg-white rounded-lg p-6 mb-6">
          <h1 className="text-lg md:text-xl font-normal text-gray-800">
            Search results for{" "}
            <span className="text-black font-semibold">
              {query ? `"${query}"` : "..."}
            </span>
          </h1>
        </div>
        <ProductList query={query} />
      </div>
    </section>
  );
}

export default SearchPage;
