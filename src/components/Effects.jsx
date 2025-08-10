import React from "react";
import { EffectComposer, Bloom, DepthOfField, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function Effects() {
  return (
    <EffectComposer>
      <Bloom intensity={0.7} luminanceThreshold={0.85} luminanceSmoothing={0.2} blendFunction={BlendFunction.SCREEN} />
      <DepthOfField focusDistance={0.02} focalLength={0.02} bokehScale={2} />
      <Vignette eskil={false} offset={0.4} darkness={0.9} />
    </EffectComposer>
  );
}
