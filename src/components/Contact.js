"use client";
import styles from "@/app/page.module.css";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);

  // Capture elements
  const contactRef = useRef(null);
  const terminalRef = useRef(null);
  const containerRef = useRef(null);
  const terminal_overlayRef = useRef(null);
  const contactHeadBtnRef = useRef(null);

  // Run different functions based on the state of the modal
  const toggleModal = () => {
    if (isOpen) {
      closeModal();
    } else {
      openModal();
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    // Gradient opacity of :before of the terminal
    containerRef.current.style.setProperty("--before-opacity", "0.5");

    // Border pulse animation and background
    contactRef.current.style.setProperty("--animation-playpause", "paused");
    terminalRef.current.style.setProperty("--border-x-position", "0%");

    // Modal overlay disappears
    terminal_overlayRef.current.style.setProperty("--tw-bg-opacity", "0");
    terminal_overlayRef.current.style.setProperty("pointer-events", "none");

    // Handle borders
    contactRef.current.style.setProperty("--gradient-inset", "0px");
    contactHeadBtnRef.current.style.setProperty("--contact_head_btn-border-size", "1px");
  };

  const openModal = () => {
    setIsOpen(true);
    // Gradient opacity of :before of the terminal
    containerRef.current.style.setProperty("--before-opacity", "0");

    // Border pulse animation and background
    contactRef.current.style.setProperty("--animation-playpause", "paused");
    terminalRef.current.style.setProperty("--border-x-position", "0%");

    // Modal overlay appears
    terminal_overlayRef.current.style.setProperty("--tw-bg-opacity", "0.5");
    terminal_overlayRef.current.style.setProperty("pointer-events", "auto");

    // Handle borders
    contactRef.current.style.setProperty("--gradient-inset", "0px");
    contactHeadBtnRef.current.style.setProperty("--contact_head_btn-border-size", "1px");
  };

  useEffect(() => {
    const handleMouseOver = (e) => {
      e.stopPropagation();
      if (!isOpen) {
        contactRef.current.style.setProperty("--offset", "3.8rem");
        containerRef.current.style.setProperty("--before-opacity", "1");
        contactRef.current.style.setProperty("--animation-playpause", "running");
        terminalRef.current.style.setProperty("--border-x-position", "100%");
        contactRef.current.style.setProperty("--gradient-inset", "-1px");
        contactHeadBtnRef.current.style.setProperty("--contact_head_btn-border-size", "0px");
      }
    };

    const handleMouseOut = (e) => {
      e.stopPropagation();
      if (!isOpen) {
        contactRef.current.style.setProperty("--offset", "3.4rem");
        containerRef.current.style.setProperty("--before-opacity", "0.5");
        contactRef.current.style.setProperty("--animation-playpause", "paused");
        terminalRef.current.style.setProperty("--border-x-position", "0%");
        contactRef.current.style.setProperty("--gradient-inset", "0px");
        contactHeadBtnRef.current.style.setProperty("--contact_head_btn-border-size", "1px");
      }
    };

    if (!isOpen) {
      terminalRef.current.addEventListener("mouseover", handleMouseOver);
      terminalRef.current.addEventListener("mouseout", handleMouseOut);
    }

    return () => {
      terminalRef.current.removeEventListener("mouseover", handleMouseOver);
      terminalRef.current.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isOpen]);
  return (
    <>
      <section className={styles.contact} ref={contactRef} style={{ "--offset": isOpen ? "20rem" : "3.4rem" }}>
        <ClickAwayListener onClickAway={closeModal}>
          <section className={styles.terminal} ref={terminalRef}>
            <div className={styles.container} ref={containerRef}>
              <div className={styles.bg}></div>
              <button className={styles.contact_head_btn} ref={contactHeadBtnRef} onClick={toggleModal}>
                <h2>Contact me</h2>
                <span>Spaces: 2</span>
                <span>UTF-8</span>
                <span>▼</span>
              </button>
            </div>
          </section>
        </ClickAwayListener>
      </section>
      <button className={styles.terminal_overlay} ref={terminal_overlayRef} aria-label="Close Private Preview form"></button>
    </>
  );
}
