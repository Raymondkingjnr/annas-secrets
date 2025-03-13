import AddCartButton from "@/components/add-cart-button";
import { getSingleProduct } from "@/lib/api";
import { imageUrl } from "@/lib/image-url";
import { shortenDescription } from "@/utilis/descriptionShorten";
import { currencyFormatter } from "@/utilis/formatter";
import Image from "next/image";
import { notFound } from "next/navigation";

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getSingleProduct(slug);

  if (!product) {
    return notFound();
  }
  const isOutOfStock = product.stock != null && product.stock <= 0;

  const naira_sign = "\u20A6";

  return (
    <div className=" container mx-auto pt-6 px-4 pb-8 ">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className={`relative aspect-square overflow-hidden rounded-md shadow-lg ${isOutOfStock ? "opacity-50" : ""}`}
        >
          {product.image && (
            <Image
              src={imageUrl(product.image).url()}
              alt={product.name ?? ""}
              fill
              className=" object-contain transition-transform duration-300 hover:scale-105"
            />
          )}
          {isOutOfStock && (
            <div className=" absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className=" text-white font-semibold text-lg">
                Out Of Stock
              </span>
            </div>
          )}
        </div>

        <div className=" flex flex-col justify-between">
          <div>
            <h1 className=" text-lg text-[#33333] font-medium mb-4">
              {product.name ?? ""}
            </h1>
            <div className=" text-xs  text-black font-semibold mb-4">
              {naira_sign} {currencyFormatter(Number(product.price))}
            </div>
            <div className=" hidden md:flex prose max-w-none mb-6 leading-8 text-sm text-text_color">
              {product?.description}
            </div>
            <div className=" flex md:hidden prose max-w-none mb-6 leading-8 text-xs text-text_color">
              {shortenDescription(product?.description ?? "", 100)}
            </div>
          </div>
          <AddCartButton product={product} disable={isOutOfStock} />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
