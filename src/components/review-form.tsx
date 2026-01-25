"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import StarRating from "./star-ratings";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

export default function ReviewForm({
  productId,
  onSuccess,
}: {
  productId: string;
  onSuccess: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submitReview() {
    setError("");

    if (!rating) {
      toast.error("Please select a star rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        rating,
        comment,
        userName: user?.firstName ?? "",
      }),
    });

    setLoading(false);

    if (res.ok) {
      toast.success("thanls for the review");
    }

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      return;
    }

    onSuccess();
  }

  return (
    <div className="space-y-4">
      {/* STAR RATING */}
      <div>
        <p className="text-sm font-medium mb-1">Your rating</p>
        <StarRating rating={rating} onChange={setRating} size={18} />
      </div>

      <div className=" w-full">
        <textarea
          placeholder="Write your review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-gray-400 active:outline-[#d09e80] outline-[#d09e80] py-2 px-3 h-28 rounded-md"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button
        onClick={submitReview}
        disabled={loading}
        className=" bg-[#d09e80] hover:bg-[#5a3a27]"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </div>
  );
}
