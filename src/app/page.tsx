"use client";
import SkyDive from "./Landing/SkyDive";
import Hero from "./Landing/hero";
import Carousel from "./Landing/Carousel";
import AlternatingText from "@/app/Landing/AlternatingText";
import BigText from "@/app/Landing/BigText";

export default function Page() {
  
  const skyDiveSlice = {
    slice_type: "sky_dive",
    variation: "default",
    primary: {
      sentence: "Coffee fuels Juices refresh Sodas chill", 
    },
  };

  const carouselSlice = {
    slice_type: "carousel",
    variation: "default",
  };

  const alternatingTextSlice = {
    slice_type: "alternating_text",
    variation: "default",
  };

  const bigTextSlice = {
    slice_type: "big_text",
    variation: "default",
  };
  
  return (
    <>
      <Hero />
      <SkyDive slice={skyDiveSlice} />
      <Carousel slice={carouselSlice} />
      <AlternatingText slice={alternatingTextSlice} />
      <BigText slice={bigTextSlice} />
    </>
  );
}