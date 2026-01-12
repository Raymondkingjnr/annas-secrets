import { Product, Category, NewArrivals } from "../../sanity.types";
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

export async function getSimilarProducts(
  categoryRefs: string[],
  currentProductId: string
) {
  return client.fetch(
    `
    *[_type == "product" 
      && _id != $currentProductId
      && count(categories[@._ref in $categoryRefs]) > 0
    ][0..3]
    `,
    {
      categoryRefs,
      currentProductId,
    },
    { cache: "no-cache" }
  );
}

export async function getTopSales() {
  const result = await client.fetch<Product[]>(
    queries.TopSales,
    {},
    { cache: "no-cache" }
  );
  return result;
}

export async function getAllNewArrivals() {
  const result = await client.fetch<NewArrivals[]>(
    queries.NewArrivalsQuery,
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

export async function getSingleCategory(slug: string) {
  const result = await client.fetch<Category>(
    queries.getCategoryBySlug,
    { slug },
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

export async function getSingleNewArrival(slug: string) {
  const result = await client.fetch<NewArrivals>(
    queries.getNewArrivalsBySlug,
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
