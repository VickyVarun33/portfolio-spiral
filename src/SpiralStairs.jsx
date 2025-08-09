import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

export default function SpiralStairs() {
  const group = useRef();
  const steps = 50; // number of visible stairs
  const radius = 5;
  const heightStep = 0.5;
  const angleStep = Math.PI / 10;

  useFrame(({ clock }) => {
    group.current.rotation.y = clock.getElapsedTime() * 0.1;
  });

  return (
    <group ref={group}>
      {[...Array(steps)].map((_, i) => {
        const angle = i * angleStep;
        const y = i * heightStep;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <group key={i} position={[x, y, z]} rotation={[0, -angle, 0]}>
            {/* Step platform */}
            <mesh receiveShadow castShadow>
              <boxGeometry args={[2, 0.2, 1]} />
              <meshStandardMaterial
                color="#1e1e1e"
                metalness={0.4}
                roughness={0.5}
              />
            </mesh>

            {/* Glowing stop */}
            <mesh position={[0, 0.4, 0]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial
                emissive={"#ff6600"}
                emissiveIntensity={1.5}
                color={"#ff6600"}
              />
            </mesh>

            {/* Text details */}
            {i % 5 === 0 && (
              <Html
                distanceFactor={10}
                position={[0, 0.6, 0]}
                center
                style={{ pointerEvents: "none" }}
              >
                <div className="bg-black/60 text-white p-2 rounded text-xs w-32 text-center border border-white/20">
                  <strong>Skill {i / 5 + 1}</strong>
                  <br />
                  Some description here
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}
