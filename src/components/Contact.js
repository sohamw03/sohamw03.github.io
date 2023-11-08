"use client";
import styles from "@/app/page.module.css";
import { useEffect } from "react";
import $ from "jquery";

export default function Contact() {
  useEffect(() => {
    // Event handler for Contact
    let terminal = document.getElementsByClassName(`${styles.terminal}`)[0];
    let contact = document.getElementsByClassName(`${styles.contact}`)[0];
    let container = document.getElementsByClassName(`${styles.container}`)[0];

    terminal.addEventListener("mouseover", () => {
      contact.style.setProperty("--offset", "3.8rem");
      container.style.setProperty("--before-opacity", "1");
    });
    terminal.addEventListener("mouseout", () => {
      contact.style.setProperty("--offset", "3.4rem");
      container.style.setProperty("--before-opacity", "0.5");
    });
  }, []);
  return (
    <>
      <section className={styles.contact}>
        <section className={styles.terminal}>
          <div className={styles.container}>
            <div className={styles.bg}></div>
            <button className={styles.contact_head_btn}>
              <h2>Contact me</h2>
              <span>Spaces: 2</span>
              <span>UTF-8</span>
              <span>▼</span>
            </button>
          </div>
        </section>
      </section>
      <button className={styles.terminal_overlay} aria-label="Close Private Preview form"></button>
    </>
  );
}
