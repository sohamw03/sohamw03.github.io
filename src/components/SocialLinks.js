import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Tooltip } from "@mui/material";

export default function SocialLinks() {
  return (
    <div className="flex gap-2 mt-2">
      <Tooltip title="Gmail" enterTouchDelay={1} disableInteractive>
        <a className="rounded-full" href="mailto:waghmare.22111255@viit.ac.in">
          <EmailIcon className="text-[#808c9c] transition-colors hover:text-[#bfc7d2]" fontSize="large"></EmailIcon>
        </a>
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
