"use client";
import styles from "@/app/page.module.css";
import { GlobalContext } from "@/context/GlobalContext";
import email from "@/functions/Email";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { useContext, useEffect, useRef, useState } from "react";
import ContactDynamicArrowCross from "./ContactDynamicArrowCross";

export default function Contact() {
  // Global Context
  const { time, updateTime, toggleModalButtonRef } = useContext(GlobalContext);

  const [AnimContainerOpen, setAnimContainerOpen] = useState(false);
  const [contactOffset, setContactOffset] = useState("3.3rem");
  const [terminalAnimData, SetTerminalAnimData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Capture elements
  const contactRef = useRef(null);
  const terminalRef = useRef(null);
  const containerRef = useRef(null);
  const terminal_overlayRef = useRef(null);
  const contactHeadBtnRef = useRef(null);
  const formRef = useRef(null);

  // Run different functions based on the state of the modal
  const toggleModal = () => {
    setAnimContainerOpen(false);

    // Reset form
    formRef.current.reset();

    if (isOpen) {
      closeModal();
    } else {
      openModal();
    }
  };

  const openModal = () => {
    // Gradient opacity of :before of the terminal
    containerRef.current.style.setProperty("--before-opacity", "0");

    // Border pulse animation and background
    contactRef.current.style.setProperty("--animation-playpause", "paused");
    terminalRef.current.style.setProperty("--border-x-position", "0%");

    // Modal overlay appears
    terminal_overlayRef.current.style.setProperty("--tw-bg-opacity", "0.5");
    terminal_overlayRef.current.style.setProperty("pointer-events", "auto");

    // Handle borders
    // contactRef.current.style.setProperty("--border-anim-opacity", "0");
    contactRef.current.style.setProperty("--border-offset", "0px");
    contactHeadBtnRef.current.style.setProperty("--border-color", "#2e3c51");

    // Reset terminal animation data
    SetTerminalAnimData(() => []);

    setIsOpen((prev) => true);
  };

  const closeModal = () => {
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

    // Reset terminal animation data
    SetTerminalAnimData(() => []);

    setIsOpen((prev) => false);
  };

  // Submit form and run animation
  const logAnim = (text) => {
    updateTime();
    SetTerminalAnimData((prevData) => [...prevData, { time: time, text: text }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setAnimContainerOpen(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    e.target.reset();

    SetTerminalAnimData(() => []);
    logAnim("Sending message...");
    setTimeout(() => {
      logAnim("{");
      for (let key in data) {
        data[key] = data[key].trim();
        logAnim(
          <>
            "{key}": <span className="text-[#62a1d6]">"{data[key]}"</span>
          </>
        );
      }
      logAnim("}");
    }, 1000);
    const mailResponse = await email(data);
    console.log(mailResponse);
    if (mailResponse) {
      setTimeout(() => {
        logAnim(
          <>
            🎉 <span className="text-[#17b877]">Success!</span> Your message has been sent. Stay tuned for my mail.
          </>
        );
      }, 2000);
    } else {
      console.log("Failed to send mail");
    }
  };

  // Event listeners
  useEffect(() => {
    const handleMouseOver = (e) => {
      e.stopPropagation();
      if (!isOpen) {
        setTimeout(() => {
          setContactOffset("3.8rem");
        }, 300);
        containerRef.current.style.setProperty("--before-opacity", "1");
        contactRef.current.style.setProperty("--animation-playpause", "running");
        terminalRef.current.style.setProperty("--border-x-position", "100%");
        contactRef.current.style.setProperty("--border-anim-opacity", "1");
        contactHeadBtnRef.current.style.setProperty("--border-color", "#2e3c51");
      }
    };

    const handleMouseOut = (e) => {
      e.stopPropagation();
      if (!isOpen) {
        setTimeout(() => {
          setContactOffset("3.3rem");
        }, 300);
        containerRef.current.style.setProperty("--before-opacity", "0.5");
        contactRef.current.style.setProperty("--animation-playpause", "paused");
        terminalRef.current.style.setProperty("--border-x-position", "0%");
        contactRef.current.style.setProperty("--border-anim-opacity", "1");
        contactHeadBtnRef.current.style.setProperty("--border-color", "#2e3c51");
      }
    };

    if (!isOpen) {
      terminalRef.current.addEventListener("mouseover", handleMouseOver);
      terminalRef.current.addEventListener("mouseout", handleMouseOut);
    }

    return () => {
      if (terminalRef.current) {
        terminalRef.current.removeEventListener("mouseover", handleMouseOver);
        terminalRef.current.removeEventListener("mouseout", handleMouseOut);
      }
    };
  }, [isOpen]);
  return (
    <>
      <section className={styles.contact} ref={contactRef} style={{ transform: isOpen ? "none" : `translateY(calc(100% - ${contactOffset}))` }}>
        <ClickAwayListener mouseEvent={isOpen ? "onClick" : false} touchEvent={isOpen ? "onTouchStart" : false} onClickAway={closeModal}>
          <section className={styles.terminal} ref={terminalRef}>
            <div className={styles.container} ref={containerRef}>
              <div className={styles.bg}></div>
              {/* Head button */}
              <button className={styles.contact_head_btn} ref={contactHeadBtnRef} onClick={toggleModal}>
                <h2>Contact me</h2>
                <span>Spaces: 2</span>
                <span>UTF-8</span>
                <ContactDynamicArrowCross isCross={isOpen} />
              </button>
              {/* Form body*/}
              <form className={`${styles.contact_body} p-6 flex items-center flex-wrap justify-stretch gap-x-6 gap-y-4`} onSubmit={handleSubmit} ref={formRef}>
                <p>I will try to get back to you at the earliest. Enter your details to contact me.</p>
                <div className="flex flex-col justify-start">
                  <div className={`${styles.form_control_wrapper} flex items-end gap-2`}>
                    <label htmlFor="request-name">Name</label>
                    <span className="text-[#333e4f]">
                      ......
                      <span className="max-md:hidden">.......</span>
                    </span>
                    <input id="request-name" type="text" name="name" spellCheck="false" autoComplete="name" autoCapitalize="words" maxLength="128" required className={`${styles.form_control} flex-1 py-2 -mb-1`} placeholder="{Enter}" />
                  </div>
                  <div className={`${styles.form_control_wrapper} flex items-end gap-2`}>
                    <label htmlFor="request-email">Email</label>
                    <span className="text-[#333e4f]">
                      .....
                      <span className="max-md:hidden">.......</span>
                    </span>
                    <input id="request-email" type="email" name="email" required maxLength="128" autoComplete="email" className={`${styles.form_control} flex-1 py-2 -mb-1`} placeholder="{Enter}" />
                  </div>
                  <div className={`${styles.form_control_wrapper} flex items-end gap-2`}>
                    <label htmlFor="request-msg">Message</label>
                    <span className="text-[#333e4f]">
                      ...
                      <span className="max-md:hidden">.......</span>
                    </span>
                    <input id="request-msg" type="text" name="message" maxLength="128" className={`${styles.form_control} flex-1 py-2 -mb-1`} placeholder="{Enter}" required />
                  </div>
                </div>
                <button type="submit" title="Send" className={`${styles.button_primary} ${styles.button} flex-shrink opacity-1 -translate-x-1 pointer-events-auto hover:bg-white`}>
                  Send
                </button>
              </form>
              {/* Terminal animation body*/}
              <div className={`${styles.contact_body} ${styles.terminal_anim_text} ${AnimContainerOpen ? "p-6" : ""}`} style={{ borderTopWidth: AnimContainerOpen ? "1px" : "0px" }}>
                {terminalAnimData.map((frame, index) => {
                  return (
                    <p key={index}>
                      <span className="text-[#5d6a7d] pointer-events-none select-none">[{frame.time}]&nbsp;</span>
                      <span>{frame.text}</span>
                    </p>
                  );
                })}
              </div>
            </div>
          </section>
        </ClickAwayListener>
      </section>
      <button className={styles.terminal_overlay} ref={terminal_overlayRef} aria-label="Close Private Preview form"></button>
      <button onClick={toggleModal} ref={toggleModalButtonRef} className="fixed top-0 pointer-events-none hidden"></button>
    </>
  );
}
