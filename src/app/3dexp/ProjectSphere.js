"use client";
import { AIProjectsData, WebProjectsData } from "@/data";
import { Float, Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import ProjectCard from "../../components/Projects/ProjectCard";

export default function ProjectSphere() {
  const groupRef = useRef();
  const webProjects = useMemo(() => WebProjectsData, []);
  const aiProjects = useMemo(() => AIProjectsData, []);
  const { invalidate } = useThree();

  useEffect(() => {
    if (!groupRef.current) return;
    let animationFrameId;
    const animate = () => {
      if (groupRef.current) {
        groupRef.current.rotation.y += 0.0001;
        invalidate();
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [invalidate]);

  const calculatePositions = (count, yOffset, radius = 18) => {
    const positions = [];
    const segmentAngle = (Math.PI * 2) / 9;

    for (let i = 0; i < count; i++) {
      const angle = segmentAngle * i;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      positions.push({ position: new THREE.Vector3(x, yOffset, z), angle });
    }
    return positions;
  };

  const aiPositions = useMemo(() => calculatePositions(aiProjects.length, 6), [aiProjects.length]);
  const webPositions = useMemo(() => calculatePositions(webProjects.length, -6), [webProjects.length]);

  const renderProjects = (projects, positions) => {
    return projects.map((project, index) => {
      const { position, angle } = positions[index];

      return (
        <Float key={index} rotationIntensity={0} floatIntensity={0} position={position}>
          <group
            rotation={[0, Math.PI / 2.2 - angle, 0]}
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.href, "_blank");
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              document.body.style.cursor = "auto";
            }}>
            <Html
              transform
              occlude="blending"
              style={{
                width: "300px",
                transform: `translateX(-50%) translateY(-50%)`,
                pointerEvents: "auto",
              }}
              distanceFactor={10}>
              <div className="hover:scale-110 transition-all duration-300 select-none">
                <ProjectCard project={project} sx={"w-[27rem] bg-[#10151d]"} />
              </div>
            </Html>
          </group>
        </Float>
      );
    });
  };

  return (
    <group ref={groupRef}>
      {renderProjects(aiProjects, aiPositions)}
      {renderProjects(webProjects, webPositions)}
    </group>
  );
}
