"use client";

import { useEffect } from "react";

export default function Light() {
  useEffect(() => {
    document.body.style.backgroundColor = "#fff";
    document.body.style.backgroundImage = "none";
  }, []);
  return <></>;
}
