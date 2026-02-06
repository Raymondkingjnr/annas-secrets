import AddCartButton from "@/components/add-cart-button";
import StarRating from "@/components/star-ratings";
import { getSingleProduct } from "@/lib/api";
import { imageUrl } from "@/lib/image-url";
import { shortenDescription } from "@/utilis/descriptionShorten";
import { currencyFormatter } from "@/utilis/formatter";
import { notFound } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import GetSimilarProducts from "@/components/get-similar-products";
import ReviewButton from "@/components/review-button";
import { Button } from "@/components/ui/button";
import ProductReviews from "@/components/product-reviews";
import Image from "next/image";

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getSingleProduct(slug);

  const productId = product._id ?? "";

  const categoryRefs = product.categories?.map(
    (cat: { _ref: string }) => cat._ref,
  );

  if (!product) {
    return notFound();
  }
  const isOutOfStock = product.stock === null && product.stock <= 0;

  const naira_sign = "\u20A6";

  return (
    <div className=" container mx-auto pt-6 px-4 pb-8 mt-[8rem]">
      <div className="  mb-5">
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
                <Link href="/products" className=" font-bold text-sm">
                  Shop
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#" className=" font-bold text-sm">
                  {product.name ?? ""}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 place-content-center place-items-center gap-8">
        <div
          className={`relative aspect-square p-2 border-2 bg-white border-gray-300 w-full md:w-[700px] h-[400px] overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? "opacity-50" : ""}`}
        >
          {product.image && (
            <div className=" p-3 md:w-[680px] h-[350px] ">
              <Image
                width={600}
                height={600}
                src={imageUrl(product.image).url()}
                alt={product.name ?? ""}
                className=" object-cover md:object-contain rounded-md aspect-square w-full h-[350px] "
              />
            </div>
          )}
          {isOutOfStock && (
            <div className=" absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className=" text-white font-semibold text-lg">
                Out Of Stock
              </span>
            </div>
          )}
        </div>

        <div className=" flex flex-col justify-between md:w-[700px] h-[400px] border-2 border-gray-300 p-5 rounded-lg">
          <div>
            <h1 className=" text-xl md:text-4xl capitalize text-[#57524b] font-bold md:font-semibold md:mb-4">
              {product.name ?? ""}
            </h1>
            <div className="my-2 flex justify-between items-center">
              <p className=" text-base md:text-3xl  text-black font-bold ">
                {naira_sign} {currencyFormatter(Number(product.price))}
              </p>
              <StarRating rating={4} size={20} />
            </div>
            <div className="flex gap-4 items-center mt-5 mb-3">
              <Button className=" border border-[#d09e80] bg-transparent text-[#db9c75] font-bold hover:bg-transparent">
                Description
              </Button>
              <ReviewButton
                productId={productId}
                productName={product.name ?? ""}
              />
            </div>
            <div className=" hidden md:flex prose max-w-none mb-6 leading-8 text-sm text-gray-700">
              {product?.description}
            </div>
            <div className=" flex md:hidden prose max-w-none mb-6 leading-7 text-sm text-gray-700">
              {shortenDescription(product?.description ?? "", 200)}
            </div>
          </div>
          <div className=" flex justify-end items-end">
            <AddCartButton product={product} disable={isOutOfStock} />
          </div>
        </div>
      </div>

      <section className=" mt-[2.5rem] md:mt-[12rem]">
        <h1 className="text-xl capitalize mb-4 md:text-3xl font-bold text-center text-[#251d14]">
          Product Reviews
        </h1>

        <ProductReviews slug={slug} />
      </section>
      <section className=" mt-[2.5rem] md:mt-[10rem]">
        <h1 className="text-xl capitalize mb-4 md:text-3xl font-bold text-center text-[#251d14]">
          You should also Like
        </h1>

        <GetSimilarProducts
          categoryRefs={categoryRefs ?? []}
          currentProductId={product._id}
        />
      </section>
    </div>
  );
}

export default ProductPage;
