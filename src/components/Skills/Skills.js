import styles from "@/app/page.module.css";
import { SkillBuckets } from "@/data";
import { Typography } from "@mui/material";

export default function Skills() {
  return (
    <>
      {SkillBuckets.map((bucket, index) => {
        return (
          <div key={index} className={styles.card}>
            <Typography variant="h6" gutterBottom>
              {bucket.name}
            </Typography>
            <p style={{ fontSize: "14px", display: "flex", gap: "6px", flexFlow: "wrap" }}>
              {bucket.skills.split(" ").map((skillchip, jndex) => {
                return (
                  <span key={`${index}${jndex}`} className={`${styles.skillchip} ${bucket.highlight.includes(skillchip) ? styles.chiplit : ""}`}>
                    {skillchip}
                  </span>
                );
              })}
            </p>
          </div>
        );
      })}
    </>
  );
}
