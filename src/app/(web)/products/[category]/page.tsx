import { getSingleCategory } from "@/lib/api";
import React from "react";

async function Category({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getSingleCategory(slug);

  console.log(category);

  return <div>Category</div>;
}

export default Category;
