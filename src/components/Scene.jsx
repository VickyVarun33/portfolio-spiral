import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import SpiralStairs from "./SpiralStairs";
import CameraController from "./CameraController";
import Effects from "./Effects";
import Hall from "./Hall";

export default function Scene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 3.2, 10], fov: 46 }}
      gl={{ antialias: true, physicallyCorrectLights: true }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#02030a"]} />

      {/* Suspense used for heavier components */}
      <Suspense fallback={null}>
        {/* Grand Hall */}
        <Hall />

        {/* Lighting: cinematic key + rim */}
        <ambientLight intensity={0.25} />
        <spotLight position={[8, 18, 8]} angle={0.35} intensity={2.2} penumbra={0.6} castShadow />
        <spotLight position={[-8, 16, -8]} angle={0.5} intensity={0.9} penumbra={0.9} />

        {/* Spiral stairs */}
        <SpiralStairs />

        {/* Environment glow (soft) */}
        <Environment preset="studio" />

        {/* Cinematic camera controller */}
        <CameraController />

        {/* Postprocessing */}
        <Effects />
      </Suspense>

      {/* OrbitControls only for debugging; disabled for production by default */}
      {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
    </Canvas>
  );
}
