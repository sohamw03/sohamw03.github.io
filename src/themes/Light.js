"use client";

import { useEffect } from "react";

export default function Light() {
  useEffect(() => {
    document.body.style.backgroundColor = "#fff";
    document.body.style.backgroundImage = "none";
    document.documentElement.style.setProperty("--highlight-color", "#b0e2ff");
  }, []);
  return <></>;
}
