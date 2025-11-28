import FancyCursor from "@/components/FancyCursor";
import { GlobalProvider } from "@/context/GlobalContext";
import { VimProvider } from "@/context/VimContext";
import VimManager from "@/components/Vim/VimManager";
import VimStatusBar from "@/components/Vim/VimStatusBar";
import VimHints from "@/components/Vim/VimHints";
import VimKeybindsOverlay from "@/components/Vim/VimKeybindsOverlay";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Soham's Tech Odyssey : Navigating the Digital Universe",
  description: "Embark on a digital odyssey with Soham as he showcases his remarkable tech journey, innovative creations, and expertise. Explore the universe of code, creativity, and problem-solving on this inspiring tech voyage.",
  keywords: [
    "Soham",
    "Soham Waghmare",
    "Soham W",
    "Soham Waghmare's Tech Odyssey",
    "Soham's Tech Odyssey",
    "Soham's Odyssey",
    "Soham Waghmare's Odyssey",
    "Soham Waghmare's Tech Blog",
    "Soham's Tech Blog",
    "Soham Waghmare's Tech Journey",
    "Soham's Tech Journey",
    "Soham Waghmare's Tech Voyage",
    "Soham's Tech Voyage",
    "Soham Waghmare's Tech Universe",
    "Soham Waghmare's Portfolio",
    "Soham's Portfolio",
    "Soham Waghmare's Projects",
    "Soham's Projects",
    "Soham Waghmare's Work",
    "Soham's Work",
    "Soham Waghmare's Skills",
    "Soham's Skills",
    "Soham Waghmare's Experience",
    "Soham's Experience",
    "Soham Waghmare's Expertise",
    "Soham's Expertise",
    "Soham Waghmare's Achievements",
    "Soham's Achievements",
    "Soham Waghmare's Contributions",
    "Soham's Contributions",
    "Soham Waghmare's Innovations",
    "Soham's Innovations",
    "Soham Waghmare's Creations",
    "Soham's Creations",
    "Soham Waghmare's Code",
    "Soham's Code",
    "Soham Waghmare's Programming",
    "Soham's Programming",
    "Soham Waghmare's Web Development",
    "Soham's Web Development",
    "Soham Waghmare's Software Development",
    "Soham's Software Development",
    "Soham Waghmare's Frontend Development",
    "Soham's Frontend Development",
    "Soham Waghmare's Backend Development",
    "Soham's Backend Development",
    "Soham Waghmare's Full Stack Development",
    "Soham's Full Stack Development",
    "Soham Waghmare's UI/UX Design",
    "Soham's UI/UX Design",
    "Soham Waghmare's Responsive Design",
    "Soham's Responsive Design",
    "Soham Waghmare's Mobile Development",
    "Soham's Mobile Development",
    "Soham Waghmare's Web Design",
    "Soham's Web Design",
    "Soham Waghmare's Web Technologies",
    "Soham's Web Technologies",
    "Soham Waghmare's Programming Languages",
    "Soham's Programming Languages",
    "Soham Waghmare's Frameworks",
    "Soham's Frameworks",
    "Soham Waghmare's Libraries",
    "Soham's Libraries",
    "Soham Waghmare's Tools",
    "Soham's Tools",
    "Soham Waghmare's Technologies",
  ],
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://sohamw03.github.io",
    siteName: "Soham's Tech Odyssey : Navigating the Digital Universe",
    title: "Soham's Tech Odyssey : Navigating the Digital Universe",
    description: "Embark on a digital odyssey with Soham as he showcases his remarkable tech journey, innovative creations, and expertise. Explore the universe of code, creativity, and problem-solving on this inspiring tech voyage.",
    images: "https://sohamw03.github.io/images/preview.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          <VimProvider>
            <VimManager />
            <VimStatusBar />
            <VimHints />
            <VimKeybindsOverlay />
            {/* <FancyCursor /> */}
            {children}
          </VimProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
