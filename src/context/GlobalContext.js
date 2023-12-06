"use client";
import { createContext, useRef, useState } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [time, setTime] = useState(
    new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    })
  );

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

  const toggleModalButtonRef = useRef(null);

  const values = {
    time,
    updateTime,
    toggleModalButtonRef,
  };

  return <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>;
}
