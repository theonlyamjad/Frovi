"use client";

import { Bounded } from "@/components/Bounded";
import { View } from "@react-three/drei";
import Scene from "./Scene";
import clsx from "clsx";
import model from "./model.json";
import { JSX } from "react";


type AlternatingTextSlice = {
  slice_type: string;
  variation: string;
};

/**
 * Props for `AlternatingText`.
 */
export type AlternatingTextProps = {
  slice: AlternatingTextSlice;
};

// Create text group from model.json
const textGroup = [
  {
    heading: model.title1,
    body: model.subtitle1,
  },
  {
    heading: model.title2,
    body: model.subtitle2,
  },
  {
    heading: model.title3,
    body: model.subtitle3,
  },
];

/**
 * Component for "AlternatingText" Slices.
 */
const AlternatingText = ({ slice }: AlternatingTextProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="alternating-text-container relative bg-yellow-300 text-sky-950"
    >
      <div>
        <div className="relative z-[100] grid">
          <View className="alternating-text-view absolute left-0 top-0 h-screen w-full">
            <Scene />
          </View>

          {textGroup.map((item, index) => (
            <div
              key={item.heading}
              className="alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2"
            >
              <div
                className={clsx(
                  index % 2 === 0 ? "col-start-1" : "md:col-start-2",
                  "rounded-lg p-4 backdrop-blur-lg max-md:bg-white/30",
                )}
              >
                <h2 className="text-balance text-7xl font-bold">
                  {item.heading}
                </h2>
                <div className="mt-4 text-xl">
                  {item.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default AlternatingText;