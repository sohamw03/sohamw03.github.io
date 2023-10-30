import { Avatar, Typography } from "@mui/material";
import styles from "./page.module.css";

const ProjectsData = [
  {
    name: "Blogging Website",
    description: "Featuring articles related to Programming and Technology",
    imageSrc: "/blog_website.png",
    href: "https://i-coder-henna.vercel.app/",
  },
  {
    name: "Text Utility Website",
    description: "Simple and easy-to-use text tools with a minimalistic design",
    imageSrc: "/text_utility_website.png",
    href: "https://react-textutils-five.vercel.app/",
  },
  {
    name: "E-Commerce",
    description: "This is a project about...",
    imageSrc: "/e-commerce.jpg",
    href: "",
  },
  {
    name: "E-Commerce",
    description: "This is a project about...",
    imageSrc: "/e-commerce.jpg",
    href: "",
  },
];

const SkillBuckets = [
  {
    name: "Frontend",
    skills: "HTML CSS Javascript React.JS Next.JS",
  },
  {
    name: "Backend",
    skills: "Django Node.JS Express.JS",
  },
  {
    name: "Databases",
    skills: "MySQL MongoDB PostgreSQL",
  },
  {
    name: "DevOps",
    skills: "AWS GCP Terraform Docker Git Linux",
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.about}>
        <Avatar alt="Soham Waghmare" src="PathToImage" sx={{ width: 128, height: 128, marginBottom: "1rem" }} />
        <Typography variant="h4" gutterBottom>
          👋 I'm Soham
        </Typography>
        <Typography variant="h6" gutterBottom className={styles.aboutdesc}>
          A full-stack developer with a passion for crafting dynamic web solutions. Explore my projects and skills to see how I can bring your web development ideas to life.
        </Typography>
        <hr className={styles.divider} style={{ width: "3rem" }} />
        <Typography variant="h6" gutterBottom className={styles.aboutdesc}>
          Welcome to my Tech Odyssey
        </Typography>
      </div>
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>
      <div className={styles.projects}>
        {ProjectsData.map((project, index) => {
          return (
            <div key={index} className={styles.card} style={{ cursor: "pointer" }}>
              <a href={project.href} target="_blank" className={styles.cardlink}></a>
              <img src={project.imageSrc} alt={`${project.name}`} style={{ borderRadius: "7.5px" }} />
              <Typography variant="h6" gutterBottom>
                {project.name}
              </Typography>
              <p style={{ fontSize: "14px", color: "#808c9c" }}>{project.description}</p>
            </div>
          );
        })}
      </div>
      <Typography variant="h4" gutterBottom>
        Tech Stack
      </Typography>
      <div className={styles.skills}>
        {SkillBuckets.map((bucket, index) => {
          return (
            <div key={index} className={styles.card}>
              <Typography variant="h6" gutterBottom>
                {bucket.name}
              </Typography>
              <p style={{ fontSize: "14px", color: "#808c9c", display: "flex", gap: "6px" }}>
                {bucket.skills.split(" ").map((skillchip, jndex) => {
                  return (
                    <span key={`${index}${jndex}`} className={styles.skillchip}>
                      {skillchip}
                    </span>
                  );
                })}
              </p>
            </div>
          );
        })}
      </div>
      <div className={styles.contact}>
        <Typography variant="h4" gutterBottom>
          Contact
        </Typography>
      </div>
    </main>
  );
}
