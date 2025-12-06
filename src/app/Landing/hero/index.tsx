"use client";
import React from "react";
import { Bounded } from "../../../components/Bounded";
import model from "./model.json";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";
import Scene from "./Scene";
import {useStore} from "@/hooks/useStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP , ScrollTrigger);

type Props = {};

export default function Index({}: Props) {

  const ready = useStore((state) => state.ready);
  const isDesktop = useMediaQuery("(min-width: 768px)",true);

  useGSAP(() => {
    if (!ready && isDesktop) return;
    const introTL = gsap.timeline();

    introTL
      .set(".hero", { opacity: 1 })
      .from(".hero-header", {
        scale: 3,
        opacity: 0,
        ease: "power4.in",
        delay: 0.3,
        stagger: 0.3,
        duration: 0.8,
      })
      .from(".hero-subheading", { 
        opacity: 0,
        y: 30,
      }, "+=0.8")
      .from(".hero-button", { 
        opacity: 0,
        y: 10,
        duration: 0.6,
      })

      const scrollTL = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top",
          end: "bottom bottom ",
          scrub: 1.5,
          markers: true,
        }})
      scrollTL
      .fromTo("body",
        { backgroundColor: "#FDE047" },
        { backgroundColor: "#D9F99D", overwrite: "auto" },1
      ).from(".text-side-heading",{
        scale: 1.3,
        y: 40,
        rotate: -25,
        opacity: 0,
        stagger:.1,
        ease:"back.out(3)",
        duration:5
      }).from(".text-side-body",{
        opacity:0,
        y:20 })
  },{dependencies:[ready, isDesktop]});

  const { title1, subheading, buttonText, alldrinks, title2, paragraph1 } = model;
  const words = title1.split(" ");

  return (
    <Bounded className="hero opacity-0">
      {isDesktop &&(
        <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
          <Scene /> 
        </View>
      )}
      
      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <div className="flex flex-wrap justify-center gap-4 leading-[.8]">
              {words.slice(0, 2).map((w, i) => (
                <h1
                  key={i}
                  className="hero-header inline-block text-7xl font-black uppercase text-orange-500 md:text-[9rem] lg:text-[13rem]"
                >
                  {w}
                </h1>
              ))}
            </div>

            <div className="hero-subheading mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl">
              {subheading}
            </div>

            <button className="hero-button mt-12 rounded-xl bg-orange-600 px-5 py-4 text-center text-xl font-bold uppercase tracking-wide text-white transition-colors duration-150 hover:bg-orange-700 md:text-2xl cursor-pointer">
              {buttonText}
            </button>
          </div>
        </div>

        <div className="text-side relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2">
          <img className="w-full md:hidden" src={alldrinks} />
          <div>
            <h2 className="text-side-heading text-balance text-6xl font-black uppercase text-sky-950 lg:text-8xl">
              {title2}
            </h2>
            <div className="text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-sky-950">
              {paragraph1}
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
}
