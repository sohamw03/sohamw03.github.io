"use client";
import styles from "@/app/page.module.css";
import { OpenNewPage, renderIcon } from "@/functions/utils";
import { default as GitHub } from "@mui/icons-material/GitHub";
import { Tooltip, Typography } from "@mui/material";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useRef, useState } from "react";
import { DotButton, useDotButton } from "../EmblaCarousel/EmblaCarouselDotButton";

export default function ProjectCard(props) {
  const { project, sx } = props;
  const imgRef = useRef(null);
  const vidRef = useRef(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", duration: 10, dragThreshold: 1 }, project.mediaSrcs.length > 1 ? [Autoplay({ delay: 6000 })] : []);
  const [grabCursor, setGrabCursor] = useState("cursor-grab");

  // Embla Carousel
  const onButtonClick = useCallback((emblaApi) => {
    const { autoplay } = emblaApi.plugins();
    if (!autoplay) return;
    if (autoplay.options.stopOnInteraction !== false) autoplay.stop();
  }, []);

  // Play or Pause Video when slide changes
  const playOrPause = useCallback((emblaApi) => {
    const selectedIndex = emblaApi.selectedScrollSnap();
    const element = emblaApi.slideNodes()[selectedIndex];
    if (element.tagName === "VIDEO") {
      if (element.paused) {
        // console.log("Playing Video");
        element.play();
      }
    } else {
      emblaApi.slideNodes().forEach((node) => {
        if (node.tagName === "VIDEO" && !node.paused) {
          // console.log("Pausing Video");
          node.pause();
        }
      });
    }
  }, []);
  emblaApi?.on("select", playOrPause);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi, onButtonClick);

  return (
    <>
      {project.name !== "" ? (
        <div className={`${styles.card} ${sx}`}>
          <div className={`relative ${grabCursor}`} onMouseDown={() => setGrabCursor("cursor-grabbing")} onMouseUp={() => setGrabCursor("cursor-grab")} onClick={() => OpenNewPage(project.href)}>
            <div className="overflow-hidden rounded-[7.5px]" ref={emblaRef}>
              <div className="flex">
                {project.mediaSrcs.map((mediaSrc, index) => {
                  if (mediaSrc.startsWith("v_")) {
                    // regex extracts folder name and file extension
                    // If the media is a video
                    return <video key={index} src={mediaSrc.slice(2)} className="min-w-0 relative w-full object-cover overflow-hidden" alt={`${project.name}`} style={{ borderRadius: "7.5px", flex: "0 0 100%" }} ref={vidRef} loop muted playsInline></video>;
                  } else {
                    return <img key={index} className="min-w-0 relative w-full object-cover overflow-hidden" src={mediaSrc} alt={`${project.name}`} style={{ borderRadius: "7.5px", flex: "0 0 100%" }} ref={imgRef} loading="lazy" />;
                  }
                })}
              </div>
            </div>
          </div>
          <div className={styles.embla__dots}>
            {scrollSnaps.map((_, index) => (
              <DotButton //
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={`${styles.embla__dot} ${index === selectedIndex ? styles["embla__dot--selected"] : ""}`}
              />
            ))}
          </div>
          <div className="flex justify-between items-center mt-4 ms-2 me-2">
            <div className={`flex flex-row gap-2 justify-start items-center`}>
              {project.techStack.map((tech, index) => {
                return (
                  <Tooltip key={index} title={tech} enterTouchDelay={1} disableInteractive>
                    <div className="cursor-pointer">{renderIcon(tech, index)}</div>
                  </Tooltip>
                );
              })}
            </div>
            <a className="rounded-full" href={project.github} target="_blank">
              <GitHub className="text-[#808c9c] transition-colors hover:text-[#bfc7d2] cursor-pointer" />
            </a>
          </div>
          <p style={{ fontSize: "16px", color: "#808c9c", fontWeight: "bold" }}>{project.lang.join(" • ")}</p>
          <Typography variant="h6" sx={{ cursor: "pointer" }} gutterBottom className="hover:underline">
            <a href={project.href} target="_blank" style={{ all: "unset" }}>
              {project.name}
            </a>
          </Typography>
          <p style={{ fontSize: "14px", color: "#808c9c" }}>{project.description}</p>
        </div>
      ) : (
        <div className={styles.card} style={{ border: "none" }}></div>
      )}
    </>
  );
}
