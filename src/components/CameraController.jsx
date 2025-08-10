import React, { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function CameraController() {
  const { camera } = useThree();
  const prog = useRef(0); // camera progress along Y
  const target = useRef(new THREE.Vector3(0, 3.2, 10));
  const [zoomTarget, setZoomTarget] = useState(null);

  useEffect(() => {
    // set up scroll binding
    const onScroll = () => {
      const s = window.scrollY || window.pageYOffset;
      prog.current = s / (window.innerHeight * 1.2); // normalized
      // update target y modestly
      target.current.set(0, 2 + prog.current * 10, 8 - Math.min(prog.current * 6, 6));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // expose a global function for click-to-zoom so Step can call it
    window.__portfolio_zoomTo = (pos = [0, 2, 3.5]) => {
      setZoomTarget(new THREE.Vector3(pos[0], pos[1], pos[2]));
      // clear after 4s
      setTimeout(() => setZoomTarget(null), 4000);
    };
  }, []);

  useFrame((state, delta) => {
    // determine current desired pos
    const desired = zoomTarget ? zoomTarget : target.current;
    camera.position.lerp(desired, 0.06);
    // look slightly up the spiral center
    const lookAt = new THREE.Vector3(0, desired.y - 0.8, 0);
    camera.lookAt(lookAt);
    camera.updateProjectionMatrix();
  });

  return null;
}
