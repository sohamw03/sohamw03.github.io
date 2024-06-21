"use client";
import styles from "@/app/page.module.css";
import { AchievementsData } from "@/data";
import { OpenNewPage } from "@/functions/utils";
import { Typography } from "@mui/material";

export default function Achievements() {
  return (
    <>
      {AchievementsData.map((achievement, index) => {
        return achievement.name !== "" ? (
          <div key={index} className={`${styles.card}`}>
            <div className={`relative cursor-pointer`} onClick={() => OpenNewPage(achievement.href)}>
              <div className="overflow-hidden rounded-[7.5px]">
                <div className="flex">
                  {achievement.mediaSrcs.map((mediaSrc, indexm) => {
                    return (
                      <img //
                        key={indexm}
                        className={`min-w-0 relative w-full object-cover overflow-hidden object-top ${achievement.pan ? styles.vertical_pan : ""}`}
                        src={mediaSrc}
                        alt={`${achievement.name}`}
                        style={{ borderRadius: "7.5px", flex: "0 0 100%" }}
                        loading="lazy"
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <Typography variant="h6" sx={{ cursor: "pointer" }} gutterBottom className="hover:underline">
              <a href={achievement.href} target="_blank" style={{ all: "unset" }}>
                {achievement.name}
              </a>
            </Typography>
            <p style={{ fontSize: "14px", color: "#808c9c" }}>{achievement.desc}</p>
          </div>
        ) : (
          <div className={styles.card} style={{ border: "none" }}></div>
        );
      })}
    </>
  );
}
