"use client";

import { forwardRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Group } from "three";

useGLTF.preload('/juice.gltf');

export type JuiceCupProps = {
  scale?: number;
};

export const JuiceCup = forwardRef<Group, JuiceCupProps>(
  ({ scale = 0.02, ...props }, ref) => {
    const { nodes, materials } = useGLTF('/juice.gltf') as any;
    
    return (
      <group ref={ref} {...props} dispose={null} scale={scale}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['15195_Large_Drink_with_Straw_V1'].geometry}
          material={nodes['15195_Large_Drink_with_Straw_V1'].material}
          position={[-0.155, 0.848, -0.238]}
          rotation={[-3.119, 0.016, -3.125]}
          scale={0.962}
        />
      </group>
    );
  }
);

JuiceCup.displayName = "JuiceCup";

export default JuiceCup;