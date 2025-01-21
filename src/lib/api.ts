import sanityClient from "./sanity";
import * as queries from "./sanityQueries";
import { product } from "@/modals/products";

export async function getProducts(page: number = 1, pageSize = 3) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const result = await sanityClient.fetch<product[]>(
    queries.getProductsQueries(start, end),
    {},
    { cache: "no-cache" }
  );
  return result;
}
