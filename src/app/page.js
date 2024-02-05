import Contact from "@/components/Contact/Contact";
import Navbar from "@/components/Navbar/Navbar";
import AboutContactButton from "@/components/Oneoffs/AboutContactButton";
import ProjectCard from "@/components/ProjectCard";
import SocialLinks from "@/components/SocialLinks";
import Dark from "@/themes/Dark";
import Typography from "@mui/material/Typography";
import styles from "./page.module.css";

const ProjectsData = [
  {
    name: "Codegemini",
    description: "Featuring articles related to Programming and Technology",
    imageSrc: "/images/blog_website.png",
    href: "https://i-coder-henna.vercel.app/",
    gif: "",
    techStack: ["Bootstrap", "Django", "PostgreSQL", "Vercel"],
    github: "https://github.com/sohamw03/Codegemini",
  },
  {
    name: "Text Utility Website",
    description: "Simple and easy-to-use text tools with a minimalistic design",
    imageSrc: "/images/text_utility_website.png",
    href: "https://react-textutils-five.vercel.app/",
    gif: "",
    techStack: ["Bootstrap", "React.JS", "Vercel"],
    github: "https://github.com/sohamw03/ReactTextutils",
  },
  {
    name: "NewsMonkey",
    description: "A simple and fast app that delivers the latest news from various sources in one place.",
    imageSrc: "/images/news_website.png",
    href: "https://github.com/sohamw03/newsapp",
    gif: "/images/newsmonkey.webp",
    techStack: ["Bootstrap", "React.JS", "NewsAPI", "Vercel"],
    github: "https://github.com/sohamw03/newsapp",
  },
  {
    name: "MyAwesomeCart",
    description: "E-Commerce website selling electronics.",
    imageSrc: "/images/my_awesome_cart.png",
    href: "https://github.com/sohamw03/MyAwesomeCart",
    gif: "",
    techStack: ["Bootstrap", "Django", "Vercel"],
    github: "https://github.com/sohamw03/MyAwesomeCart",
  },
];

const SkillBuckets = [
  {
    name: "Frontend",
    skills: "React.JS Next.JS Typescript TailwindCSS shadcn/ui MaterialUI JQuery Bootstrap HTML CSS Javascript",
    highlight: ["React.JS", "Next.JS","Typescript"],
  },
  {
    name: "Backend",
    skills: "Django Node.JS Express.JS Firebase",
    highlight: ["Django", "Node.JS", "Firebase"],
  },
  {
    name: "Databases",
    skills: "MySQL MongoDB PostgreSQL",
    highlight: ["MongoDB", "PostgreSQL"],
  },
  {
    name: "DevOps",
    skills: "AWS GCP Terraform Docker Git Linux Ansible Jenkins Vercel GithubPages Cloudflare",
    highlight: ["AWS", "GCP", "Git", "Linux", "Vercel", "GithubPages", "Cloudflare"],
  },
];

const OtherProjectsData = [
  {
    name: "noteGemini",
    description: "noteGemini - Your notes in the cloud",
    imageSrc: "/images/note_gemini.png",
    href: "https://note-gemini.vercel.app/",
    gif: "",
    techStack: ["Bootstrap", "React.JS", "Node.JS", "MongoDB", "Vercel"],
    github: "https://github.com/sohamw03/noteGemini",
  },
  {
    name: "Calculator",
    description: "Minimalistic calculator built with React.JS",
    imageSrc: "/images/calculator.png",
    href: "/calculator",
    gif: "",
    techStack: ["React.JS", "GithubPages"],
    github: "https://github.com/sohamw03/sohamw03.github.io/tree/main/src/app/calculator",
  },
  {
    name: "",
    description: "",
    imageSrc: "",
    href: "",
    gif: "",
    techStack: [""],
    github: "",
  },
  {
    name: "",
    description: "",
    imageSrc: "",
    href: "",
    gif: "",
    techStack: [""],
    github: "",
  },
];

export default function Home() {
  if (Dark) {
    return (
      <div className={styles.home}>
        <Navbar />
        <Dark />
        <main className={`${styles.main} relative`}>
          <div className={styles.redevelopment}>
            Redeveloping the website in NextJS. You can track the progress&nbsp;
            <a href="https://github.com/sohamw03" target="_blank" style={{ textDecoration: "underline" }}>
              here
            </a>
            .
          </div>
          {/* Action Buttons */}
          <nav className={`${styles.navBtns} flex flex-row items-center justify-end gap-3 absolute left-0 w-full mt-12 px-12`}>
            <AboutContactButton />
            <a role="button" href="https://drive.google.com/file/d/16Z4h6CExEKCT9bU90iYz0kIGHLpcXlkQ/view?usp=sharing" target="_blank" className={`${styles.button} ${styles.button_primary} hover:bg-white focus:bg-white active:bg-white`} style={{ WebkitTapHighlightColor: "transparent" }}>
              Resume
            </a>
          </nav>
          {/* About Section */}
          <section className={styles.about}>
            <img alt="Soham Waghmare" src="/images/soham-photo.png" className="w-[128px] h-[128px] mb-4 rounded-full pointer-events-none select-none" loading="lazy" />
            <Typography variant="h4" gutterBottom>
              Soham Waghmare
            </Typography>
            <Typography variant="h6" gutterBottom className={styles.aboutdesc}>
              A full-stack developer with a passion for crafting dynamic web solutions. Explore my projects and skills to see how I can bring your web development ideas to life.
            </Typography>
            <hr className={styles.divider} style={{ width: "3rem" }} />
            <SocialLinks />
          </section>
          <Typography variant="h4" gutterBottom>
            Projects
          </Typography>
          {/* Projects Section */}
          <section className={styles.projects}>
            {ProjectsData.map((project, index) => {
              return <ProjectCard key={index} project={project} />;
            })}
          </section>
          <Typography variant="h4" gutterBottom>
            Tech Stack
          </Typography>
          {/* Skills Section */}
          <section className={styles.skills}>
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
          </section>
          <Typography variant="h4" gutterBottom>
            Other Projects
          </Typography>
          {/* Other Projects Section */}
          <section className={styles.otherProjects}>
            {OtherProjectsData.map((project, index) => {
              return <ProjectCard key={index} project={project} />;
            })}
          </section>
          {/* Contact Section */}
          <Contact />
        </main>
      </div>
    );
  }
}
