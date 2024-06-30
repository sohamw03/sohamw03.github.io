"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./FancyCursor.module.css";

// Define a functional component named FancyCursor
export default function FancyCursor() {
  // Define state variables using the useState hook
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorBorderPos, setCursorBorderPos] = useState({ x: 0, y: 0 });
  const [cursorBorderStyle, setCursorBorderStyle] = useState({
    backgroundColor: "unset",
    mixBlendMode: "unset",
    size: "40px",
  });

  // Create references for the cursor elements using the useRef hook
  const cursorRef = useRef(null);
  const cursorBorderRef = useRef(null);

  // Use the useEffect hook to perform side effects
  useEffect(() => {
    // Get the cursor and cursor border elements
    const cursor = cursorRef.current;
    const cursorBorder = cursorBorderRef.current;

    // Define a mouse move event handler
    const handleMouseMove = (e) => {
      // Update the cursor position state
      setCursorPos({ x: e.clientX, y: e.clientY });
      // Move the cursor element using CSS transform
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    // Define a loop function to update the cursor border position
    const loop = () => {
      const easting = 8;
      setCursorBorderPos((prevPos) => ({
        x: prevPos.x + (cursorPos.x - prevPos.x) / easting,
        y: prevPos.y + (cursorPos.y - prevPos.y) / easting,
      }));
      // Move the cursor border element using CSS transform
      cursorBorder.style.transform = `translate(${cursorBorderPos.x}px, ${cursorBorderPos.y}px)`;
      // Request the next animation frame
      requestAnimationFrame(loop);
    };

    // Define a mouse over event handler
    const handleMouseOver = (e) => {
      const item = e.target;
      // Update the cursor border style based on the data attribute of the target element
      if (item.dataset.cursor === "pointer") {
        setCursorBorderStyle({
          backgroundColor: "rgba(255, 255, 255, .6)",
          mixBlendMode: "unset",
          size: "30px",
        });
      }
      if (item.dataset.cursor === "pointer2") {
        setCursorBorderStyle({
          backgroundColor: "white",
          mixBlendMode: "difference",
          size: "80px",
        });
      }
    };

    // Define a mouse out event handler
    const handleMouseOut = () => {
      // Reset the cursor border style
      setCursorBorderStyle({
        backgroundColor: "unset",
        mixBlendMode: "unset",
        size: "50px",
      });
    };

    // Add event listeners for mouse move, mouse over, and mouse out
    document.addEventListener("mousemove", handleMouseMove);
    requestAnimationFrame(loop);

    document.querySelectorAll("[data-cursor]").forEach((item) => {
      item.addEventListener("mouseover", handleMouseOver);
      item.addEventListener("mouseout", handleMouseOut);
    });

    // Clean up event listeners when the component is unmounted
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.querySelectorAll("[data-cursor]").forEach((item) => {
        item.removeEventListener("mouseover", handleMouseOver);
        item.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, [cursorPos, cursorBorderPos]);

  // Render the cursor elements using JSX
  return (
    <>
      <div id={styles["cursor"]} ref={cursorRef}></div>
      <div
        id={styles["cursor-border"]}
        style={{
          backgroundColor: cursorBorderStyle.backgroundColor,
          mixBlendMode: cursorBorderStyle.mixBlendMode,
          "--size": cursorBorderStyle.size,
        }}
        ref={cursorBorderRef}></div>
    </>
  );
}
