"use client";

import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Tooltip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import styles from "../../app/page.module.css";

export default function Navbar() {
  const clipboardRef = useRef(null);
  const [copyToClipboard, setCopyToClipboard] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [gmailTooltip, setGmailTooltip] = useState("Gmail");
  useEffect(() => {
    function checkDeviceType() {
      const userAgent = navigator.userAgent;
      const platform = window.navigator.platform;

      // Combined and refined device detection logic
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) || (platform === "MacIntel" && navigator.maxTouchPoints > 1);

      setIsDesktop(!isMobile);
    }

    checkDeviceType();
  }, []);

  const handleClick = (text) => {
    if (isDesktop) {
      const textToCopy = `${text}`; // Set your desired text to copy
      const success = navigator.clipboard.writeText(textToCopy);
      setCopyToClipboard(success);
      if (success) {
        setGmailTooltip(() => "Copied!");
        setTimeout(() => {
          setGmailTooltip(() => "Gmail");
        }, 3000);
      }
    }
  };

  return (
    <nav className={`${styles.navbar} flex flex-col w-full`}>
      <div className={`text-slate-400 text-4xl font-semibold my-4 w-full`}>
        <a href="/" className="w-full flex justify-center items-center">
          S
        </a>
      </div>
      <div className={`flex flex-col flex-1 items-center *:transition-all`}>
        <Tooltip title="Chat" disableInteractive placement="right">
          <button className="hover:bg-slate-800 rounded-full aspect-square w-4/6">
            <ChatOutlinedIcon className="text-slate-600" />
          </button>
        </Tooltip>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Tooltip title={`${gmailTooltip}`} enterTouchDelay={1} disableInteractive placement="right">
          {!isDesktop ? (
            <a className="rounded-full" href="mailto:sohamwaghmare2021@gmail.com">
              <EmailIcon className="text-slate-500 transition-colors hover:text-slate-400" fontSize="medium"></EmailIcon>
            </a>
          ) : (
            <div ref={clipboardRef} onClick={() => handleClick("sohamwaghmare2021@gmail.com")} className="cursor-pointer">
              <EmailIcon className="text-slate-500 transition-colors hover:text-slate-400" fontSize="medium"></EmailIcon>
            </div>
          )}
        </Tooltip>
        <Tooltip title="GitHub" enterTouchDelay={1} disableInteractive placement="right">
          <a className="rounded-full" href="https://github.com/sohamw03" target="_blank">
            <GitHubIcon className="text-slate-500 transition-colors hover:text-slate-400" fontSize="medium"></GitHubIcon>
          </a>
        </Tooltip>
        <Tooltip title="LinkedIn" enterTouchDelay={1} disableInteractive placement="right">
          <a className="rounded-full" href="https://www.linkedin.com/in/soham-waghmare" target="_blank">
            <LinkedInIcon className="text-slate-500 transition-colors hover:text-slate-400" fontSize="medium"></LinkedInIcon>
          </a>
        </Tooltip>
        <Tooltip title="Instagram" enterTouchDelay={1} disableInteractive placement="right">
          <a className="rounded-full" href="https://www.instagram.com/sohamwaghmare_ig" target="_blank">
            <InstagramIcon className="text-slate-500 transition-colors hover:text-slate-400" fontSize="medium"></InstagramIcon>
          </a>
        </Tooltip>
        <Tooltip title="YouTube" enterTouchDelay={1} disableInteractive placement="right">
          <a className="rounded-full" href="https://www.youtube.com/@sohamwaghmare" target="_blank">
            <YouTubeIcon className="text-slate-500 transition-colors hover:text-slate-400" fontSize="medium"></YouTubeIcon>
          </a>
        </Tooltip>
      </div>
      <span className="w-full text-center text-4xl mb-2 text-[#2e3c51] leading-none select-none pointer-events-none">...</span>
    </nav>
  );
}
