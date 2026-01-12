import { getSimilarProducts } from "@/lib/api";
import ProductCard from "./product-card";
import { Product } from "../../sanity.types";

interface Props {
  categoryRefs: string[];
  currentProductId: string;
}

const GetSimilarProducts = async ({
  categoryRefs,
  currentProductId,
}: Props) => {
  const products = await getSimilarProducts(categoryRefs, currentProductId);

  if (!products.length) return null;

  return (
    <main className="gridFit pt-6">
      {products.slice(0, 4).map((item: Product) => (
        <ProductCard key={item._id} product={item} />
      ))}
    </main>
  );
};

export default GetSimilarProducts;
