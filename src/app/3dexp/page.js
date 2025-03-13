"use client";
import Navbar from "@/components/Navbar/Navbar";
import Dark from "@/themes/Dark";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import ProjectSphere from "./ProjectSphere";
import styles from "@/app/page.module.css";

export default function ThreeDExp() {
  return (
    <div className={styles.home}>
      <Navbar />
      <Dark />
      <div className="w-screen h-screen select-none">
        <Canvas
          camera={{
            position: [0, 0, 35],
            fov: 60,
            near: 0.1,
            far: 1000,
          }}>
          <OrbitControls enableDamping dampingFactor={0.05} minDistance={20} maxDistance={40} maxPolarAngle={Math.PI * 0.65} minPolarAngle={Math.PI * 0.35} enablePan={true} enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <ProjectSphere />
        </Canvas>
      </div>
    </div>
  );
}
