"use client";
import React, { useEffect } from "react";
import { getProducts, getCategory, getTotalProducts } from "@/lib/api";
import ProductCard from "@/components/product-card";
import { Category, Product } from "../../../../sanity.types";
import { PiEmptyThin } from "react-icons/pi";
import useSWR from "swr";
import BackToTopButton from "@/components/bact-to-top";
import { ProductCardSkeleton } from "@/components/skeleton-comp";
import { bannerImg } from "@/asset";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ProductSkeletonGrid = ({ count = 4 }: { count?: number }) => {
  return (
    <div className=" gridFit gap-3 my-[4rem]">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [sortByPrice, setSortByPrice] = React.useState<"asc" | "desc" | "">("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const [page, setPage] = React.useState<number>(1);
  const pageSize = 8;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const productsData = await getProducts(
        page,
        pageSize,
        selectedCategory,
        searchQuery,
        sortByPrice || "asc" || "desc" || "",
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
    event: React.ChangeEvent<HTMLSelectElement>,
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

  const totalPages = Math.ceil((numOfPost || 0) / pageSize);

  return (
    <div className="  min-h-screen mt-[6rem] ">
      <BackToTopButton />

      <div
        className="w-full h-[330px] mb-4 border rounded bg-cover bg-no-repeat bg-center px-5 flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bannerImg.src})`,
        }}
      >
        <h3 className="text-[#f6f5f2] text-center text-2xl md:text-5xl md:leading-[4rem] font-extrabold tracking-wide">
          Love Your Skin, Every Day
        </h3>
      </div>

      {/* Filters */}
      <main className="pb-8 pt-3 container mx-auto px-4">
        <form className="mt-5 flex flex-col md:flex-row gap-4">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="border h-[45px] px-2 w-full md:w-[300px] lg:w-[400px] text-sm text-[#757575] rounded-md active:outline-[#d09e80] outline-[#d09e80]"
            />

            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border h-[45px] px-2 w-full md:w-[300px] lg:w-[400px] text-sm text-[#757575] rounded-md"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category.slug?.current || ""}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <select
            value={sortByPrice}
            onChange={handleSortChange}
            className="border h-[45px] px-2 w-full md:w-[140px] text-sm text-[#757575] rounded-md"
          >
            <option value="">Sort by Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </form>
      </main>
      <div className="container mx-auto px-4">
        {/* 1️⃣ Loading */}
        {loading && <ProductSkeletonGrid count={1} />}

        {/* 2️⃣ Empty state */}
        {!loading && products.length === 0 && (
          <div className="flex flex-col items-center gap-6 justify-center h-[50vh] text-gray-600">
            <PiEmptyThin size={40} />
            <h2 className="text-xl font-semibold">No products found</h2>
            <p className="text-gray-500">Try searching for something else.</p>
          </div>
        )}

        {/* 3️⃣ Products exist */}
        {!loading && products.length > 0 && (
          <>
            {/* Products */}
            <main className="gridFit pt-1">
              {products.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </main>

            {/* Pagination */}
            <Pagination className="flex justify-end mt-8">
              <PaginationContent>
                {/* Previous */}
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className={
                      page === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {/* Current page */}
                <PaginationItem>
                  <PaginationLink isActive>{page}</PaginationLink>
                </PaginationItem>

                {/* Next */}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className={
                      page === totalPages ?
                        "pointer-events-none opacity-50"
                      : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
