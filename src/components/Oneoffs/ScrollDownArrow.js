"use client";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function ScrollDownArrow() {
  const handleScroll = () => {
    const element = document.getElementById('ai-projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      onClick={handleScroll}
      className="absolute bottom-0 w-full h-32 flex items-center justify-center cursor-pointer z-50 group"
    >
      <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-bounce">
        <KeyboardArrowDownIcon sx={{ fontSize: 30, color: "#808c9c" }} />
      </div>
    </div>
  );
}
