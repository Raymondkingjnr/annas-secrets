import { groq } from "next-sanity";

export const getProductsQueries = (
  start: number,
  end: number,
  categorySlug?: string,
  searchQuery?: string,
  sortByPrice?: "asc" | "desc"
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

export const getProductBySlug = `
   *[_type == "product" && slug.current == $slug] | order(name asc)[0] 
  `;

export const getCategory = groq`*[_type == "category" ]{
  _id,
    name,
      slug{
        current
      }
  }`;

export const searchProductByName = (searchParams: string) =>
  groq`*[_type == "product" && name match "${searchParams}*"] | order(name asc)`;
