import BestSelling from "@/components/best-selling";
import Hero from "@/components/hero";
import ShopGoal from "@/components/shop";
import Choose from "../../components/choose";
import LearnMore from "../../components/learn-more";
import BackToTopButton from "@/components/bact-to-top";

export default function Home() {
  return (
    <div>
      <Hero />
      <ShopGoal />
      <BestSelling />
      <div className=" flex flex-col md:flex-row justify-between px-[1rem] md:px-[4rem] pt-6 mb-[5rem]">
        <main className=" md:w-[400px]">
          <h3 className=" text-secondary_color">Benefits</h3>
          <h3 className="  py-4 font-thin text-xl text-[#333333] ">
            Benefits when using <br /> our services
          </h3>
        </main>
        <main className="md:w-[500px] text-text_color text-xs leading-6">
          Experience the difference with our seamless shopping experience. From
          expert guidance to reliable support, we’re here to make your wellness
          journey easier, smarter, and more rewarding.
        </main>
      </div>
      <Choose />
      <BackToTopButton />
      <LearnMore />
    </div>
  );
}
