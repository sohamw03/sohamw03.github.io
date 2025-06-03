"use client";
import styles from "@/app/page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import AboutContactButton from "@/components/Oneoffs/AboutContactButton";
import Dark from "@/themes/Dark";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import ProjectSphere from "./ProjectSphere";

export default function ThreeDExp() {
  return (
    <div className={styles.home}>
      <nav className={`${styles.navBtns} flex flex-row items-center justify-end gap-3 absolute left-0 w-full mt-12 px-12 z-[999999999]`}>
        <AboutContactButton />
      </nav>
      <Navbar />
      <Dark />
      <div className="w-screen h-screen select-none">
        {" "}
        <Canvas
          camera={{
            position: [-10, 12, 45],
            fov: 60,
            near: 0.1,
            far: 1000,
          }}>
          <OrbitControls target={[0, 6, 0]} enableDamping dampingFactor={0.05} minDistance={20} maxDistance={40} maxPolarAngle={Math.PI * 0.65} minPolarAngle={Math.PI * 0.35} enablePan={false} enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <ProjectSphere />
        </Canvas>
      </div>
    </div>
  );
}
