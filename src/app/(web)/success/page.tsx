import React from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { BiLogoWhatsappSquare } from "react-icons/bi";
import Link from "next/link";

const page = () => {
  return (
    <div className="min-h-screen px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full py-10 rounded-md flex flex-col items-center shadow-2xl px-4">
        <main className="h-[50px] w-[50px] rounded-3xl grid place-content-center bg-green-400">
          <IoCheckmarkDoneOutline size={30} color="#ffff" />
        </main>
        <h2 className="py-7 font-medium text-base md:text-lg">
          Payment Successfull
        </h2>
        <p className="text-text_color font-medium text-sm w-full md:w-[400px] text-center leading-6">
          Thanks for shopping from Annas secrets! store Check Your Email For
          your payment comfirmation reciept
        </p>
        <Link href={"/"}>
          <button className="btn w-[130px] mt-6">Back to Store</button>
        </Link>
        <div className="flex flex-col gap-2 items-center pt-12">
          <p>support:</p>
          <a
            href="https://wa.me/2348060665069"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BiLogoWhatsappSquare
              color="#4ade80"
              style={{ borderRadius: "10px" }}
              size={35}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default page;
