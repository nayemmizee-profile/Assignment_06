import HeroSection from "@/components/hero";
import Card from "@/components/homepage/card";
import ListedCard from "./MyPlan/page";

export default function Home() {
  return (
    <main>
      {/* <Navbar /> */}
      <HeroSection />
      <Card />
      <ListedCard />
    </main>
  );
}
