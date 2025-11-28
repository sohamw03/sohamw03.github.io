"use client";
import { createContext, useContext, useState } from "react";

const VimContext = createContext();

export function VimProvider({ children }) {
  const [mode, setMode] = useState("NORMAL"); // NORMAL, COMMAND, INSERT
  const [command, setCommand] = useState("");
  const [message, setMessage] = useState(""); // For feedback messages (like "Pattern not found")
  const [vimEnabled, setVimEnabled] = useState(false);
  const [showKeybinds, setShowKeybinds] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMatches, setSearchMatches] = useState([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);

  const updateMode = (newMode) => setMode(newMode);
  const updateCommand = (newCommand) => setCommand(newCommand);
  const showMessage = (msg, duration = 3000) => {
    setMessage(msg);
    if (duration) {
      setTimeout(() => setMessage(""), duration);
    }
  };
  const toggleVim = () => {
    setVimEnabled((prev) => {
        const newState = !prev;
        if (newState) setShowKeybinds(true); // Show keybinds when enabling
        return newState;
    });
  };
  const toggleKeybinds = () => setShowKeybinds((prev) => !prev);

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
        showKeybinds,
        toggleKeybinds,
        searchQuery,
        setSearchQuery,
        searchMatches,
        setSearchMatches,
        currentMatchIndex,
        setCurrentMatchIndex,
      }}
    >
      {children}
    </VimContext.Provider>
  );
}

export function useVim() {
  return useContext(VimContext);
}
