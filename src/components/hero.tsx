"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Slider from "react-slick";

const Hero = () => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    cssEase: "linear",
    waitForAnimate: false,
  };

  const { push } = useRouter();

  return (
    <section className=" overflow-hidden">
      <Slider {...settings}>
        <div className=" w-full md:h-[700px] min-h-screen bg-fixed  bg-center herobg px-[1rem] md:px-[2rem] lg:px-[4rem] bg-[url('../../asset/images/herobg4.jpg')]">
          <div className=" absolute bg-black/50 md:h-[700px] min-h-screen w-[100%] z-0 left-0" />
          <div className=" z-10 bottom-0 md:bottom-[200px] absolute pr-[2rem] grid gap-6 pb-[3rem] text-white">
            <h3 className=" md:w-[500px] font-semibold text-2xl leading-9 text-[#4CAF50]">
              Fuel Your Body, Elevate Your Life
            </h3>
            <p className="md:w-[600px] w-full leading-6 text-[#efefef] text-base">
              Discover premium supplements designed to support your health and
              wellness journey. Shop now and take the first step toward a
              stronger, healthier you.
            </p>
            <button
              className=" bg-[#FF9800] hover:bg-[#E91E63] duration-300 ease-in-out transition-all text-white h-[40px] text-sm font-medium rounded-md w-[150px]"
              onClick={() => push("/products")}
            >
              Shop Now
            </button>
          </div>
        </div>
        {/*  */}
        <div className=" w-full md:h-[700px] min-h-screen bg-fixed bg-center  herobg2 px-[1rem] md:px-[2rem] lg:px-[4rem] bg-[url('../../asset/images/herobg3.jpg')]">
          <div className=" absolute bg-black/50 md:h-[700px] min-h-screen  w-[100%] z-0 left-0" />
          <div className=" z-10 bottom-0 md:bottom-[200px] absolute  pr-[2rem] grid gap-6 pb-[3rem] text-white">
            <h3 className=" md:w-[500px] font-semibold text-2xl leading-9 text-[#4CAF50]">
              Your Health, Your Power
            </h3>
            <p className=" md:w-[600px] w-full leading-6 text-[#efefef] text-base">
              From vitamins to performance boosters, we provide high-quality
              supplements to help you stay energized and achieve your goals.
              Start your wellness journey today!
            </p>
            <button
              className=" bg-[#FF9800] hover:bg-[#E91E63] duration-300 ease-in-out transition-all text-white h-[40px] text-sm font-medium rounded-md w-[150px]"
              onClick={() => push("/products")}
            >
              Shop Now
            </button>
          </div>
        </div>
        <div className=" w-full md:h-[700px] min-h-screen bg-fixed bg-center herobg5 px-[1rem] md:px-[2rem] lg:px-[4rem] bg-[url('../../asset/images/hero.jpg')]">
          <div className=" absolute bg-black/50 md:h-[700px] min-h-screen  w-[100%] z-0 left-0" />
          <div className=" z-10 bottom-0 md:bottom-[200px] absolute  pr-[2rem] grid gap-6 pb-[3rem] text-white">
            <h3 className="md:w-[500px] font-semibold text-2xl leading-9 text-[#4CAF50]">
              Stronger. Healthier. Happier.
            </h3>
            <p className="  md:w-[600px] w-full leading-6 text-[#efefef] text-base">
              Whether you`&apos;`re looking to enhance your fitness, boost
              immunity, or support overall well-being, we`&apos;`ve got the
              perfect supplement for you. Explore our collection today!
            </p>
            <button
              className=" bg-[#FF9800] hover:bg-[#E91E63] duration-300 ease-in-out transition-all text-white h-[40px] text-sm font-medium rounded-md w-[150px]"
              onClick={() => push("/products")}
            >
              Shop Now
            </button>
          </div>
        </div>
        {/*  */}
        <div className=" w-full md:h-[700px] min-h-screen bg-fixed bg-center herobg3 px-[1rem] md:px-[2rem] lg:px-[4rem] bg-[url('../../asset/images/herobg5.jpg')]">
          <div className=" absolute bg-black/50 md:h-[700px] min-h-screen  w-[100%] z-0 left-0" />
          <div className=" z-10 bottom-0 md:bottom-[200px] absolute  pr-[2rem] grid gap-6 pb-[3rem] text-white">
            <h3 className=" md:w-[500px] font-semibold text-2xl leading-9 text-[#4CAF50]">
              Pure Ingredients, Real Results
            </h3>
            <p className=" md:w-[600px] w-full leading-6 text-[#efefef] text-base">
              Our supplements are crafted with the finest ingredients to ensure
              you get the nutrition you need, without compromise. Shop
              confidently for a better you.
            </p>
            <button
              className=" bg-[#FF9800] hover:bg-[#E91E63] duration-300 ease-in-out transition-all text-white h-[40px] text-sm font-medium rounded-md w-[150px]"
              onClick={() => push("/products")}
            >
              Shop Now
            </button>
          </div>
        </div>
        {/*  */}
        <div className=" w-full md:h-[700px] min-h-screen bg-fixed bg-center herobg4 px-[1rem] md:px-[2rem] lg:px-[4rem] bg-[url('../../asset/images/herobg2.jpg')]">
          <div className=" absolute bg-black/50 md:h-[700px] min-h-screen  w-[100%] z-0 left-0" />
          <div className=" z-10 bottom-0 md:bottom-[200px] absolute  pr-[2rem] grid gap-6 pb-[3rem] text-white">
            <h3 className=" md:w-[500px] font-semibold text-2xl leading-9 text-[#4CAF50]">
              Optimize Your Health, Naturally
            </h3>
            <p className=" md:w-[600px] w-full leading-6 text-[#efefef] text-base">
              Boost your daily routine with science-backed supplements made from
              natural ingredients. Elevate your health, one supplement at a
              time.
            </p>
            <button
              className=" bg-[#FF9800] hover:bg-[#E91E63] duration-300 ease-in-out transition-all text-white h-[40px] text-sm font-medium rounded-md w-[150px]"
              onClick={() => push("/products")}
            >
              Shop Now
            </button>
          </div>
        </div>
      </Slider>
    </section>
  );
};

export default Hero;
