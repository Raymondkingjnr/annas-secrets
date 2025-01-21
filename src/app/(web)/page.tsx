import BestSelling from "@/components/best-selling";
import Hero from "@/components/hero";
import ShopGoal from "@/components/shop";
import Choose from "../../components/choose";

export default function Home() {
  return (
    <div className=" ">
      <Hero />
      <ShopGoal />
      <BestSelling />
      <Choose />
    </div>
  );
}
