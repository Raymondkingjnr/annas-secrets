import { client } from "@/lib/sanity";
import { product } from "@/modals/products";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const orderDetails = await req.json();

  try {
    // Fetch current stock for each product in the order
    const productIds = orderDetails.products.map((item) => item.product._ref);
    const products = await client.fetch(
      `*[_type == "product" && _id in $productIds]`,
      {
        productIds,
      }
    );

    // Create a map of product IDs to their current stock
    const productStockMap = new Map();
    products.forEach((product: product) => {
      productStockMap.set(product._id, product.stock);
    });

    // Update stock for each product in the order
    for (const item of orderDetails.products) {
      const productId = item.product._ref;
      const currentStock = productStockMap.get(productId);
      const newStock = currentStock - item.quantity;

      if (newStock < 0) {
        throw new Error(`Insufficient stock for product ${productId}`);
      }

      // Update the product stock in Sanity
      await client.patch(productId).set({ stock: newStock }).commit();
    }

    // Generate unique keys for each product item and ensure product is a reference type
    orderDetails.products = orderDetails.products.map((item) => ({
      ...item,
      _key: uuidv4(),
      product: {
        _type: "reference",
        _ref: item.product._ref,
      },
    }));

    // Create the order in Sanity
    const order = await client.create({
      _type: "order",
      ...orderDetails,
    });

    return Response.json({ success: true, order });
  } catch (error) {
    console.error("Error creating order or updating stock:", error);
    return new NextResponse("Unable to save order or update stock", {
      status: 400,
    });
  }
}
