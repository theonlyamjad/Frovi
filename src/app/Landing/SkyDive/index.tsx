"use client";

import { Bounded } from "@/components/Bounded";
import Scene from "./Scene"; // default export
import { View } from "@react-three/drei";
import { JSX } from "react";

// Minimal slice type so this file compiles without Prismic
type SkyDiveSlice = {
  slice_type: string;
  variation: string;
  primary?: {
    sentence?: string | null;
  };
};

export type SkyDiveProps = { slice: SkyDiveSlice };

/**
 * Component for "SkyDive" Slices.
 */
const SkyDive = ({ slice }: SkyDiveProps): JSX.Element => {
  const sentence = slice?.primary?.sentence ?? "REFRESHING TASTE";

  return (
    <Bounded
      data-slice-type={slice?.slice_type ?? "default"}
      data-slice-variation={slice?.variation ?? "default"}
      className="skydive h-screen"
    >
      <View className="h-screen w-screen">
        <Scene flavor="blackCherry" sentence={sentence} />
      </View>
    </Bounded>
  );
};

export default SkyDive;
