import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BenefitsSection } from "@/features/home/components/BenefitsSection";
import { FeaturedGames } from "@/features/home/components/FeaturedGames";
import { HeroSection } from "@/features/home/components/HeroSection";
import { HowItWorks } from "@/features/home/components/HowItWorks";
import { StatsSection } from "@/features/home/components/StatsSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <HowItWorks />
        <BenefitsSection />
        <FeaturedGames />
        {/* <CategoriesSection /> */}
        {/* <ContinueExploring /> */}
        {/* <FinalCTA /> */}
      </main>
      <Footer />
    </>
  );
}
