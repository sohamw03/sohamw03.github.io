"use client";
import { useVim } from "@/context/VimContext";
import { useEffect, useState, useRef } from "react";

export default function VimStatusBar() {
  const { mode, command, message, vimEnabled } = useVim();
  const [cursorVisible, setCursorVisible] = useState(true);
  const statusBarRef = useRef(null);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Update CSS variable for height
  useEffect(() => {
    const updateHeight = () => {
      if (statusBarRef.current) {
        const height = statusBarRef.current.offsetHeight;
        document.documentElement.style.setProperty("--vim-height", `${height}px`);
      } else {
        document.documentElement.style.setProperty("--vim-height", "0px");
      }
    };

    updateHeight();
    // Update on resize as well
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
      document.documentElement.style.setProperty("--vim-height", "0px");
    };
  }, [vimEnabled, mode, command, message]);

  if (!vimEnabled) return null;

  return (
    <div ref={statusBarRef} className="fixed bottom-0 left-0 w-full z-[110] font-mono text-sm select-none pointer-events-none">
      {/* Message Area (Toast) */}
      {message && mode === "NORMAL" && (
        <div className="bg-[#161e29] text-[#bfc7d2] px-2 py-1 border-t border-[#2e3c51] pointer-events-auto">
          {message}
        </div>
      )}

      {/* Command Bar */}
      {mode === "COMMAND" && (
        <div className="bg-[#161e29] text-[#bfc7d2] px-2 py-1 border-t border-[#2e3c51] flex items-center pointer-events-auto">
          <span>{command}</span>
          <span
            className={`inline-block w-2 h-4 bg-[#bfc7d2] ml-0.5 ${
              cursorVisible ? "opacity-100" : "opacity-0"
            }`}
          ></span>
        </div>
      )}

      {/* Status Line */}
      <div className="flex justify-between items-center bg-[#2e3c51] text-[#bfc7d2] px-2 py-0.5 border-t border-[#161e29] pointer-events-auto">
        <div className="flex gap-4">
          <span className="font-bold uppercase">-- {mode} --</span>
          <span>main.js</span>
        </div>
        <div className="flex gap-4">
          <span>utf-8</span>
          <span>js/ts</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
