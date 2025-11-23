"use client";
import { createContext, useContext, useState } from "react";

const VimContext = createContext();

export function VimProvider({ children }) {
  const [mode, setMode] = useState("NORMAL"); // NORMAL, COMMAND, INSERT
  const [command, setCommand] = useState("");
  const [message, setMessage] = useState(""); // For feedback messages (like "Pattern not found")
  const [vimEnabled, setVimEnabled] = useState(false);

  const updateMode = (newMode) => setMode(newMode);
  const updateCommand = (newCommand) => setCommand(newCommand);
  const showMessage = (msg, duration = 3000) => {
    setMessage(msg);
    if (duration) {
      setTimeout(() => setMessage(""), duration);
    }
  };
  const toggleVim = () => setVimEnabled((prev) => !prev);

  return (
    <VimContext.Provider
      value={{
        mode,
        updateMode,
        command,
        updateCommand,
        message,
        showMessage,
        vimEnabled,
        toggleVim,
      }}
    >
      {children}
    </VimContext.Provider>
  );
}

export function useVim() {
  return useContext(VimContext);
}
