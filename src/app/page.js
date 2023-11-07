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
    name: "NewsMonkey",
    description: "A simple and fast app that delivers the latest news from various sources in one place.",
    imageSrc: "/news_website.png",
    href: "https://github.com/sohamw03/newsapp",
  },
  {
    name: "MyAwesomeCart",
    description: "E-Commerce website selling electronics.",
    imageSrc: "/my_awesome_cart.png",
    href: "https://github.com/sohamw03/MyAwesomeCart",
  },
];

const SkillBuckets = [
  {
    name: "Frontend",
    skills: "HTML CSS Javascript React.JS Next.JS",
    highlight: ["React.JS", "Next.JS"],
  },
  {
    name: "Backend",
    skills: "Django Node.JS Express.JS",
    highlight: ["Django"],
  },
  {
    name: "Databases",
    skills: "MySQL MongoDB PostgreSQL",
    highlight: ["MongoDB"],
  },
  {
    name: "DevOps",
    skills: "AWS GCP Terraform Docker Git Linux",
    highlight: ["AWS", "GCP", "Git", "Linux"],
  },
];

export default function Home() {
  return (
    <>
      <div className={styles.redevelopment}>
        Redeveloping the website in NextJS. You can track the progress&nbsp;
        <a href="https://github.com/sohamw03" target="_blank" style={{ textDecoration: "underline" }}>
          here
        </a>
        .
      </div>
      <main className={styles.main}>
        {/* About Section */}
        <div className={styles.about}>
          <Avatar alt="Soham Waghmare" src="/Soham.png" sx={{ width: 128, height: 128, marginBottom: "1rem" }} />
          <Typography variant="h4" gutterBottom>
            Soham Waghmare
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
        {/* Projects Section */}
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
        {/* Skills Section */}
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
                      <span key={`${index}${jndex}`} className={`${styles.skillchip} ${bucket.highlight.includes(skillchip) ? styles.chiplit : ""}`}>
                        {skillchip}
                      </span>
                    );
                  })}
                </p>
              </div>
            );
          })}
        </div>
        {/* Contact Section */}
        <div className={styles.contact}>
          <Typography variant="h4" gutterBottom>
            Contact
          </Typography>
        </div>
      </main>
    </>
  );
}
