"use client";

import { Center, Environment, View } from "@react-three/drei";
import { JSX, useRef, useState } from "react";
import clsx from "clsx";
import { Group } from "three";
import gsap from "gsap";

import FloatingCan from "@/components/FloatingCan";
import { SodaCanProps } from "@/components/SodaCan";
import { ArrowIcon } from "./ArrowIcon";
import { WavyCircles } from "./WavyCircles";

const SPINS_ON_CHANGE = 8;
const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
}[] = [
  { flavor: "blackCherry", color: "#710523", name: "Black Cherry" },
  { flavor: "grape", color: "#572981", name: "Grape Goodness" },
  { flavor: "lemonLime", color: "#164405", name: "Lemon Lime" },
  { flavor: "strawberryLemonade",color: "#690B3D",name: "Strawberry Lemonade",},
  { flavor: "watermelon", color: "#4B7002", name: "Watermelon Crush" },
];

type CarouselSlice = {
  slice_type: string;
  variation: string;
};

/**
 * Props for `Carousel`.
 */
export type CarouselProps = {
  slice: CarouselSlice;
};

/**
 * Component for "Carousel" Slices.
 */
export default function Carousel({ slice }: CarouselProps): JSX.Element {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);
  const sodaCanRef = useRef<Group>(null);

  function changeFlavor(index: number) {
    if (!sodaCanRef.current) return;

    const nextIndex = (index + FLAVORS.length) % FLAVORS.length;

    const tl = gsap.timeline();

    tl.to(
      sodaCanRef.current.rotation,
      {
        y:
          index > currentFlavorIndex
            ? `-=${Math.PI * 2 * SPINS_ON_CHANGE}`
            : `+=${Math.PI * 2 * SPINS_ON_CHANGE}`,
        ease: "power2.inOut",
        duration: 1,
      },
      0,
    )
      .to(
        ".background, .wavy-circles-outer, .wavy-circles-inner",
        {
          backgroundColor: FLAVORS[nextIndex].color,
          fill: FLAVORS[nextIndex].color,
          ease: "power2.inOut",
          duration: 1,
        },
        0,
      )
      .to(".text-wrapper", { duration: 0.2, y: -10, opacity: 0 }, 0)
      .to({}, { onStart: () => setCurrentFlavorIndex(nextIndex) }, 0.5)
      .to(".text-wrapper", { duration: 0.2, y: 0, opacity: 1 }, 0.7);
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel relative grid h-screen grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white"
    >
      <div className="background pointer-events-none absolute inset-0 bg-[#710523] opacity-50" />

      <WavyCircles className="pointer-events-none absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#710523]" />

      <h2 className="relative text-center text-5xl font-bold">
        Choose your Flavour
      </h2>

      {/* Canvas + Arrows container */}
      <div className="relative mx-auto aspect-square h-[70vmin] min-h-40">
        {/* Can */}
        <View className="h-full w-full">
          <Center position={[0, 0, 1.5]}>
            <FloatingCan
              ref={sodaCanRef}
              floatIntensity={0.3}
              rotationIntensity={1}
              flavor={FLAVORS[currentFlavorIndex].flavor}
            />
          </Center>

          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>

        {/* Left */}
        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex + 1)}
          direction="left"
          label="Previous Flavor"
          className="absolute -left-10 top-1/2 -translate-y-1/2 md:-left-12 lg:-left-16"
        />

        {/* Right */}
        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex - 1)}
          direction="right"
          label="Next Flavor"
          className="absolute -right-10 top-1/2 -translate-y-1/2 md:-right-12 lg:-right-16"
        />
      </div>

      <div className="text-area relative mx-auto text-center">
        <div className="text-wrapper text-4xl font-medium">
          <p>{FLAVORS[currentFlavorIndex].name}</p>
        </div>
      </div>
    </section>
  );
}

type ArrowButtonProps = {
  direction?: "right" | "left";
  label: string;
  onClick: () => void;
  className?: string;
};

function ArrowButton({
  label,
  onClick,
  direction = "right",
  className,
}: ArrowButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "size-12 rounded-full border-2 border-white bg-white/10 p-3 opacity-85 ring-white",
        "focus:outline-none focus-visible:opacity-100 focus-visible:ring-4",
        "md:size-16 lg:size-20",
        "z-10 pointer-events-auto",
        "cursor-pointer",
        className,
      )}
      aria-label={label}
    >
      <ArrowIcon className={clsx(direction === "right" && "-scale-x-100" )} />
      <span className="sr-only">{label}</span>
    </button>
  );
}
