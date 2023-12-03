"use client";

import { useEffect } from "react";

export default function Dark() {
  useEffect(() => {
    document.body.style.backgroundColor = "#10151d";
  }, []);
  return <></>;
}
