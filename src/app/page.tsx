import { Footer } from "@/components/layout/Footer";
import { BenefitsSection } from "@/features/home/components/BenefitsSection";
import { FeaturedGames } from "@/features/home/components/FeaturedGames";
import { HeroSection } from "@/features/home/components/HeroSection";
import { HowItWorks } from "@/features/home/components/HowItWorks";
import { StatsSection } from "@/features/home/components/StatsSection";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <StatsSection />
        <HowItWorks />
        <BenefitsSection />
        <FeaturedGames />
      </main>
      <Footer />
    </>
  );
}
