"use client";

import { forwardRef, ReactNode } from "react";
import { Float } from "@react-three/drei";
import { Group } from "three";
import {CoffeeCup} from "@/components/CoffeeCup";

type FloatingCupProps = {
  floatSpeed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  floatingRange?: [number, number];
  children?: ReactNode;
};

const FloatingCup = forwardRef<Group, FloatingCupProps>(
  (
    {
      floatSpeed = 1.5,
      rotationIntensity = 1,
      floatIntensity = 1,
      floatingRange = [-0.1, 0.1],
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <group ref={ref} {...props}>
        <Float
          speed={floatSpeed}
          rotationIntensity={rotationIntensity}
          floatIntensity={floatIntensity}
          floatingRange={floatingRange}
        >
          {children}
          <CoffeeCup />
        </Float>
      </group>
    );
  },
);

FloatingCup.displayName = "FloatingCup";
export default FloatingCup;