"use client";
import styles from "@/app/page.module.css";
import { faBootstrap, faNodeJs, faReact } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GitHub from "@mui/icons-material/GitHub";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Typography } from "@mui/material";
import { useRef } from "react";

export default function ProjectCard(props) {
  const { project } = props;
  const imgRef = useRef(null);

  // Icon Renderer
  const renderIcon = (tech, index) => {
    if (tech === "Bootstrap") {
      return <FontAwesomeIcon key={index} icon={faBootstrap} style={{ color: "#bfc7d2", pointerEvents: "none", userSelect: "none", aspectRatio: "1/1", height: "27px" }} size="xl" />;
    }
    if (tech === "React.JS") {
      return <FontAwesomeIcon key={index} icon={faReact} style={{ color: "#bfc7d2", pointerEvents: "none", userSelect: "none", aspectRatio: "1/1", height: "27px" }} size="xl" />;
    }
    if (tech === "Node.JS") {
      return <FontAwesomeIcon key={index} icon={faNodeJs} style={{ color: "#bfc7d2", pointerEvents: "none", userSelect: "none", aspectRatio: "1/1", height: "27px" }} size="xl" />;
    }
    if (tech === "GithubPages") {
      return <GitHubIcon key={index} style={{ color: "#bfc7d2", pointerEvents: "none", userSelect: "none", aspectRatio: "1/1", height: "27px" }} />;
    }
    if (tech === "NewsAPI") {
      return (
        <span key={index} className={`${styles.skillchip} pointer-events-none select-none`}>
          {tech}
        </span>
      );
    } else {
      return <img src={`/images/icons/${tech.toLowerCase()}_icon.png`} className="pointer-events-none select-none rounded-full m-0 p-0 aspect-square" alt={`${tech}`} key={index} style={{ width: "27px", height: "27px" }} loading="lazy"/>;
    }
  };

  // Event Handlers
  const onHover = (e) => {
    if (project.gif !== "") {
      setTimeout(() => {
        imgRef.current.src = project.gif;
      }, 300);
    }
  };
  const onLeave = (e) => {
    if (project.gif !== "") {
      setTimeout(() => {
        imgRef.current.src = project.imageSrc;
      }, 10000);
    }
  };
  return (
    <div className={styles.card}>
      <div className="relative cursor-pointer" onMouseOver={onHover} onMouseOut={onLeave} onTouchStartCapture={onHover} onTouchEndCapture={onLeave}>
        <a href={project.href} target="_blank" className={styles.cardlink}></a>
        <img src={project.imageSrc} alt={`${project.name}`} style={{ borderRadius: "7.5px" }} ref={imgRef} loading="lazy"/>
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
