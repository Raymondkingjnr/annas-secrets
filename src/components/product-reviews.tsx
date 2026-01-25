import { getSingleProductWithReviews } from "@/lib/api";
import React from "react";
import StarRating from "./star-ratings";
import Image from "next/image";
import { profileImg } from "@/asset";

interface Props {
  slug: string;
}
export function formatDate(date: string) {
  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}/${month}/${year}`;
}

const ProductReviews = async ({ slug }: Props) => {
  const reviews = await getSingleProductWithReviews(slug);

  return (
    <div className=" flex flex-wrap justify-center gap-5">
      {reviews && reviews.reviews.length > 0 ?
        reviews.reviews.slice(0, 10).map((item) => (
          <div
            key={item._id}
            className=" md:w-[400px] border border-gray-400 rounded-lg p-4 space-y-4"
          >
            {/* Header */}

            <div className="flex justify-between gap-1">
              <div className=" flex gap-2">
                <div className=" w-[50px] h-[50px]">
                  <Image
                    src={profileImg}
                    width={50}
                    height={50}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full"
                  />
                </div>
                <div className=" space-y-3">
                  <p className="font-semibold w-[120px] truncate text-sm text-gray-900 capitalize">
                    {item.userName}
                  </p>
                  <span className="text-xs  text-gray-600 italic">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
              </div>
              <StarRating rating={item.rating} readOnly size={16} />
            </div>

            {/* Comment */}
            <p className="mt-3 text-sm italic text-gray-800">{item.comment}</p>
          </div>
        ))
      : <p className=" text-center text-gray-500">
          This product dose not have a review yet
        </p>
      }
    </div>
  );
};

export default ProductReviews;
