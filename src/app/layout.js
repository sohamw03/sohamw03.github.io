import React from "react";
import { Inter } from "next/font/google";
import Head from "next/head";
import styles from "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "Soham's Tech Odyssey : Navigating the Digital Universe",
  description: "Embark on a digital odyssey with Soham as he showcases his remarkable tech journey, innovative creations, and expertise. Explore the universe of code, creativity, and problem-solving on this inspiring tech voyage.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="stylesheet" href={styles} />
        <meta property="og:image" content="./6554de43848d20764128d9b8.png">
<meta property="og:title" content="Portfoli o- Soham">
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
