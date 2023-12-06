"use client";
import styles from "@/app/page.module.css";
import { GlobalContext } from "@/context/GlobalContext";
import { useContext } from "react";

export default function AboutContactButton() {
  const { toggleModalButtonRef } = useContext(GlobalContext);

  const toggleModal = () => {
    toggleModalButtonRef.current.click();
  };
  return (
    <button className={`${styles.button} ${styles.button_outline}`} style={{ WebkitTapHighlightColor: "transparent" }} onClick={toggleModal}>
      Contact
    </button>
  );
}
