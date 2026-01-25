"use client";
import React from "react";
import Marquee from "react-fast-marquee";
import StarRating from "./star-ratings";
import { getReviewsWithProduct } from "@/lib/api";
import useSWR from "swr";
import { formatDate } from "./product-reviews";
import Image from "next/image";
import { profileImg } from "@/asset";

const Testimonials = () => {
  const tickerRef = React.useRef<HTMLDivElement>(null);

  const fetchCategories = async () => {
    const reviews = await getReviewsWithProduct();

    return reviews;
  };

  const { data: reviews } = useSWR("get/reviews", fetchCategories);

  return (
    <div className="mt-[5rem] md:mt-[13rem]">
      <h1 className="text-xl md:text-3xl font-bold text-center text-[#251d14]">
        What people are saying
      </h1>
      <div className=" overflow-hidden mt-9 space-x-5 max-w-[99%]">
        <Marquee pauseOnHover={true} autoFill={true} ref={tickerRef} speed={50}>
          {reviews?.map((item) => (
            <div
              key={item._id}
              className=" w-[330px] md:w-[400px] h-[160px] mr-6 border border-gray-400 rounded-lg p-4 space-y-4"
            >
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
                      {formatDate(item?.createdAt ?? "")}
                    </span>
                  </div>
                </div>
                <StarRating rating={item.rating ?? 0} readOnly size={16} />
              </div>

              {/* Comment */}
              <p className="mt-3 text-sm italic text-gray-800">
                {item.comment}
              </p>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Testimonials;
