"use client";
import { useVim } from "@/context/VimContext";
import { useEffect, useState } from "react";

export default function VimHints() {
  const { mode, updateMode } = useVim();
  const [hints, setHints] = useState([]);
  const [input, setInput] = useState("");

  // Characters for hints
  const chars = "abcdefghijklmnopqrstuvwxyz";

  useEffect(() => {
    if (mode !== "HINTS") {
      setHints([]);
      setInput("");
      return;
    }

    // Generate hints
    const elements = Array.from(document.querySelectorAll("a, button, input, textarea, [role='button']"));

    // Filter visible elements
    const visibleElements = elements.filter(el => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return (
        rect.width > 0 &&
        rect.height > 0 &&
        rect.bottom > 0 &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
        style.visibility !== "hidden" &&
        style.display !== "none" &&
        style.opacity !== "0" &&
        style.pointerEvents !== "none"
      );
    });

    // Assign labels
    const newHints = visibleElements.map((el, index) => {
      const getLabel = (n) => {
          if (n < 26) return chars[n];
          const first = chars[Math.floor(n / 26) - 1];
          const second = chars[n % 26];
          return first + second;
      };

      const label = getLabel(index);
      const rect = el.getBoundingClientRect();

      return {
        label,
        element: el,
        top: rect.top,
        left: rect.left,
      };
    });

    setHints(newHints);

  }, [mode]);

  useEffect(() => {
    if (mode !== "HINTS") return;

    const handleKeyDown = (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.key === "Escape" || (e.ctrlKey && e.key === "[")) {
        updateMode("NORMAL");
        return;
      }

      const key = e.key.toLowerCase();
      if (chars.includes(key)) {
        const newInput = input + key;
        setInput(newInput);

        // Check matches
        const matched = hints.find(h => h.label === newInput);
        const possible = hints.filter(h => h.label.startsWith(newInput));

        if (matched) {
            matched.element.click();
            matched.element.focus();
            updateMode("NORMAL");
        } else if (possible.length === 0) {
            // Invalid path
            updateMode("NORMAL");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [mode, hints, input, updateMode]);

  if (mode !== "HINTS") return null;

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none">
      {hints.map((hint) => (
        hint.label.startsWith(input) && (
            <div
            key={hint.label}
            className="absolute bg-[#ffd700] text-black font-bold text-xs px-1 rounded border border-black shadow-md uppercase transform -translate-y-1/2 -translate-x-1/2"
            style={{
                top: hint.top,
                left: hint.left,
                zIndex: 10000
            }}
            >
            <span className="text-gray-500">{input.toUpperCase()}</span>
            {hint.label.slice(input.length).toUpperCase()}
            </div>
        )
      ))}
    </div>
  );
}
