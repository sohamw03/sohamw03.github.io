"use client";
import styles from "@/app/page.module.css";
import { OpenNewPage } from "@/functions/utils";
import { Typography } from "@mui/material";

const achievements = [
  {
    name: "Completed all 4 milestones of Google Cloud Facilitator Program",
    desc: "781a159c-a1f5-49aa-9331-8c084cf1abc1",
    mediaSrcs: ["/images/GCSKB-opt.png"],
    href: "https://www.cloudskillsboost.google/public_profiles/781a159c-a1f5-49aa-9331-8c084cf1abc1",
    pan: true,
  },
  {
    name: "Secured Indian Copyright for the project 'GramLearn'",
    desc: "ROC : SW-18883/2024",
    mediaSrcs: ["/images/Copyright_Office_India_logo.png"],
    href: "https://copyright.gov.in/SearchRoc.aspx",
    pan: false,
  },
  {
    name: "",
    desc: "",
    mediaSrcs: ["", ""],
    href: "",
  },
  {
    name: "",
    desc: "",
    mediaSrcs: ["", ""],
    href: "",
  },
];

export default function Achievements() {
  return (
    <>
      {achievements.map((achievement, index) => {
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
