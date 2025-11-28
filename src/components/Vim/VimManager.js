"use client";
import { useEffect, useRef, useContext } from "react";
import { useVim } from "@/context/VimContext";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context/GlobalContext";

export default function VimManager() {
  const { 
    mode, updateMode, command, updateCommand, showMessage, vimEnabled, toggleVim, toggleKeybinds,
    searchQuery, setSearchQuery, searchMatches, setSearchMatches, currentMatchIndex, setCurrentMatchIndex
  } = useVim();
  const lastKey = useRef("");
  const router = useRouter();
  const { toggleModalButtonRef, chatInputRef, isChatOpen } = useContext(GlobalContext);

  // Scroll helper
  const getScrollContainer = () => document.getElementById("main-scroll-container") || window;

  const scrollBy = (y) => {
    getScrollContainer().scrollBy({ top: y, behavior: "smooth" });
  };

  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      showMessage(`Jumped to #${id}`);
    } else {
      showMessage(`Section #${id} not found`);
    }
  };

  const performSearch = (query) => {
    if (!query) return;
    
    // Clear previous highlights
    document.querySelectorAll(".vim-search-match").forEach(el => {
        el.classList.remove("vim-search-match");
        el.classList.remove("vim-search-current");
    });

    const matches = [];
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
            if (
                node.parentElement && 
                node.parentElement.offsetParent !== null && // Visible
                !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.parentElement.tagName) &&
                node.textContent.toLowerCase().includes(query.toLowerCase())
            ) {
                return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
        }
      },
      false
    );

    let node;
    while (node = walker.nextNode()) {
        matches.push(node.parentElement);
    }

    // Unique elements
    const uniqueMatches = [...new Set(matches)];

    setSearchMatches(uniqueMatches);
    setSearchQuery(query);
    
    if (uniqueMatches.length > 0) {
      setCurrentMatchIndex(0);
      highlightMatch(uniqueMatches[0], true);
      showMessage(`Found ${uniqueMatches.length} matches`);
    } else {
      setCurrentMatchIndex(-1);
      showMessage(`Pattern not found: ${query}`);
    }
  };

  const highlightMatch = (element, isCurrent = false) => {
      if (!element) return;
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      
      // Remove current class from all
      document.querySelectorAll(".vim-search-current").forEach(el => el.classList.remove("vim-search-current"));
      
      element.classList.add("vim-search-match");
      if (isCurrent) {
          element.classList.add("vim-search-current");
      }
  };

  const nextMatch = (direction = 1) => {
      if (searchMatches.length === 0) {
          showMessage("No search results");
          return;
      }

      let newIndex = currentMatchIndex + direction;
      if (newIndex >= searchMatches.length) newIndex = 0;
      if (newIndex < 0) newIndex = searchMatches.length - 1;

      setCurrentMatchIndex(newIndex);
      highlightMatch(searchMatches[newIndex], true);
      showMessage(`Match ${newIndex + 1}/${searchMatches.length}`);
  };

  const executeCommand = (cmd) => {
    const cleanCmd = cmd.substring(1).trim(); // Remove ':' or '/'
    
    if (cmd.startsWith("/")) {
        performSearch(cleanCmd);
        return;
    }

    const parts = cleanCmd.split(" ");
    const action = parts[0];
    const arg = parts[1];

    switch (action) {
      case "w":
        showMessage("Site saved! (Just kidding, thanks for visiting!)");
        break;
      case "q":
        showMessage("E37: No write since last change (add ! to override)");
        break;
      case "q!":
        showMessage("You can't quit the Odyssey!");
        break;
      case "wq":
        showMessage("Saved and... wait, where are you going?");
        break;
      case "wq!":
        toggleVim();
        break;
      case "h":
      case "help":
        showMessage("Commands: :w, :q, :go [about|ai|tech|web|exp|achievements], :chat");
        break;
      case "chat":
        if (toggleModalButtonRef && toggleModalButtonRef.current) {
            toggleModalButtonRef.current.click();
            showMessage("Opening AI Chat...");
        } else {
            showMessage("AI Chat not available");
        }
        break;
      case "top":
        getScrollContainer().scrollTo({ top: 0, behavior: "smooth" });
        break;
      case "bottom":
        const container = getScrollContainer();
        container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
        break;
      case "go":
        if (arg) {
          // Map common names to IDs
          const map = {
            about: "about",
            ai: "ai-projects",
            tech: "tech-stack",
            web: "full-stack-projects",
            exp: "experience",
            achievements: "achievements",
          };
          scrollToId(map[arg] || arg);
        } else {
          showMessage("Usage: :go [about|ai|tech|web|exp|achievements]");
        }
        break;
      default:
        showMessage(`Not an editor command: ${cleanCmd}`);
    }
  };

  useEffect(() => {
    if (!vimEnabled) return;

    const handleKeyDown = (e) => {
      // Ignore if focused on an input or textarea (unless it's our command bar, handled separately)
      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA" ||
        document.activeElement.isContentEditable
      ) {
        if (e.key === "Escape" || (e.ctrlKey && e.key === "[")) {
           document.activeElement.blur();
           if (mode === "INSERT") {
             updateMode("NORMAL");
             // Close the chat modal if it's open
             if (isChatOpen && toggleModalButtonRef.current) {
                toggleModalButtonRef.current.click();
             }
           }
        }
        return;
      }

      if (mode === "NORMAL") {
        // Handle Ctrl+[ as Escape in Normal mode too
        if (e.ctrlKey && e.key === "[") {
            // Clear any pending commands or states if needed
            return;
        }

        switch (e.key) {
          case "i":
            e.preventDefault();
            if (!isChatOpen) {
                toggleModalButtonRef.current?.click();
                // Wait for modal to open
                setTimeout(() => {
                     updateMode("INSERT");
                }, 200);
            } else {
                chatInputRef.current?.focus();
                updateMode("INSERT");
            }
            break;
          case "f":
            e.preventDefault();
            updateMode("HINTS");
            break;
          case "j":
            scrollBy(100);
            break;
          case "k":
            scrollBy(-100);
            break;
          case "d":
            if (e.ctrlKey) {
                e.preventDefault();
                scrollBy(window.innerHeight / 2);
            }
            break;
          case "u":
            if (e.ctrlKey) {
                e.preventDefault();
                scrollBy(-(window.innerHeight / 2));
            }
            break;
          case "G":
            const container = getScrollContainer();
            container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
            break;
          case "g":
            if (lastKey.current === "g") {
              getScrollContainer().scrollTo({ top: 0, behavior: "smooth" });
              lastKey.current = "";
            } else {
              lastKey.current = "g";
              // Reset lastKey if next key isn't g within a short time
              setTimeout(() => { lastKey.current = "" }, 1000);
            }
            break;
          case ":":
            e.preventDefault();
            updateMode("COMMAND");
            updateCommand(":");
            break;
          case "/":
             e.preventDefault();
             updateMode("COMMAND");
             updateCommand("/");
             break;
          case "n":
             e.preventDefault();
             nextMatch(1);
             break;
          case "N":
             e.preventDefault();
             nextMatch(-1);
             break;
          case "?":
            e.preventDefault();
            toggleKeybinds();
            break;
          default:
            break;
        }
      } else if (mode === "COMMAND") {
        e.preventDefault(); // Trap focus/prevent default actions like scrolling on space
        if (e.key === "Escape") {
          updateMode("NORMAL");
          updateCommand("");
          showMessage("");
        } else if (e.key === "Tab") {
          e.preventDefault();
          if (command.startsWith("/")) return; // No autocomplete for search

          const currentInput = command.substring(1); // remove ':'
          const parts = currentInput.split(" ");

          if (parts.length === 1) {
            // Complete command
            const cmds = ["w", "q", "q!", "wq", "h", "help", "chat", "top", "bottom", "go"];
            const match = cmds.find(c => c.startsWith(parts[0]));
            if (match) {
                updateCommand(":" + match + (match === "go" ? " " : ""));
            }
          } else if (parts.length === 2 && parts[0] === "go") {
            // Complete argument for 'go'
            const args = ["about", "ai", "tech", "web", "exp", "achievements"];
            const match = args.find(a => a.startsWith(parts[1]));
            if (match) {
                updateCommand(":go " + match);
            }
          }
        } else if (e.key === "Enter") {
          executeCommand(command);
          updateMode("NORMAL");
          updateCommand("");
        } else if (e.key === "Backspace") {
          updateCommand((prev) => {
            if (prev.length <= 1) {
              updateMode("NORMAL");
              return "";
            }
            return prev.slice(0, -1);
          });
        } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          updateCommand((prev) => prev + e.key);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, command, updateMode, updateCommand, showMessage, vimEnabled]);

  return null; // Logic only
}
