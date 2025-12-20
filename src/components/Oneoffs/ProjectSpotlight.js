"use client";
import { Typography } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export default function ProjectSpotlight({ project }) {
  if (!project) return null;

  return (
    <a
      href={project.href}
      target="_blank"
      className="mt-8 flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300 no-underline group relative z-10"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
      <Typography variant="caption" className="text-[#808c9c] font-mono tracking-wider group-hover:text-[#bfc7d2] transition-colors">
        building {project.name.toLowerCase()}
      </Typography>
      <ArrowOutwardIcon sx={{ fontSize: 10, color: "#808c9c" }} className="group-hover:text-[#bfc7d2] transition-colors" />
    </a>
  );
}
