import { ChoicesIcon, PriceIcon, TimeIcon } from "@/asset/icons/choosIcon";
import React from "react";

const Choose = () => {
  return (
    <div className=" bg-[#F5F5F5] py-[7px] px-[1rem] md:px-[2rem] lg:px-[4rem]">
      <main className=" grid md:grid-cols-3 gap-7 py-8 items-center">
        <div className="flex flex-col bg-white p-[1rem] rounded">
          <div>
            <ChoicesIcon />
          </div>
          <h4 className="  py-4 font-thin text-xl text-[#333333]">
            Many Choices
          </h4>
          <p className=" text-xs leading-6 text-text_color">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
            mollitia error alias obcaecati illum exercitationem, suscipit harum
            ipsam adipisci iste architecto quae modi. Iure ducimus soluta
            similique adipisci corrupti sed?
          </p>
        </div>
        <div className=" flex flex-col bg-white p-[1rem] rounded">
          <div>
            <TimeIcon />
          </div>
          <h4 className="  py-4 font-thin text-xl text-[#333333] ">
            Fast and On Time
          </h4>
          <p className=" text-xs leading-6 text-text_color">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            quibusdam officia voluptatum ex aperiam dolores ut itaque. Labore
            tenetur dolorum pariatur, rerum consectetur laborum provident
            tempora dolore a nobis vero.
          </p>
        </div>
        <div className=" flex flex-col bg-white p-[1rem] rounded">
          <div>
            <PriceIcon />
          </div>
          <h4 className="  py-4 font-thin text-xl text-[#333333]">
            Affordable Price
          </h4>
          <p className=" text-xs leading-6 text-text_color">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
            deleniti quibusdam? Recusandae sunt doloremque earum ullam impedit
            necessitatibus aliquam unde debitis id, fuga at laudantium eveniet
            culpa, non autem consectetur.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Choose;
