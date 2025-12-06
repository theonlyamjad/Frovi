"use client";
import { JSX } from "react";

type BigTextSlice = {
  slice_type: string;
  variation: string;
};

/**
 * Props for `BigText`.
 */
export type BigTextProps = {
  slice: BigTextSlice;
};

/**
 * Component for "BigText" Slices.
 */
const BigText = ({ slice }: BigTextProps): JSX.Element => {
  return (
    <section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  className="min-h-screen w-full overflow-hidden bg-[#FE6334] text-[#FEE832] flex items-center justify-center p-4"
>
  <h2 className="grid w-full max-w-[95vw] gap-[2vw] text-center font-black uppercase leading-[.7]">
    <div className="text-[18vw] md:text-[22vw]">Drinks</div>
    <div className="flex flex-wrap justify-center gap-[1.5vw] md:gap-[2vw]">
      <span className="text-[18vw] md:text-[9vw]">that</span>
      <span className="text-[16vw] md:text-[9vw]">makes</span>
      <span className="text-[24vw] md:text-[9vw]">you</span>
    </div>
    <div className="text-[18vw] md:text-[22vw]">Smile</div>
  </h2>
</section>
  );
};

export default BigText;