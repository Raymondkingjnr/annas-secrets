import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { client } from "@/lib/sanity";

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "You need to sign in first" },
      { status: 401 },
    );
  }
  const body = await req.json();

  const { productId, rating, comment, userName } = body;
  if (!productId || !rating || !comment || !userName) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existingReview = await client.fetch(
    `*[_type == "review" && product._ref == $productId && userId == $userId][0]`,
    { productId, userId },
  );

  if (existingReview) {
    return NextResponse.json(
      { error: "You already reviewed this product" },
      { status: 409 },
    );
  }

  const review = await client.create({
    _type: "review",
    product: {
      _type: "reference",
      _ref: productId,
    },
    userId: userId ?? crypto.randomUUID(),
    userName,
    rating,
    comment,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json(review, { status: 201 });
}
