import BestSelling from "@/components/best-selling";
import Hero from "@/components/hero";
import ShopGoal from "@/components/shop";
// import Choose from "../../components/choose";
// import LearnMore from "../../components/learn-more";
import BackToTopButton from "@/components/bact-to-top";
import Testimonials from "@/components/testimonials";
import Collection from "@/components/collection";
import NewArrival from "@/components/new-arrivals";
import BrandsCom from "@/components/brands";

export default function Home() {
  return (
    <div>
      <Hero />
      <Collection />
      <ShopGoal />
      <BrandsCom />
      <BestSelling />
      <NewArrival />
      {/* <Choose /> */}
      <BackToTopButton />
      <Testimonials />
      {/* <LearnMore /> */}
    </div>
  );
}
