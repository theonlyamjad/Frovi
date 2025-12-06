"use client";

import { useRef } from "react";
import { Environment} from "@react-three/drei";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "@/hooks/useStore";
import FloatingCan from "@/components/FloatingCan";
import FloatingCup from "@/components/FloatingCup";
import FloatingJuice from "@/components/FloatingJuice";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {};

export default function Scene({}: Props) {
  const isReady = useStore((state) => state.isReady);

  const cupRef = useRef<Group>(null);
  const can1Ref = useRef<Group>(null); // Black Cherry
  const juiceRef = useRef<Group>(null);

  const can1GroupRef = useRef<Group>(null);
  const cupGroupRef = useRef<Group>(null);
  const juiceGroupRef = useRef<Group>(null);
  const groupRef = useRef<Group>(null);

  const FLOAT_SPEED = 1.5;

  useGSAP(() => {
    if (
      !cupRef.current ||
      !can1Ref.current ||
      !juiceRef.current ||
      !can1GroupRef.current ||
      !cupGroupRef.current ||
      !juiceGroupRef.current ||
      !groupRef.current
    )
      return;

    isReady();

    // Initial placement
    // Can 1 - Black Cherry
    gsap.set(can1Ref.current.position, { x: -1.5 , y: -0.5 });
    gsap.set(can1Ref.current.rotation, { z: -0.5 });

    // Cup
    gsap.set(cupRef.current.position, { x: 2 , y: -0.5 });
    gsap.set(cupRef.current.rotation, { z: 0.5 });

    //juice

    gsap.set(juiceRef.current.position, { x: 0 , y: -0.5 });
    gsap.set(juiceRef.current.rotation, { z: 0 });

    const introTl = gsap.timeline({
      defaults: { duration: 3, ease: "back.out(1.4)" },
    });

    if (window.scrollY < 20) {
      introTl
        .from(can1GroupRef.current.position, { y: -5, x: 1 }, 0)
        .from(can1GroupRef.current.rotation, { z: 3 }, 0)
        .from(cupGroupRef.current.position, { y: 5, x: 1 }, 0)
        .from(cupGroupRef.current.rotation, { z: 3 }, 0)
        .from(juiceGroupRef.current.position, { y: -5, x: 1 }, 0)
        .from(juiceGroupRef.current.rotation, { z: 3 }, 0);
    }

    const scrollTl = gsap.timeline({
      defaults: { duration: 2 },
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    scrollTl
      // Rotate group for some motion
      .to(groupRef.current.rotation, { y: Math.PI * 2 })

      // Can 1 - Black Cherry focus
      .to(can1Ref.current.position, { x: -0.2, y: -0.7, z: -2 }, 0)
      .to(can1Ref.current.rotation, { z: 0.3 }, 0)

      // Cup follows the former Lemon Lime track
      .to(cupRef.current.position, { x: 1, y: -0.7, z: -2 }, 0)
      .to(cupRef.current.rotation, { z: 0 }, 0)

      //juice
      .to(juiceRef.current.position, { x: 0.6, y: -0.7, z: -2 }, 0)
      .to(juiceRef.current.rotation, { z: 0 }, 0)
      // Small lateral glide
      .to(
        groupRef.current.position,
        { x: 1, duration: 3, ease: "sine.inOut" },
        1.3
      );
  });

  return (
    <group ref={groupRef}>
      <group ref={can1GroupRef}>
        <FloatingCan ref={can1Ref} flavor="blackCherry" floatSpeed={FLOAT_SPEED} />
      </group>

      <group ref={cupGroupRef} scale={0.8}>
        <FloatingCup ref={cupRef} />
      </group>

      <group ref={juiceGroupRef} scale={5}>
        <FloatingJuice ref={juiceRef} floatSpeed={FLOAT_SPEED} />
      </group>

      <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5} />
    </group>
  );
}
