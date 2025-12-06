"use client";

import { forwardRef, ReactNode } from "react";
import { Float } from "@react-three/drei";
import { Group } from "three";
import {JuiceCup} from "@/components/JuiceCup";

type FloatingJuiceProps = {
  floatSpeed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  floatingRange?: [number, number];
  children?: ReactNode;
};

const FloatingJuice = forwardRef<Group, FloatingJuiceProps>(
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
          <JuiceCup />
        </Float>
      </group>
    );
  },
);

FloatingJuice.displayName = "FloatingJuice";
export default FloatingJuice;