"use client";
import styles from "@/app/page.module.css";
import { OpenNewPage, renderIcon } from "@/functions/utils";
import GitHub from "@mui/icons-material/GitHub";
import { Divider, Tooltip, Typography } from "@mui/material";
import React, { useRef } from "react";

export default function ProjectOverflowCard(props) {
  const { projects, sx } = props;
  const scrollContainerRef = useRef(null);

  return (
    <div className={`${styles.card} ${sx} overflow-hidden`}>
      <div ref={scrollContainerRef} className="overflow-y-auto max-h-[26rem] pr-2" style={{ scrollbarWidth: "thin", scrollbarColor: "#4b5563 #1a202c" }}>
        <Typography variant="h5" className="ps-2 pt-2">
          Others
        </Typography>
        {projects.map((project, projectIndex) => (
          <React.Fragment key={`${project.name}-${projectIndex}`}>
            <Divider variant="fullWidth" className="bg-[var(--ui-border-color)] mt-2 mb-3" />
            <div className="mb-3 last:mb-0 cursor-pointer p-2 rounded-lg" onClick={() => OpenNewPage(project.href)}>
              <div className="flex justify-between items-center mb-2">
                <Typography className="font-bold hover:underline">
                  <a href={project.href} target="_blank" style={{ all: "unset" }}>
                    {project.name}
                  </a>
                </Typography>
                <a className="rounded-full" href={project.github} target="_blank" onClick={(e) => e.stopPropagation()}>
                  <GitHub className="text-[#808c9c] transition-colors hover:text-[#bfc7d2]" />
                </a>
              </div>
              <p style={{ fontSize: "14px", color: "#808c9c" }} className="mb-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => {
                  return (
                    <Tooltip key={index} title={tech} enterTouchDelay={1} disableInteractive>
                      <div className="cursor-pointer">{renderIcon(tech, index)}</div>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
