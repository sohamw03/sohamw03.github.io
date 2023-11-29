import { GlobalProvider } from "@/context/GlobalContext";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Soham's Tech Odyssey : Navigating the Digital Universe",
  description: "Embark on a digital odyssey with Soham as he showcases his remarkable tech journey, innovative creations, and expertise. Explore the universe of code, creativity, and problem-solving on this inspiring tech voyage.",
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
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
