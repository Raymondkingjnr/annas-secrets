import React from "react";
import Image from "next/image";
import { hero1, hero3, skin } from "@/asset";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Premium Supplements",
      description:
        "Discover our range of scientifically formulated supplements designed to boost your health, energy, and overall well-being. Made with natural ingredients and backed by research.",
      image: hero1,
    },
    {
      id: 2,
      title: "Skincare Solutions",
      description:
        "Achieve radiant and healthy skin with our skincare products. From cleansers to serums, our products are crafted to nourish and protect your skin.",
      image: skin,
    },
    {
      id: 3,
      title: "Personalized Consultations",
      description:
        "Get personalized advice from our experts to find the right products for your unique needs. We’re here to guide you on your journey to better health and beauty.",
      image: hero3,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-[5rem]">
      <div className="">
        {/* Hero Section */}
        <div
          className="text-center bg-cover bg-center relative h-[300px]"
          style={{
            background: `linear-gradient(to right, #a84545, #6b1a1a)`,
          }}
        >
          <div className=" relative z-10 py-24 px-4 sm:px-6 lg:px-8">
            <h1 className="font-medium text-2xl leading-9 text-gray-50">
              Our Services
            </h1>
            <p className="mt-4 text-base font-medium leading-7 text-gray-50">
              Empowering you with the best in health and skincare.
            </p>
          </div>
        </div>

        <main className="px-[1rem] md:px-[2rem] lg:px-[4rem] pt-9">
          {/* Services Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white w-fit rounded-lg shadow-lg overflow-hidden"
              >
                <div className="">
                  <Image
                    src={service.image}
                    alt={service.title}
                    height={200}
                    width={200}
                    className="rounded-t-lg w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h2 className="  py-2 font-thin text-xl text-[#333333]">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-xs font-medium leading-7 text-text_color">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action Section */}
          <div
            className="mt-12 text-center  py-12 px-4 sm:px-6 lg:px-8 rounded-lg"
            style={{
              background: `linear-gradient(to right, #309185, #1a6b5f)`,
            }}
          >
            <h2 className=" font-medium text-2xl leading-9 text-gray-200">
              Ready to Transform Your Health and Skin?
            </h2>
            <p className="mt-4 text-base font-medium leading-7 text-gray-200">
              Explore our products and services today. Your journey to a better
              you starts here.
            </p>
            <div className="mt-8">
              <button className="inline-block w-[200px] bg-white py-3 px-6 rounded-lg text-black/50 font-semibold hover:bg-gray-100 transition duration-300">
                Get Started
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default Services;
