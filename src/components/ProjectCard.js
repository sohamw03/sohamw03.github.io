"use client";
import styles from "@/app/page.module.css";
import { faBootstrap, faReact } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GitHub from "@mui/icons-material/GitHub";
import { Typography } from "@mui/material";
import { useRef } from "react";

export default function ProjectCard(props) {
  const { project } = props;
  const imgRef = useRef(null);

  // Icon Renderer
  const renderIcon = (tech, index) => {
    if (tech === "Bootstrap") {
      return <FontAwesomeIcon key={index} icon={faBootstrap} style={{ color: "#bfc7d2", pointerEvents: "none", userSelect: "none" }} size="xl" />;
    }
    if (tech === "React.JS") {
      return <FontAwesomeIcon key={index} icon={faReact} style={{ color: "#bfc7d2", pointerEvents: "none", userSelect: "none" }} size="xl" />;
    }
    if (tech === "NewsAPI") {
      return (
        <span key={index} className={`${styles.skillchip} pointer-events-none select-none`}>
          {tech}
        </span>
      );
    } else {
      return <img src={`/images/icons/${tech.toLowerCase()}_icon.png`} className="pointer-events-none select-none" alt={`${tech}`} key={index} style={{ width: "27px", height: "27px" }} />;
    }
  };

  // Event Handlers
  const onHover = (e) => {
    if (project.gif !== "") {
      setTimeout(() => {
        imgRef.current.src = project.gif;
      }, 500);
    }
  };
  const onLeave = (e) => {
    if (project.gif !== "") {
      setTimeout(() => {
        imgRef.current.src = project.imageSrc;
      }, 6000);
    }
  };
  return (
    <div className={styles.card}>
      <div className="relative cursor-pointer" onMouseOver={onHover} onMouseOut={onLeave} onTouchStart={onHover} onTouchEnd={onLeave}>
        <a href={project.href} target="_blank" className={styles.cardlink}></a>
        <img src={project.imageSrc} alt={`${project.name}`} style={{ borderRadius: "7.5px" }} ref={imgRef} />
      </div>
      <div className="flex justify-between items-center mt-4 ms-2 me-2">
        <div className={`flex flex-row gap-2 justify-start items-center pointer-events-none`}>
          {project.techStack.map((tech, index) => {
            return renderIcon(tech, index);
          })}
        </div>
        <a className="rounded-full" href={project.github} target="_blank">
          <GitHub className="text-[#808c9c] transition-colors hover:text-[#bfc7d2] cursor-pointer" />
        </a>
      </div>
      <Typography variant="h6" gutterBottom>
        {project.name}
      </Typography>
      <p style={{ fontSize: "14px", color: "#808c9c" }}>{project.description}</p>
    </div>
  );
}