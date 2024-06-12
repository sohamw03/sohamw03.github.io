"use client";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Tooltip } from "@mui/material";
import { memo, useCallback, useRef, useState } from "react";

const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
const platform = typeof window !== "undefined" ? window.navigator.platform : "";
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) || (platform === "MacIntel" && navigator.maxTouchPoints > 1);

const SocialLinks = memo(() => {
  const copyToClipboard = useRef(false);
  const [gmailTooltip, setGmailTooltip] = useState("Gmail");

  const handleClick = useCallback((text) => {
    if (!isMobile) {
      const textToCopy = `${text}`; // Set your desired text to copy
      const success = navigator.clipboard.writeText(textToCopy);
      copyToClipboard.current = success;
      if (success) {
        setGmailTooltip(() => "Copied!");
        setTimeout(() => {
          setGmailTooltip(() => "Gmail");
        }, 3000);
      }
    }
  }, []);

  return (
    <div className="flex gap-2 mt-2">
      <Tooltip title={`${gmailTooltip}`} enterTouchDelay={1} disableInteractive>
        {isMobile ? (
          <a className="rounded-full" href="mailto:sohamwaghmare2021@gmail.com">
            <EmailIcon className="text-[#808c9c] transition-colors hover:text-[#bfc7d2]" fontSize="large" />
          </a>
        ) : (
          <a onClick={() => handleClick("sohamwaghmare2021@gmail.com")} className="cursor-pointer">
            <EmailIcon className="text-[#808c9c] transition-colors hover:text-[#bfc7d2]" fontSize="large" />
          </a>
        )}
      </Tooltip>
      <Tooltip title="GitHub" enterTouchDelay={1} disableInteractive>
        <a className="rounded-full" href="https://github.com/sohamw03" target="_blank">
          <GitHubIcon className="text-[#808c9c] transition-colors hover:text-[#bfc7d2]" fontSize="large" />
        </a>
      </Tooltip>
      <Tooltip title="LinkedIn" enterTouchDelay={1} disableInteractive>
        <a className="rounded-full" href="https://www.linkedin.com/in/soham-waghmare" target="_blank">
          <LinkedInIcon className="text-[#808c9c] transition-colors hover:text-[#bfc7d2]" fontSize="large" />
        </a>
      </Tooltip>
      <Tooltip title="Instagram" enterTouchDelay={1} disableInteractive>
        <a className="rounded-full" href="https://www.instagram.com/sohamwaghmare_ig" target="_blank">
          <InstagramIcon className="text-[#808c9c] transition-colors hover:text-[#bfc7d2]" fontSize="large" />
        </a>
      </Tooltip>
      <Tooltip title="YouTube" enterTouchDelay={1} disableInteractive>
        <a className="rounded-full" href="https://www.youtube.com/@sohamwaghmare" target="_blank">
          <YouTubeIcon className="text-[#808c9c] transition-colors hover:text-[#bfc7d2]" fontSize="large" />
        </a>
      </Tooltip>
    </div>
  );
});

export default SocialLinks;
