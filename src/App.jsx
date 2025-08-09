import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SpiralStairs from "./SpiralStairs";

export default function App() {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [10, 10, 20], fov: 45 }}
        shadows
      >
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.3} />
        <spotLight
          position={[10, 20, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <SpiralStairs />
        <OrbitControls enableZoom enablePan={false} />
      </Canvas>
    </div>
  );
}
