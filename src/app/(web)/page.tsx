import BestSelling from "@/components/best-selling";
import Hero from "@/components/hero";
import ShopGoal from "@/components/shop";
import Choose from "../../components/choose";
import LearnMore from "../../components/learn-more";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className=" flex flex-col md:flex-row justify-between px-[1rem] md:px-[4rem] mb-[5rem]">
        <main className=" md:w-[400px]">
          <h3 className=" text-secondary_color">Benefits</h3>
          <h3 className=" font-medium text-3xl leading-10 pt-2">
            Benefits when using <br /> our services
          </h3>
        </main>
        <main className="md:w-[500px] text-text_color text-sm leading-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
          perferendis natus autem assumenda tempore temporibus quibusdam facere
          consectetur necessitatibus iste aliquid, accusantium accusamus dolor
          nisi praesentium quisquam sit? Natus, mollitia!
        </main>
      </div>
      <Choose />
      <ShopGoal />
      <BestSelling />
      <LearnMore />
    </div>
  );
}
