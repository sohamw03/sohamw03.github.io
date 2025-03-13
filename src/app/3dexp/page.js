"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ProjectSphere from "@/components/3D/ProjectSphere";
import Dark from "@/themes/Dark";

export default function ThreeDExp() {
  return (
    <>
      <Dark />
      <div className="w-screen h-screen select-none">
        <Canvas
          camera={{
            position: [4, -1, 25],
            fov: 70,
            near: 0.1,
            far: 1000,
          }}>
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            minDistance={20}
            maxDistance={40}
            maxPolarAngle={Math.PI * 0.65}
            minPolarAngle={Math.PI * 0.35}
            enablePan={true}
            enableZoom={false}
          />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <ProjectSphere />
        </Canvas>
      </div>
    </>
  );
}
