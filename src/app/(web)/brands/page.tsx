"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { getBrands } from "@/lib/api";
import useSWR from "swr";
import { ProductCardSkeleton } from "@/components/skeleton-comp";
import Image from "next/image";
import { imageUrl } from "@/lib/image-url";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const BrandsPage = () => {
  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = React.useState(1);

  const fetchBrands = async () => {
    const data = await getBrands();

    return data;
  };

  const { data: brandsList, isLoading } = useSWR("get/brands", fetchBrands);

  const ProductSkeletonGrid = ({ count = 4 }: { count?: number }) => {
    return (
      <div className=" gridFit gap-3 my-[4rem]">
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  };

  const totalItems = brandsList?.length ?? 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginatedBrands = React.useMemo(() => {
    if (!brandsList) return [];
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return brandsList.slice(start, end);
  }, [brandsList, currentPage]);

  return (
    <div className="min-h-screen md:mt-[6rem] mt-[9rem]">
      <section className=" max-w-[1550px] mx-auto px-5">
        <div className="  mb-5 md:mx-7">
          <Breadcrumb className="">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className=" font-bold text-sm">
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#" className=" font-bold text-sm">
                    Brands
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className=" gridFit ">
          {isLoading ?
            <ProductSkeletonGrid count={4} />
          : brandsList && brandsList.length > 0 ?
            paginatedBrands.map((brand) => (
              <div
                className=" border md:w-fit border-gray-400 rounded-md p-2"
                key={brand._id}
              >
                <div className=" md:w-[280px] md:h-[280px]  bg-gray-100 rounded-sm ">
                  {brand?.image && (
                    <Image
                      width={280}
                      height={280}
                      src={imageUrl(brand.image).url()}
                      alt={brand.slug?.current || "Product Image"}
                      priority
                      className="object-cover rounded-md md:w-[280px] md:h-[280px] "
                    />
                  )}
                </div>
                <div className=" border rounded-md my-2 cursor-pointer ">
                  <Link
                    href={`/brands/${brand.slug?.current}`}
                    className=" text-center py-2 flex justify-center items-center font-bold text-xs md:text-sm capitalize"
                  >
                    {brand.name}
                  </Link>
                </div>
              </div>
            ))
          : <p>No brandsList found.</p>}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-end mt-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === currentPage}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    className={
                      currentPage === totalPages ?
                        "pointer-events-none opacity-50"
                      : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </section>
    </div>
  );
};

export default BrandsPage;
