import React, { useEffect } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

export default function Hall() {
  const { scene } = useThree();

  useEffect(() => {
    // Add fog to the scene
    scene.fog = new THREE.FogExp2("#02030a", 0.015);
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#05060a" metalness={0.2} roughness={0.6} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-18, 8, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial color="#071025" metalness={0.1} roughness={0.7} />
      </mesh>

      {/* Right wall */}
      <mesh position={[18, 8, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial color="#071025" metalness={0.1} roughness={0.7} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 8, -30]} receiveShadow>
        <planeGeometry args={[60, 28]} />
        <meshStandardMaterial color="#060718" metalness={0.05} roughness={0.8} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 18, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#02030a" metalness={0.02} roughness={0.9} />
      </mesh>

      {/* Tall pillar lights to give hall grandeur */}
      {[ -10, -5, 0, 5, 10 ].map((x, i) => (
        <group key={i} position={[x, 2, -6]}>
          <mesh position={[0, 2, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 6, 16]} />
            <meshStandardMaterial color="#0a2233" roughness={0.8} />
          </mesh>
          <mesh position={[0, 5.6, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 0.2, 12]} />
            <meshStandardMaterial emissive="#ffd7a3" emissiveIntensity={0.9} color="#000" />
          </mesh>
        </group>
      )) }
    </group>
  );
}
