"use client";
import { useEffect, useRef } from "react";
import styles from "./ContactDynamicArrowCross.module.css";

export default function ContactDynamicArrowCross(props) {
  const { isCross } = props;

  const crossRef = useRef();

  useEffect(() => {
    if (isCross) {
      crossRef.current.style.setProperty("--scale", "1");
      crossRef.current.style.setProperty("--translate-before", "0");
      crossRef.current.style.setProperty("--translate-after", "0");
    } else {
      crossRef.current.style.setProperty("--scale", "0.5");
      crossRef.current.style.setProperty("--translate-before", "-3px, 1px");
      crossRef.current.style.setProperty("--translate-after", "3px, 1px");
    }
  }, [isCross]);

  return <span className={`${styles.ContactDynamicArrowCross} ${isCross ? "styles.isCross" : ""}`} aria-hidden={true} ref={crossRef}></span>;
}
