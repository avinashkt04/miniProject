import {
  AboutSection,
  FeaturesSection,
  HeroSection,
  QuoteSection,
} from "@/components";
import React from "react";

function Home() {
  return (
    <div>
      <HeroSection />
      <div className="border-b flex justify-center items-center pb-8 mx-2">
        <AboutSection />
      </div>
      <FeaturesSection />
      <QuoteSection />
    </div>
  );
}

export default Home;
