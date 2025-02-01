import React from "react";
import ProductList from "@/components/product-list";

function SearchPage({ searchParams }: { searchParams: { query: string } }) {
  const query = searchParams?.query || "";

  return (
    <section className="min-h-screen pt-[7rem] flex flex-col items-center">
      <div className=" shadow-md rounded-md max-w-[700px] p-[40px] m-auto">
        <h1 className="text-base font-normal text-gray-800">
          Search results for {""}
          <span className="text-black">{query}</span>
        </h1>
      </div>

      <ProductList query={query} />
    </section>
  );
}

export default SearchPage;
