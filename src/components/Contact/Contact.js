"use client";
import styles from "@/app/page.module.css";
import { GlobalContext } from "@/context/GlobalContext";
import { parseAnchorLinks } from "@/functions/utils";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { useContext, useEffect, useRef, useState } from "react";
import ContactDynamicArrowCross from "./ContactDynamicArrowCross";

export default function Contact() {
  // Global Context
  const { time, updateTime, toggleModalButtonRef, chatInputRef, isChatOpen, setIsChatOpen } = useContext(GlobalContext);
  const [contactOffset, setContactOffset] = useState("3.3rem");
  const [terminalAnimData, SetTerminalAnimData] = useState([]);
  // const [isOpen, setIsOpen] = useState(false); // Chat functionality states
  const isOpen = isChatOpen;
  const setIsOpen = setIsChatOpen;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const terminalAnimRef = useRef(null);
  // Auto-scroll function with smooth behavior
  const scrollToBottom = () => {
    if (terminalAnimRef.current) {
      terminalAnimRef.current.scrollTo({
        top: terminalAnimRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  // Auto-scroll when new messages arrive
  useEffect(() => {
    // Small delay to ensure DOM has updated before scrolling
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 10);

    return () => clearTimeout(timeoutId);
  }, [terminalAnimData, isLoading]);

  // Capture elements
  const contactRef = useRef(null);
  const terminalRef = useRef(null);
  const containerRef = useRef(null);
  const terminal_overlayRef = useRef(null);
  const contactHeadBtnRef = useRef(null);
  // const chatInputRef = useRef(null); // Run different functions based on the state of the modal
  const toggleModal = () => {
    // Reset chat input
    setInput("");

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
    contactHeadBtnRef.current.style.setProperty("--border-color", "#2e3c51"); // Reset terminal animation data
    SetTerminalAnimData(() => []);

    setIsOpen((prev) => true);

    // Add welcome message to terminal after a brief delay
    setTimeout(() => {
      updateTime();
      SetTerminalAnimData((prevData) => [
        ...prevData,
        {
          time: time,
          text: "> Hi! I'm Soham's AI assistant. Ask me about his work, or say 'send a message to Soham' to contact him directly!",
        },
      ]);

      // Focus the chat input
      if (chatInputRef.current) {
        chatInputRef.current.focus();
      }
    }, 100);
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

    setIsOpen((prev) => false);
  };

  // Submit form and run animation
  const logAnim = (text) => {
    updateTime();
    SetTerminalAnimData((prevData) => [...prevData, { time: time, text: text }]);
  };

  // Typing indicator component
  const TypingIndicator = () => {
    const [dots, setDots] = useState("");

    useEffect(() => {
      const interval = setInterval(() => {
        setDots((prev) => {
          if (prev === "...") return ".";
          return prev + ".";
        });
      }, 500);

      return () => clearInterval(interval);
    }, []);
    return (
      <p style={{ whiteSpace: "pre-wrap", fontSize: "0.95rem" }}>
        <span className="text-[#5d6a7d] pointer-events-none select-none">[{time || "--:--:-- --"}]&nbsp;</span>
        <span className="text-[#a87ffb]">&gt; {dots}</span>
      </p>
    );
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Log user message in terminal style immediately
    updateTime();
    SetTerminalAnimData((prevData) => [...prevData, { time: time, text: `$ ${input}` }]);

    const userInput = input;
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userInput }],
        }),
      });

      if (!response.ok) {
        const data = await response.json(); // Parse JSON response on error
        throw new Error(data.response || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const assistantResponse = data.response;

      // Add assistant's message to terminal
      updateTime();
      SetTerminalAnimData((prevData) => [...prevData, { time: time, text: "> " + assistantResponse }]);

      // Update messages state for context
      setMessages((prev) => [...prev, { role: "user", content: userInput }, { role: "assistant", content: assistantResponse }]);
    } catch (error) {
      console.error("Error in chat:", error);
      updateTime();
      SetTerminalAnimData((prevData) => [
        ...prevData,
        {
          time: time,
          text: (
            <>
              <span className="text-[#ff6b6b]">Error:</span> {error.message}
            </>
          ),
        },
      ]);
    } finally {
      setIsLoading(false);
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
              <div className={styles.bg}></div> {/* Head button */}
              <button className={styles.contact_head_btn} ref={contactHeadBtnRef} onClick={toggleModal}>
                <h2>Chat with AI</h2>
                <span>Spaces: 2</span>
                <span>UTF-8</span>
                <ContactDynamicArrowCross isCross={isOpen} />{" "}
              </button>{" "}
              {/* Terminal animation body*/}{" "}
              <div
                className={`${styles.contact_body} ${styles.terminal_anim_text} p-4`}
                style={{
                  borderTopWidth: "1px",
                  maxHeight: "300px",
                  overflowY: "auto",
                  scrollBehavior: "smooth",
                }}
                ref={terminalAnimRef}>
                {terminalAnimData.map((frame, index) => {
                  return (
                    <p key={index} style={{ whiteSpace: "pre-wrap", fontSize: "0.95rem" }}>
                      <span className="text-[#5d6a7d] pointer-events-none select-none">[{frame.time}]&nbsp;</span>
                      {typeof frame.text === "string" ? <span dangerouslySetInnerHTML={{ __html: parseAnchorLinks(frame.text) }}></span> : <span>{frame.text}</span>}
                    </p>
                  );
                })}
                {isLoading && <TypingIndicator />} {/* Inline terminal input */}
                <div className="flex items-center">
                  <span className="text-[#5d6a7d] pointer-events-none select-none">[{time || "--:--:-- --"}]&nbsp;</span>
                  <span className="text-[#a87ffb]">$&nbsp;</span>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    ref={chatInputRef}
                    className="flex-1 bg-transparent border-none outline-none text-white font-mono"
                    placeholder="Type your message..."
                    style={{ fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace" }}
                  />
                </div>
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
