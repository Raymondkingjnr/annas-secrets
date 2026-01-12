import { getSingleCategory, getProductsByCategory } from "@/lib/api";
import { imageUrl } from "@/lib/image-url";
import ProductCard from "@/components/product-card";
import { notFound } from "next/navigation";
import { Product } from "../../../../../sanity.types";

async function Category({ params }: { params: { slug: string } }) {
  const { slug } = params;

  if (!slug) notFound();

  const [category, products] = await Promise.all([
    getSingleCategory(slug),
    getProductsByCategory(slug),
  ]);

  if (!category) notFound();

  return (
    <div className="mt-[6rem]">
      <div
        className="w-full h-[330px] mb-10 border rounded bg-cover bg-no-repeat bg-center px-5 flex items-center justify-center"
        style={{
          backgroundImage:
            category.image ?
              `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${imageUrl(
                category.image
              ).url()})`
            : undefined,
        }}
      >
        <h3 className="text-[#f6f5f2] text-center capitalize text-2xl md:text-5xl md:leading-[4rem] font-extrabold tracking-wide">
          {category.name}
        </h3>
      </div>

      <div className="container py-8 mx-auto px-4">
        {products.length === 0 ?
          <p className="text-center text-gray-500 text-2xl md:text-5xl md:leading-[4rem] font-extrabold tracking-wide">
            No products found in this category.
          </p>
        : <main className="gridFit">
            {products.map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </main>
        }
      </div>
    </div>
  );
}

export default Category;
