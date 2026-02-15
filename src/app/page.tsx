import HeroSection from "@/components/Hero";
import Image from "next/image";
import CategorySection from "../components/categorySection";
import { cookies } from "next/headers";
import FilteredMealCard from "@/components/FilteredMeals";

export default function Home() {
  
  return (
    <div className="max-w-[86rem] mx-auto">
      
      <HeroSection />
      <FilteredMealCard/>
      <CategorySection/>
    </div>
  );
}
