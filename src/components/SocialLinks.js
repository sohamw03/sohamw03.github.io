"use client";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Tooltip } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function SocialLinks() {
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
    <div className="flex gap-2 mt-2">
      <Tooltip title={`${gmailTooltip}`} enterTouchDelay={1} disableInteractive>
        {!isDesktop ? (
          <a className="rounded-full" href="mailto:sohamwaghmare2021@gmail.com">
            <EmailIcon className="text-[#808c9c] transition-colors hover:text-[#bfc7d2]" fontSize="large"></EmailIcon>
          </a>
        ) : (
          <div ref={clipboardRef} onClick={() => handleClick("sohamwaghmare2021@gmail.com")} className="cursor-pointer">
            <EmailIcon className="text-[#808c9c] transition-colors hover:text-[#bfc7d2]" fontSize="large"></EmailIcon>
          </div>
        )}
      </Tooltip>
      <Tooltip title="GitHub" enterTouchDelay={1} disableInteractive>
        <a className="rounded-full" href="https://github.com/sohamw03" target="_blank">
          <GitHubIcon className="text-[#808c9c] transition-colors hover:text-[#bfc7d2]" fontSize="large"></GitHubIcon>
        </a>
      </Tooltip>
      <Tooltip title="LinkedIn" enterTouchDelay={1} disableInteractive>
        <a className="rounded-full" href="https://www.linkedin.com/in/soham-waghmare" target="_blank">
          <LinkedInIcon className="text-[#808c9c] transition-colors hover:text-[#bfc7d2]" fontSize="large"></LinkedInIcon>
        </a>
      </Tooltip>
      <Tooltip title="Instagram" enterTouchDelay={1} disableInteractive>
        <a className="rounded-full" href="https://www.instagram.com/sohamwaghmare_ig" target="_blank">
          <InstagramIcon className="text-[#808c9c] transition-colors hover:text-[#bfc7d2]" fontSize="large"></InstagramIcon>
        </a>
      </Tooltip>
      <Tooltip title="YouTube" enterTouchDelay={1} disableInteractive>
        <a className="rounded-full" href="https://www.youtube.com/@sohamwaghmare" target="_blank">
          <YouTubeIcon className="text-[#808c9c] transition-colors hover:text-[#bfc7d2]" fontSize="large"></YouTubeIcon>
        </a>
      </Tooltip>
    </div>
  );
}
