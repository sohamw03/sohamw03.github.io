"use client";
import { AIProjectsData, WebProjectsData } from "@/data";
import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import ProjectCard from "../Projects/ProjectCard";

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

  const calculatePositions = (projects, yOffset, radius = 16) => {
    const positions = [];
    const totalAmount = 9;
    const segmentAngle = (Math.PI * 2) / totalAmount;

    for (let i = 0; i < totalAmount; i++) {
      const angle = segmentAngle * i;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      positions.push({ position: new THREE.Vector3(x, yOffset, z), angle });
    }
    return positions;
  };

  const aiPositions = useMemo(() => calculatePositions(aiProjects, 6), [aiProjects]);
  const webPositions = useMemo(() => calculatePositions(webProjects, -6), [webProjects]);

  const renderProjects = (projects, positions, startIndex = 0) => {
    return projects.map((project, index) => {
      const globalIndex = startIndex + index;
      const { position, angle } = positions[index];

      return (
        <group
          key={globalIndex}
          position={position}
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
              <ProjectCard project={project} sx={"w-[27rem] bg-[#10151d]"}/>
            </div>
          </Html>
        </group>
      );
    });
  };

  return (
    <group ref={groupRef}>
      {renderProjects(aiProjects, aiPositions)}
      {renderProjects(webProjects, webPositions, aiProjects.length)}
    </group>
  );
}
