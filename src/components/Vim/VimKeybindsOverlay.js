"use client";
import { useVim } from "@/context/VimContext";
import { useEffect } from "react";

export default function VimKeybindsOverlay() {
  const { vimEnabled, showKeybinds, toggleKeybinds } = useVim();

  useEffect(() => {
    if (!vimEnabled || !showKeybinds) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape" || (e.ctrlKey && e.key === "[")) {
        e.preventDefault();
        e.stopPropagation();
        toggleKeybinds();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [vimEnabled, showKeybinds, toggleKeybinds]);

  if (!vimEnabled || !showKeybinds) return null;

  const keybinds = [
    { keys: "j / k", desc: "Scroll Down / Up" },
    { keys: "Ctrl + d / u", desc: "Scroll Half Page Down / Up" },
    { keys: "gg / G", desc: "Go to Top / Bottom" },
    { keys: "i", desc: "Insert Mode (AI Chat)" },
    { keys: "f", desc: "Hints Mode (Navigation)" },
    { keys: "/", desc: "Search" },
    { keys: "n / N", desc: "Next / Prev Match" },
    { keys: ":", desc: "Command Mode" },
    { keys: "?", desc: "Toggle Help" },
    { keys: "Esc", desc: "Back to Normal Mode" },
  ];

  const commands = [
    { cmd: ":w / :q / :wq", desc: "File Operations (Try them!)" },
    { cmd: ":chat", desc: "Open AI Chat" },
    { cmd: ":go [section]", desc: "Navigate to section" },
    { cmd: ":top / :bottom", desc: "Scroll to Top / Bottom" },
  ];

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={toggleKeybinds}>
      <div
        className="bg-[#1d1f21] text-[#c5c8c6] p-6 rounded-lg shadow-2xl border border-[#373b41] max-w-2xl w-full mx-4 font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 border-b border-[#373b41] pb-2">
          <h2 className="text-xl font-bold text-[#81a2be]">Vim Mode Keybindings</h2>
          <button onClick={toggleKeybinds} className="text-[#cc6666] hover:text-[#ff0000]">
            [x]
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-[#b294bb] font-bold mb-3 uppercase text-sm tracking-wider">Navigation & Actions</h3>
            <ul className="space-y-2">
              {keybinds.map((k, i) => (
                <li key={i} className="flex justify-between text-sm">
                  <span className="text-[#f0c674] font-bold">{k.keys}</span>
                  <span className="text-[#969896]">{k.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#b294bb] font-bold mb-3 uppercase text-sm tracking-wider">Commands</h3>
            <ul className="space-y-2">
              {commands.map((c, i) => (
                <li key={i} className="flex justify-between text-sm">
                  <span className="text-[#8abeb7] font-bold">{c.cmd}</span>
                  <span className="text-[#969896]">{c.desc}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-3 bg-[#282a2e] rounded border border-[#373b41]">
              <p className="text-xs text-[#969896]">
                <span className="text-[#cc6666] font-bold">Tip:</span> Use <span className="text-[#f0c674]">f</span> to show hints and navigate without a mouse.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-[#5e615e] border-t border-[#373b41] pt-2">
          Press <span className="font-bold text-[#c5c8c6]">?</span> to toggle this overlay anytime.
        </div>
      </div>
    </div>
  );
}
