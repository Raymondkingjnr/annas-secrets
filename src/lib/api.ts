import { Product, Category, Review } from "../../sanity.types";
import { client } from "./sanity";
import * as queries from "./sanityQueries";
// import { Category } from "@/modals/products";

export type ProductWithReviews = Product & {
  reviews: {
    _id: string;
    rating: number;
    comment: string;
    userName: string;
    createdAt: string;
  }[];
};

export async function getProducts(
  page: number = 1,
  pageSize: number = 3,
  categorySlug?: string,
  searchQuery?: string,
  sortByPrice?: "asc" | "desc",
) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const result = await client.fetch<Product[]>(
    queries.getProductsQueries(
      start,
      end,
      categorySlug,
      searchQuery,
      sortByPrice,
    ),
    {},
    { cache: "no-cache" },
  );

  return result;
}

export async function getSimilarProducts(
  categoryRefs: string[],
  currentProductId: string,
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
    { cache: "no-cache" },
  );
}

export async function getTopSales() {
  const result = await client.fetch<Product[]>(
    queries.TopSales,
    {},
    { cache: "no-cache" },
  );
  return result;
}
export async function getNewArrivalProduct() {
  const result = await client.fetch<Product[]>(
    queries.getNewArrivalquery,
    {},
    { cache: "no-cache" },
  );
  return result;
}
export async function getFeaturedProduct() {
  const result = await client.fetch<Product[]>(
    queries.getFeaturedProductQuery,
    {},
    { cache: "no-cache" },
  );
  return result;
}

export async function getCategory() {
  const result = await client.fetch<Category[]>(
    queries.getCategory,
    {},
    { cache: "no-cache" },
  );
  return result;
}

export async function getSingleCategory(slug: string) {
  const result = await client.fetch<Category>(
    queries.getCategoryBySlug,
    { slug },
    { cache: "no-cache" },
  );
  return result;
}

export async function getProductsByCategory(slug: string) {
  return client.fetch(
    queries.getProductsByCategorySlug,
    { slug },
    { cache: "no-cache" },
  );
}

export async function getSearchedProduct(searchParams: string) {
  if (!searchParams) return [];
  const result = await client.fetch<Product[]>(
    queries.searchProductByName(searchParams),
    {},
    { cache: "no-cache" },
  );

  return result;
}

export async function getSingleProduct(slug: string) {
  const result = await client.fetch<Product>(
    queries.getProductBySlug,
    { slug },
    { cache: "no-cache" },
  );
  return result;
}

export async function getTotalProducts() {
  const total = await client.fetch<number>(
    queries.TotalProductQuery,
    {},
    { cache: "no-cache" },
  );
  return total;
}

export async function getClientOrder(userId: string) {
  const orders = await client.fetch<IOrderHistory[]>(
    queries.getClientOrdersQuery,
    { userId },
    { cache: "no-cache" },
  );

  return orders;
}

export async function getSingleProductWithReviews(slug: string) {
  const result = await client.fetch<ProductWithReviews>(
    queries.getProductWithReviewsQuery,
    { slug },
    { cache: "no-cache" },
  );

  return result;
}

export async function getReviewsWithProduct() {
  return client.fetch<Review[]>(
    queries.getReviewsWithProductQuery,
    {},
    { cache: "no-cache" },
  );
}
