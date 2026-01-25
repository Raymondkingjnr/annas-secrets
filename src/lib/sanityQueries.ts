import { groq } from "next-sanity";

export const getProductsQueries = (
  start?: number,
  end?: number,
  categorySlug?: string,
  searchQuery?: string,
  sortByPrice?: "asc" | "desc",
) => {
  let query = `*[_type == "product"`;

  // Filter by category
  if (categorySlug) {
    query += ` && "${categorySlug}" in categories[]->slug.current`;
  }

  // Search by product name
  if (searchQuery) {
    query += ` && name match "${searchQuery}*"`;
  }

  query += `]`;

  // Sort by price
  if (sortByPrice) {
    query += ` | order(price ${sortByPrice})`;
  } else {
    query += ` | order(__createdAt desc)`;
  }

  query += ` [${start}...${end}] {
    _id,
    slug,
    name,
    image{
      asset -> {
        url
      }
    },
    categories[]->{
      _id,
      slug,
      name,
    },
    price,
    stock,
    "total": count(*[_type == "product"])
  }`;

  return query;
};

export const TopSales = groq`*[_type == "product" && topSales == true]{
  _id,
    slug,
    name,
    image{
      asset -> {
        url
      }
    },
    categories[]->{
      _id,
      slug,
      name,
    },
    price,
    stock,
}
`;
export const getNewArrivalquery = groq`*[_type == "product" && newArrival == true]{
  _id,
    slug,
    name,
    image{
      asset -> {
        url
      }
    },
    categories[]->{
      _id,
      slug,
      name,
    },
    price,
    stock,
}
`;
export const getFeaturedProductQuery = groq`*[_type == "product" && featuredProduct == true]{
  _id,
    slug,
    name,
    image{
      asset -> {
        url
      }
    },
    categories[]->{
      _id,
      slug,
      name,
    },
    price,
    stock,
}
`;

export const TotalProductQuery = groq`
  count(*[_type == "product"])
`;

export const getProductBySlug = `
   *[_type == "product" && slug.current == $slug] | order(name asc)[0] 
  `;

export const getNewArrivalsBySlug = `
  *[_type == "newArrivals" && slug.current == $slug] | order(name asc)[0] 
  `;

export const getCategory = groq`*[_type == "category" ]{
  _id,
    name,
      slug{
        current
      },
          image{
      asset -> {
        url
      }
    },
  }`;

export const getCategoryBySlug = groq`
   *[_type == "category" && slug.current == $slug] | order(name asc)[0] 
  `;

export const getClientOrdersQuery = groq`
   *[_type == "order" && clerkUserId == $userId] | order(OrderDate desc) {
    ...,
    products[]{
     ...,
     product->
    }
   }
  `;
export const getProductsByCategorySlug = groq`
  *[
    _type == "product" &&
    $slug in categories[]->slug.current
  ] | order(_createdAt desc)
`;

export const searchProductByName = (searchParams: string) =>
  groq`*[_type == "product" && name match "${searchParams}*"] | order(name asc)`;

export const getProductWithReviewsQuery = groq`
  *[_type == "product" && slug.current == $slug][0]{
    name,
    image,

    "reviews": *[
      _type == "review" &&
      product._ref == ^._id
    ] | order(createdAt desc) {
      _id,
      rating,
      comment,
      userName,
      createdAt
    }
  }
`;

export const getReviewsWithProductQuery = groq`
  *[_type == "review"]
  | order(createdAt desc) {
    _id,
    rating,
    comment,
    userName,
    createdAt,

    product->{
      _id,
      name,
      slug,
      price,
      image
    }
  }
`;
