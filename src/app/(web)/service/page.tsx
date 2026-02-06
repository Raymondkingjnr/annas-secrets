"use client";
import React from "react";
import { getCategory } from "@/lib/api";
import useSWR from "swr";
import { Category } from "../../../../sanity.types";
import { imageUrl } from "@/lib/image-url";
import Link from "next/link";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
const Services = () => {
  const fetchCategories = async () => {
    const categories = await getCategory();

    return categories;
  };

  const { data: categories } = useSWR("get/categories", fetchCategories);

  return (
    <div className=" max-w-[1500px] px-5 md:px-0 mx-auto md:mt-[6rem] mt-[9rem]">
      <Breadcrumb className="  md:pl-5">
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
              <Link href={"#"} className=" font-bold text-sm">
                Collections
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {/* <BreadcrumbSeparator /> */}
        </BreadcrumbList>
      </Breadcrumb>

      <div className=" gridFit pt-6">
        {categories && categories.length > 0 ?
          categories.map((category: Category) => (
            <div className=" border md:w-fit rounded-md p-2" key={category._id}>
              <div className="md:w-[280px] md:h-[280px]  bg-gray-100 rounded-sm ">
                {category?.image && (
                  <Image
                    width={280}
                    height={280}
                    src={imageUrl(category.image).url()}
                    alt={category.slug?.current || "Product Image"}
                    className="object-contain rounded-md md:w-[280px] md:h-[280px] "
                  />
                )}
              </div>
              <div className=" border rounded-md my-2 cursor-pointer ">
                <Link
                  href={`/products/${category.slug?.current}`}
                  className=" text-center py-2 flex justify-center items-center font-bold text-xs md:text-sm capitalize"
                >
                  {category.name}
                </Link>
              </div>
            </div>
          ))
        : <p>No categories found.</p>}
      </div>
    </div>
  );
};
export default Services;
