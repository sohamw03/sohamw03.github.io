"use client";
import styles from "@/app/page.module.css";
import { GlobalContext } from "@/context/GlobalContext";
import { ViewInAr } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function AboutContactButton() {
  const { toggleModalButtonRef } = useContext(GlobalContext);
  const router = useRouter();

  const toggleModal = () => {
    toggleModalButtonRef.current.click();
  };
  return (
    <>
      <button
        className={`${styles.button} ${styles.button_outline}`}
        style={{ WebkitTapHighlightColor: "transparent" }}
        onClick={() => {
          router.push("/3dexp");
        }}>
        <ViewInAr />
      </button>
      <button className={`${styles.button} ${styles.button_outline}`} style={{ WebkitTapHighlightColor: "transparent" }} onClick={toggleModal}>
        Contact
      </button>
    </>
  );
}
