import styles from "@/app/page.module.css";
import { faBootstrap, faCloudflare, faNodeJs, faReact } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { default as GitHubIcon } from "@mui/icons-material/GitHub";

// Open New Page
export const OpenNewPage = (href) => {
  window.open(href, "_blank");
};

// Text parser | Similar to markdown parser
export const parser = (text) => {
  // Regex for links
  const linkRegex = /\[(.*?)\]\((.*?)\)/g;
  const link = text.match(linkRegex);
  if (link) {
    link.forEach((match) => {
      const [name, href] = match.replace("[", "").replace(")", "").split("](");
      text = text.replace(match, `<a href="${href}" target="_blank" class="hover:underline">${name}</a>`);
    });
  }
  return text;
};

// Icon Renderer
export const renderIcon = (tech, index) => {
  let returnIcon = <></>;
  switch (tech) {
    case "Bootstrap":
      returnIcon = <FontAwesomeIcon key={index} icon={faBootstrap} style={{ pointerEvents: "none", color: "#bfc7d2", userSelect: "none", aspectRatio: "1/1", height: "27px" }} size="xl" />;
      break;
    case "React.JS":
      returnIcon = <FontAwesomeIcon key={index} icon={faReact} style={{ pointerEvents: "none", color: "#bfc7d2", userSelect: "none", aspectRatio: "1/1", height: "27px" }} size="xl" />;
      break;
    case "Node.JS":
      returnIcon = <FontAwesomeIcon key={index} icon={faNodeJs} style={{ pointerEvents: "none", color: "#bfc7d2", userSelect: "none", aspectRatio: "1/1", height: "27px" }} size="xl" />;
      break;
    case "GithubPages":
      returnIcon = <GitHubIcon key={index} style={{ pointerEvents: "none", color: "#bfc7d2", userSelect: "none", aspectRatio: "1/1", height: "27px" }} />;
      break;
    case "Cloudflare":
      returnIcon = <FontAwesomeIcon key={index} icon={faCloudflare} style={{ pointerEvents: "none", color: "#bfc7d2", userSelect: "none", aspectRatio: "1/1", height: "27px" }} />;
      break;
    case "NewsAPI":
    case "VGG16":
    case "YOLO":
    case "FaceNet":
    case "Dlib":
    case "OpenAI":
    case "FAISS":
      returnIcon = (
        <span key={index} className={`${styles.skillchip} pointer-events-none select-none`}>
          {tech}
        </span>
      );
      break;
    default:
      returnIcon = <img src={`/images/icons/${tech.toLowerCase()}_icon.png`} className="pointer-events-none select-none rounded-full m-0 p-0 aspect-square" alt={`${tech}`} key={index} style={{ width: "27px", height: "27px" }} loading="lazy" />;
      break;
  }
  return returnIcon;
};
