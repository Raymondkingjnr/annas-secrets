import { groq } from "next-sanity";

export const getProductsQueries = (
  start: number,
  end: number
) => groq`*[_type == "product"] | order(__createdAt desc) [${start}...${end}] {

 _id,
    slug,
    name,
     image{
     asset -> {
       url
     } ,
 },
   categories[]->{
  _id,
  slug,
  name,
 },
 price,
 stock,
 "total": count(*[_type == "post"]),    
       
}`;
