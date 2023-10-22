import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Soham's Tech Odyssey : Navigating the Digital Universe",
  description: "Embark on a digital odyssey with Soham as he showcases his remarkable tech journey, innovative creations, and expertise. Explore the universe of code, creativity, and problem-solving on this inspiring tech voyage.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
