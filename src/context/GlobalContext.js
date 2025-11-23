"use client";
import { createContext, useRef, useState, useEffect } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [time, setTime] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  // Update time : HH:MM:SS AM/PM
  const updateTime = () => {
    setTime(
      new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      })
    );
  };

  // Initialize time on client side only to prevent hydration mismatch
  useEffect(() => {
    updateTime();
  }, []);

  const toggleModalButtonRef = useRef(null);
  const chatInputRef = useRef(null);

  const values = {
    time,
    updateTime,
    isChatOpen,
    setIsChatOpen,
    toggleModalButtonRef,
    chatInputRef,
  };

  return <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>;
}
