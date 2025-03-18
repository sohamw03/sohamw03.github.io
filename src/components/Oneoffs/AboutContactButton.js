"use client";
import styles from "@/app/page.module.css";
import { GlobalContext } from "@/context/GlobalContext";
import { ArrowBackTwoTone, ViewInAr } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

export default function AboutContactButton() {
  const { toggleModalButtonRef } = useContext(GlobalContext);
  const router = useRouter();
  const pathname = usePathname();

  const toggleModal = () => {
    toggleModalButtonRef.current.click();
  };
  return (
    <>
      {pathname === "/3dexp" ? (
        <button
          className={`${styles.button} ${styles.button_outline} z-10`}
          style={{ WebkitTapHighlightColor: "transparent" }}
          onClick={() => {
            router.push("/");
          }}>
          <ArrowBackTwoTone />
        </button>
      ) : (
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
      )}
    </>
  );
}
