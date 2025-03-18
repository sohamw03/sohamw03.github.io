import Achievements from "@/components/Achievements/Achievements";
import Contact from "@/components/Contact/Contact";
import Experience from "@/components/Experience/Experience";
import Navbar from "@/components/Navbar/Navbar";
import AboutContactButton from "@/components/Oneoffs/AboutContactButton";
import ProjectCard from "@/components/Projects/ProjectCard";
import ProjectOverflowCard from "@/components/Projects/ProjectOverflowCard";
import Skills from "@/components/Skills/Skills";
import SocialLinks from "@/components/SocialLinks";
import { AIProjectsData, WebProjectsData, WebProjectsOverflowData } from "@/data";
import Dark from "@/themes/Dark";
import Typography from "@mui/material/Typography";
import styles from "./page.module.css";

export default function Home() {
  if (Dark) {
    return (
      <div className={styles.home}>
        <Navbar />
        <Dark />
        <main className={`${styles.main} relative`}>
          {/* Action Buttons */}
          <nav className={`${styles.navBtns} flex flex-row items-center justify-end gap-3 absolute left-0 w-full mt-12 px-12`}>
            <AboutContactButton />
            {/* <a role="button" href="https://drive.google.com/file/d/1yepcoYtjcCt8m1tf__6P5H5-ydg2OzEv/view?usp=drivesdk" target="_blank" className={`${styles.button} ${styles.button_primary} hover:bg-white focus:bg-white active:bg-white`} style={{ WebkitTapHighlightColor: "transparent" }}>
              Resume
            </a> */}
          </nav>

          {/* About Section */}
          <section className={styles.about}>
            <img alt="Soham Waghmare" src="/images/soham-photo.png" className="w-[128px] h-[128px] mb-4 rounded-full pointer-events-none select-none" loading="lazy" />
            <Typography variant="h4" gutterBottom>
              Soham Waghmare
            </Typography>
            <Typography variant="h6" gutterBottom className={styles.aboutdesc}>
              GenerativeAI • Deep Learning • Cloud
            </Typography>
            <hr className={styles.divider} style={{ width: "3rem" }} />
            <SocialLinks />
          </section>

          {/* Projects Section */}
          <Typography variant="h4" gutterBottom>
            AI Projects
          </Typography>
          <section className={styles.projects}>
            {AIProjectsData.map((project, index) => {
              return <ProjectCard key={index} project={project} />;
            })}
          </section>

          {/* Skills Section */}
          <Typography variant="h4" gutterBottom>
            Tech Stack
          </Typography>
          <section className={styles.skills}>
            <Skills />
          </section>

          {/* Web Projects Section */}
          <Typography variant="h4" gutterBottom>
            Full-Stack Projects
          </Typography>
          <section className={styles.otherProjects}>
            {WebProjectsData.map((project, index) => {
              return <ProjectCard key={index} project={project} />;
            })}
            <ProjectOverflowCard projects={WebProjectsOverflowData} />
          </section>

          {/* Experience Section */}
          <Typography variant="h4" gutterBottom>
            Experience
          </Typography>
          <section className={styles.experience}>
            <Experience />
          </section>

          {/* Achievements Section */}
          <Typography variant="h4" gutterBottom>
            Achievements
          </Typography>
          <section className={styles.achievements}>
            <Achievements />
          </section>

          {/* Contact Section */}
          <Contact />
        </main>
      </div>
    );
  }
}
