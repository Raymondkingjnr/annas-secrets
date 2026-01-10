import { Product, Category } from "../../sanity.types";
import { client } from "./sanity";
import * as queries from "./sanityQueries";
// import { Category } from "@/modals/products";

export async function getProducts(
  page: number = 1,
  pageSize: number = 3,
  categorySlug?: string,
  searchQuery?: string,
  sortByPrice?: "asc" | "desc"
) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const result = await client.fetch<Product[]>(
    queries.getProductsQueries(
      start,
      end,
      categorySlug,
      searchQuery,
      sortByPrice
    ),
    {},
    { cache: "no-cache" }
  );

  return result;
}
export async function getTopSales() {
  const result = await client.fetch<Product[]>(
    queries.TopSales,
    {},
    { cache: "no-cache" }
  );
  return result;
}
export async function getCategory() {
  const result = await client.fetch<Category[]>(
    queries.getCategory,
    {},
    { cache: "no-cache" }
  );
  return result;
}

export async function getSearchedProduct(searchParams: string) {
  if (!searchParams) return [];
  const result = await client.fetch<Product[]>(
    queries.searchProductByName(searchParams),
    {},
    { cache: "no-cache" }
  );

  return result;
}

export async function getSingleProduct(slug: string) {
  const result = await client.fetch<Product>(
    queries.getProductBySlug,
    { slug },
    { cache: "no-cache" }
  );
  return result;
}

export async function getTotalProducts() {
  const total = await client.fetch<number>(
    queries.TotalProductQuery,
    {},
    { cache: "no-cache" }
  );
  return total;
}
