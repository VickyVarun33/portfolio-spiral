import React, { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

export default function SpiralStairs({
  turns = 8,
  stepsPerTurn = 14,
  radius = 4,
  stepHeight = 0.45
}) {
  const group = useRef();
  const total = turns * stepsPerTurn;
  const [openItem, setOpenItem] = useState(null);
  const [hoverHovered, setHoverHovered] = useState(false);

  const steps = useMemo(() => {
    const arr = [];
    for (let i = 0; i < total; i++) {
      const angle = (i / stepsPerTurn) * Math.PI * 2;
      const y = i * stepHeight - (total * stepHeight) / 2 + 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      arr.push({ i, pos: [x, y, z], rot: [0, -angle + Math.PI / 2, 0] });
    }
    return arr;
  }, [total, stepsPerTurn, radius, stepHeight]);

  // idle gentle rotation to emulate hall atmosphere
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.05) * 0.02;
      group.current.position.y = Math.sin(clock.getElapsedTime() * 0.03) * 0.03;
    }
  });

  // sample data for some steps
  const sampleStops = [
    { id: "about", title: "About Me", short: "Creative engineer building cinematic web" },
    { id: "skills", title: "Skills", short: "React · Three.js · GLSL · Tailwind" },
    { id: "projects", title: "Projects", short: "Interactive demos & visualizers" },
    { id: "experience", title: "Experience", short: "Internships & freelancing" },
    { id: "contact", title: "Contact", short: "Let’s collaborate" }
  ];

  return (
    <group ref={group}>
      {/* central column */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[radius * 0.3, radius * 0.3, turns * stepsPerTurn * stepHeight + 8, 64]} />
        <meshStandardMaterial color="#04131b" metalness={0.1} roughness={0.6} />
      </mesh>

      {/* steps */}
      {steps.map((s) => (
        <group key={s.i} position={s.pos} rotation={s.rot}>
          <mesh receiveShadow castShadow>
            <boxGeometry args={[2.2, 0.18, 0.9]} />
            <meshStandardMaterial color="#071626" metalness={0.2} roughness={0.45} />
          </mesh>

          {/* subtle edge emissive strip */}
          <mesh position={[0.95, 0.06, 0]}>
            <boxGeometry args={[0.4, 0.02, 0.86]} />
            <meshStandardMaterial emissive="#0bb3ff" emissiveIntensity={0.06} color="#001217" />
          </mesh>

          {/* occasionally add interactive stop above the step */}
          {s.i % Math.floor(total / sampleStops.length) === 0 && (
            <group position={[0, 0.48, 0]}>
              <mesh onPointerOver={() => setHoverHovered(true)} onPointerOut={() => setHoverHovered(false)} onClick={() => setOpenItem(sampleStops[Math.floor((s.i / total) * sampleStops.length)])}>
                <boxGeometry args={[1.2, 0.36, 0.36]} />
                <meshStandardMaterial emissive={hoverHovered ? "#ffd27a" : "#cfe9ff"} emissiveIntensity={hoverHovered ? 0.9 : 0.4} color="#08151d" />
              </mesh>

              <Html position={[0, 0.9, 0]} center transform occlude>
                <div className="panel-ui" style={{ width: 220 }}>
                  <h3 className="text-base font-semibold">{ sampleStops[Math.floor((s.i / total) * sampleStops.length)].title }</h3>
                  <p className="text-xs text-sky-200 mt-1">{ sampleStops[Math.floor((s.i / total) * sampleStops.length)].short }</p>
                  <div className="mt-2">
                    <button className="hud-btn" onClick={() => setOpenItem(sampleStops[Math.floor((s.i / total) * sampleStops.length)])}>Open</button>
                  </div>
                </div>
              </Html>
            </group>
          )}
        </group>
      ))}

      {/* modal detail panel (Html full screen) */}
      {openItem && (
        <Html fullscreen>
          <div style={{ display: "grid", placeItems: "center", height: "100vh", pointerEvents: "auto" }}>
            <div className="panel-ui" style={{ width: 720 }}>
              <h2 className="text-2xl font-bold mb-2">{ openItem.title }</h2>
              <p style={{ color: "#cfe9ff" }}>Detailed info about {openItem.title}. Replace with your biography, list of projects, skills, etc.</p>
              <div style={{ marginTop: 18 }}>
                <button onClick={() => setOpenItem(null)} className="hud-btn">Close</button>
              </div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
