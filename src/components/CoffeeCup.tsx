"use client";

import { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Group } from "three";

useGLTF.preload('/scene.gltf');

export type CoffeeCupProps = {
  scale?: number;
};

export const CoffeeCup = forwardRef<Group, CoffeeCupProps>(
  ({ scale = 0.013, ...props }, ref) => {
    const { nodes, materials } = useGLTF('/scene.gltf') as any;
    
    return (
      <group ref={ref} {...props} dispose={null} scale={scale}>
        <group rotation={[1.57, 0.008, 0.256]}>
          <group rotation={[-Math.PI, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['Object_1_Plastic_(3)_0'].geometry}
              material={materials.Plastic_3}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_2_Plastic_0.geometry}
              material={materials.Plastic}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_3_Plastic_0.geometry}
              material={materials.Plastic}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_4_Plastic_0.geometry}
              material={materials.Plastic}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes['Object_5_Plastic_(2)_0'].geometry}
              material={materials.Plastic_2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_6_Plastic_0.geometry}
              material={materials.Plastic}
            />
          </group>
        </group>
      </group>
    );
  }
);

CoffeeCup.displayName = "CoffeeCup";

export default CoffeeCup;