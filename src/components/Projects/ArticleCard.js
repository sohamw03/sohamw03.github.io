"use client";
import styles from "@/app/page.module.css";
import { OpenNewPage } from "@/functions/utils";
import { useRef } from "react";

export default function ArticleCard(props) {
  const { project, sx } = props;
  const imgRef = useRef(null);

  return (
    <>
      {project.name !== "" ? (
        <div className={`${styles.card} ${sx} cursor-pointer`}>
          <div className="relative" onClick={() => OpenNewPage(project.href)}>
            <div className="overflow-hidden rounded-[7.5px]">
              {project.mediaSrcs && project.mediaSrcs.length > 0 && (() => {
                const mediaSrc = project.mediaSrcs[0];
                return <img className="w-full object-cover overflow-hidden rounded-[7.5px]" src={mediaSrc} alt={`${project.name}`} ref={imgRef} loading="lazy" />;
              })()}
            </div>
          </div>
          <p style={{ fontSize: "16px", color: "#c2c8d0", fontWeight:"500", cursor: "pointer" }} className="hover:underline mt-2 sm:mt-3">
            <a href={project.href} target="_blank" style={{ all: "unset" }}>
              {project.name}
            </a>
          </p>
        </div>
      ) : (
        <div className={styles.card} style={{ border: "none" }}></div>
      )}
    </>
  );
}
