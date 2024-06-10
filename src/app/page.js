import Contact from "@/components/Contact/Contact";
import Experience from "@/components/Experience/Experience";
import Navbar from "@/components/Navbar/Navbar";
import AboutContactButton from "@/components/Oneoffs/AboutContactButton";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import SocialLinks from "@/components/SocialLinks";
import Dark from "@/themes/Dark";
import Typography from "@mui/material/Typography";
import styles from "./page.module.css";

const ProjectsData = [
  {
    name: "GramLearn",
    description: "Master English effortlessly with GramLearn: Your conversational grammar coach, now with offline RAG-based LLM pipeline.",
    mediaSrcs: ["/images/gramlearn-1-opt.png", "/images/gramlearn-2-opt.png"],
    href: "https://gramlearn.vercel.app",
    techStack: ["Ollama", "Flask", "FAISS", "Langchain", "Next.JS", "Vercel", "Cloudflare"],
    github: "https://github.com/sohamw03/GramLearn",
    lang: ["Py", "Ts", "Js", "CSS"],
  },
  {
    name: "GeminiWear",
    description: "Experience the epitome of fashion with an exclusive E-Commerce store for a premium clothing brand.",
    mediaSrcs: ["/images/gemini-wear.webp"],
    href: "https://geminiwear.sohamw.tech",
    techStack: ["shadcnui", "Next.JS", "MongoDB", "Vercel", "Cloudflare"],
    github: "https://github.com/sohamw03/geminiwear",
    lang: ["Js", "Ts", "CSS"],
  },
  {
    name: "Codegemini",
    description: "Featuring articles related to Programming and Technology",
    mediaSrcs: ["/images/blog_website-opt.png"],
    href: "https://i-coder-henna.vercel.app/",
    techStack: ["Bootstrap", "Django", "PostgreSQL", "Vercel"],
    github: "https://github.com/sohamw03/Codegemini",
    lang: ["Py", "Js", "HTML", "CSS"],
  },
  {
    name: "Text Utility Website",
    description: "Simple and easy-to-use text tools with a minimalistic design",
    mediaSrcs: ["/images/text_utility_website-opt.png"],
    href: "https://react-textutils-five.vercel.app/",
    techStack: ["Bootstrap", "React.JS", "Vercel"],
    github: "https://github.com/sohamw03/ReactTextutils",
    lang: ["Js", "CSS"],
  },
];

const SkillBuckets = [
  {
    name: "Frontend",
    skills: "React.JS Next.JS Typescript TailwindCSS shadcn/ui MaterialUI JQuery Bootstrap HTML CSS Javascript",
    highlight: ["React.JS", "Next.JS", "Typescript"],
  },
  {
    name: "Backend",
    skills: "Django Flask Node.JS Express.JS Firebase",
    highlight: ["Django", "Node.JS", "Firebase"],
  },
  {
    name: "Databases",
    skills: "MySQL MongoDB PostgreSQL",
    highlight: ["MongoDB", "PostgreSQL"],
  },
  {
    name: "DevOps & Tools",
    skills: "AWS Azure GCP Terraform Docker Git Linux Bash Ansible Jenkins Vercel GithubPages Cloudflare NeoVim",
    highlight: ["AWS", "Azure", "GCP", "Git", "Linux", "Bash", "TravisCI", "Vercel", "GithubPages", "Cloudflare", "NeoVim"],
  },
];

const OtherProjectsData = [
  {
    name: "NewsMonkey",
    description: "A simple and fast app that delivers the latest news from various sources in one place.",
    mediaSrcs: ["/images/news_website-opt.png", "/videos/newsmonkey-opt.mp4"],
    href: "https://github.com/sohamw03/newsapp",
    techStack: ["Bootstrap", "React.JS", "NewsAPI", "Vercel"],
    github: "https://github.com/sohamw03/newsapp",
    lang: ["Js", "CSS"],
  },
  {
    name: "Calculator",
    description: "Minimalistic calculator built with React.JS",
    mediaSrcs: ["/images/calculator-opt.png"],
    href: "/calculator",
    techStack: ["React.JS", "GithubPages"],
    github: "https://github.com/sohamw03/sohamw03.github.io/tree/main/src/app/calculator",
    lang: ["Js", "CSS"],
  },
  {
    name: "noteGemini",
    description: "noteGemini - Your notes in the cloud",
    mediaSrcs: ["/images/note_gemini-opt.png"],
    href: "https://note-gemini.vercel.app/",
    techStack: ["Bootstrap", "React.JS", "Node.JS", "MongoDB", "Vercel"],
    github: "https://github.com/sohamw03/noteGemini",
    lang: ["Js", "Ts", "CSS"],
  },
  {
    name: "MyAwesomeCart",
    description: "E-Commerce website selling electronics.",
    mediaSrcs: ["/images/my_awesome_cart-opt.png"],
    href: "https://github.com/sohamw03/MyAwesomeCart",
    techStack: ["Bootstrap", "Django", "Vercel"],
    github: "https://github.com/sohamw03/MyAwesomeCart",
    lang: ["Py", "Js", "HTML", "CSS"],
  },
];

export default function Home() {
  if (Dark) {
    return (
      <div className={styles.home}>
        <Navbar />
        <Dark />
        <main className={`${styles.main} relative`}>
          {/* <div className={styles.redevelopment}>
            Redeveloping the website in NextJS. You can track the progress&nbsp;
            <a href="https://github.com/sohamw03/sohamw03.github.io" target="_blank" style={{ textDecoration: "underline" }}>
              here
            </a>
            .
          </div> */}
          {/* Action Buttons */}
          <nav className={`${styles.navBtns} flex flex-row items-center justify-end gap-3 absolute left-0 w-full mt-12 px-12`}>
            <AboutContactButton />
            <a role="button" href="https://drive.google.com/file/d/1yepcoYtjcCt8m1tf__6P5H5-ydg2OzEv/view?usp=drivesdk" target="_blank" className={`${styles.button} ${styles.button_primary} hover:bg-white focus:bg-white active:bg-white`} style={{ WebkitTapHighlightColor: "transparent" }}>
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
              An alchemist of code, weaving innovative solutions into the digital fabric. Explore my projects and expertise to uncover the unique blend of creativity and mastery that fuels my craft.
              <br />
              <abbr title="Retrieval Augmented Generation">RAG</abbr> • <abbr title="Large Language Models">LLM</abbr> • Chatbots • DevOps • Cloud • Fullstack
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
          <Typography variant="h4" gutterBottom>
            Experience
          </Typography>
          {/* Other Projects Section */}
          <section className={styles.experience}>
            <Experience />
          </section>
          {/* Contact Section */}
          <Contact />
        </main>
      </div>
    );
  }
}
