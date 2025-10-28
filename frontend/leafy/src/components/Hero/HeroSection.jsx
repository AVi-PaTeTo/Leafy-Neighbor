import { useState } from "react";
import HeroImage from "./HeroImage";
import HeroText from "./HeroText";

const HeroSection = () => {
  return (
    <div className="w-full h-full grid grid-cols-[1fr_5fr_1fr] grid-rows-[1fr_5fr_1fr]">
      <HeroText />
      <HeroImage />
    </div>
  );
};

export default HeroSection;
