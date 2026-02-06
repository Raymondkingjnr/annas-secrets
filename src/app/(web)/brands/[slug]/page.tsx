import { getProductsByBrand, getSingleBrand } from "@/lib/api";
import { notFound } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { imageUrl } from "@/lib/image-url";
import PaginatedProductList from "@/components/paginated-product-list";

async function SingleBrand({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  if (!slug) notFound();

  const [brand, products] = await Promise.all([
    getSingleBrand(slug),
    getProductsByBrand(slug),
  ]);

  if (!brand) notFound();

  return (
    <div className="md:mt-[6rem] mt-[9rem]">
      <div className="  mb-5 max-w-[1550px] mx-auto">
        <Breadcrumb className="  pl-4">
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
                <Link href="/brands" className=" font-bold text-sm">
                  Brands
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#" className=" font-bold text-sm">
                  {brand.name ?? ""}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div
        className="w-full h-[430px] mb-10 border bg-white rounded bg-contain bg-no-repeat bg-center px-5 flex items-center justify-center"
        style={{
          backgroundImage:
            brand.image ?
              `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${imageUrl(
                brand.image,
              ).url()})`
            : undefined,
        }}
      >
        <h3 className="text-[#f6f5f2] text-center capitalize text-2xl md:text-5xl md:leading-[4rem] font-extrabold tracking-wide">
          {brand.name}
        </h3>
      </div>

      <div className="container py-8 mx-auto px-4">
        {products.length === 0 ?
          <p className="text-center text-gray-500 text-xl md:text-5xl md:leading-[4rem] font-extrabold tracking-wide">
            No products found in this brand.
          </p>
        : <PaginatedProductList products={products} />}
      </div>
    </div>
  );
}

export default SingleBrand;
