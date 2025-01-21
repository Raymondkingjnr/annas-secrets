import { ApprovedIcon, QualityIcon } from "@/asset/icons";
import React from "react";

const Choose = () => {
  return (
    <div className=" bg-[#F5F5F5] py-8 md:py-[5rem] px-[1rem] md:px-[2rem] lg:px-[4rem]">
      <h2 className=" md:text-3xl text-2xl font-thin text-black text-center pt-6">
        WHY CHOOSE ANNAS SECRETS
      </h2>

      <main className=" grid md:grid-cols-3 lg:grid-cols-4 gap-7 py-8 place-content-center items-center">
        <div className=" flex flex-col items-center">
          <div className=" grid  place-content-center">
            <QualityIcon />
          </div>
          <h4 className=" text-center py-4 font-thin text-xl text-[#333333]">
            HIGHEST QUALITY
          </h4>
          <p className=" text-sm leading-6 w-[200px] text-center text-[#757575]">
            Manufactured in the UK. ISO/GMP Accredited Facility. Fully Traceable
            Certificate of Analysis.
          </p>
        </div>
        <div className=" flex flex-col items-center">
          <div className=" grid  place-content-center">
            <ApprovedIcon />
          </div>
          <h4 className=" text-center py-4 font-thin text-xl text-[#333333] ">
            FULLY TRANSPARENT
          </h4>
          <p className=" text-sm leading-6 w-[200px] text-center text-[#757575]">
            Full Transparency on all Labels No hidden fillers. Zero Proprietary
            Blends. Halal Trust Certified.
          </p>
        </div>
        <div className=" flex flex-col items-center">
          <div className=" grid  place-content-center">
            <QualityIcon />
          </div>
          <h4 className=" text-center py-4 font-thin text-xl text-[#333333]">
            RESEARCH Backed
          </h4>
          <p className=" text-sm leading-6 w-[200px] text-center text-[#757575]">
            Research driven formulas. Clinically dosed ingredients. Formulated
            by Dr Dean St Mart PhD.
          </p>
        </div>
        <div className=" flex flex-col items-center">
          <div className=" grid  place-content-center">
            <QualityIcon />
          </div>
          <h4 className=" text-center py-4 font-thin text-xl text-[#333333]">
            Maximum Absorption
          </h4>
          <p className=" text-sm leading-6 w-[200px] text-center text-[#757575]">
            Bioavailable forms for maximum efficacy. Trademark quality
            ingredients. Liposomal formulations.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Choose;
