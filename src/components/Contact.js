"use client";
import styles from "@/app/page.module.css";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { useEffect, useRef, useState } from "react";

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);
  const [contactOffset, setContactOffset] = useState("3.3rem");

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
    contactRef.current.style.setProperty("--border-anim-opacity", "0");
    contactRef.current.style.setProperty("--border-offset", "-1px");
    contactHeadBtnRef.current.style.setProperty("--border-color", "#2e3c51");
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
    contactRef.current.style.setProperty("--border-anim-opacity", "0");
    contactRef.current.style.setProperty("--border-offset", "0px");
    contactHeadBtnRef.current.style.setProperty("--border-color", "#2e3c51");
  };

  useEffect(() => {
    const handleMouseOver = (e) => {
      e.stopPropagation();
      if (!isOpen) {
        setContactOffset("3.8rem");
        containerRef.current.style.setProperty("--before-opacity", "1");
        contactRef.current.style.setProperty("--animation-playpause", "running");
        terminalRef.current.style.setProperty("--border-x-position", "100%");
        contactRef.current.style.setProperty("--border-anim-opacity", "1");
        contactHeadBtnRef.current.style.setProperty("--border-color", "#2e3c5100");
      }
    };

    const handleMouseOut = (e) => {
      e.stopPropagation();
      if (!isOpen) {
        setContactOffset("3.3rem");
        containerRef.current.style.setProperty("--before-opacity", "0.5");
        contactRef.current.style.setProperty("--animation-playpause", "paused");
        terminalRef.current.style.setProperty("--border-x-position", "0%");
        contactRef.current.style.setProperty("--border-anim-opacity", "0");
        contactHeadBtnRef.current.style.setProperty("--border-color", "#2e3c51");
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
      <section className={styles.contact} ref={contactRef} style={{ transform: isOpen ? "none" : `translateY(calc(100% - ${contactOffset}))` }}>
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
              <form className={`${styles.contact_body} p-6 flex items-center flex-wrap justify-stretch gap-x-6 gap-y-4`}>
                <p>I will try to get back to you at the earliest. Enter your details to contact me.</p>
                <div className="flex flex-col justify-start">
                  <div className={`${styles.form_control_wrapper} flex items-end gap-2`}>
                    <label htmlFor="request-name">Name</label>
                    <span className="text-[#333e4f]">
                      ......
                      <span className="max-md:hidden">.......</span>
                    </span>
                    <input id="request-name" type="text" name="name" spellCheck="false" autoComplete="name" autoCapitalize="words" maxLength="128" required="" className={`${styles.form_control} flex-1 py-2 -mb-1`} placeholder="{Enter}" />
                  </div>
                  <div className={`${styles.form_control_wrapper} flex items-end gap-2`}>
                    <label htmlFor="request-email">Email</label>
                    <span className="text-[#333e4f]">
                      .....
                      <span className="max-md:hidden">.......</span>
                    </span>
                    <input id="request-email" type="email" name="email" required="" maxLength="128" autoComplete="email" className={`${styles.form_control} flex-1 py-2 -mb-1`} placeholder="{Enter}" />
                  </div>
                  <div className={`${styles.form_control_wrapper} flex items-end gap-2`}>
                    <label htmlFor="request-email">Message</label>
                    <span className="text-[#333e4f]">
                      ...
                      <span className="max-md:hidden">.......</span>
                    </span>
                    <input id="request-msg" type="text" name="msg" maxLength="128" className={`${styles.form_control} flex-1 py-2 -mb-1`} placeholder="{Enter}" />
                  </div>
                </div>
                <button type="submit" title="Submit" className={`${styles.button_primary} ${styles.button} flex-shrink opacity-1 -translate-x-1 pointer-events-auto hover:bg-white`}>
                  Send
                </button>
              </form>
            </div>
          </section>
        </ClickAwayListener>
      </section>
      <button className={styles.terminal_overlay} ref={terminal_overlayRef} aria-label="Close Private Preview form"></button>
    </>
  );
}
