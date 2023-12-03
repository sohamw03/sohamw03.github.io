"use client";
import { useState } from "react";
import style from "./calculator.module.css";
import Light from "@/themes/Light";

const ButtonData = ["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-", "AC", "0", "=", "+"];

export default function Calculator() {
  const [outputContent, setOutputContent] = useState("0");
  const [ipContent, setIpContent] = useState("");

  function insert(num) {
    setIpContent((prev) => {
      return `${prev}${num}`;
    });
  }

  const equal = () => {
    const res = ipContent;
    setOutputContent((prev) => {
      try {
        return eval(res);
      } catch (e) {
        return "Incorrect Syntax";
      }
    });
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      equal();
    }
  };

  const btnActive = (e) => {
    e.preventDefault();
    e.target.classList.add(`${style.active}`);
  };

  const btnNotActive = (e) => {
    e.preventDefault();
    e.target.classList.remove(`${style.active}`);
  };

  return (
    <>
      <Light />
      <h1 className={style.heading}>Calculator</h1>
      <div className={style.container}>
        <div className={style.display}>
          <input
            className={style.ip}
            type="text"
            value={ipContent}
            onChange={(e) => {
              const value = e.target.value;
              const regex = /^[0-9+\-%^&*()e/]*$/;
              if (regex.test(value)) {
                setIpContent(value);
              }
            }}
            onKeyDown={handleEnterKey}
          />
          <div style={{ border: "2.1px solid #b0e2ff", borderRadius: "11px", overflow: "hidden" }}>
            <div className={style.output}>{outputContent}</div>
          </div>
        </div>
        <div className={style.buttoncontainer}>
          {ButtonData.map((item, index) => {
            const onClick = () => {
              if (item === "AC") {
                setIpContent((prev) => "");
                setOutputContent((prev) => "0");
              } else if (item === "=") {
                equal();
              } else {
                insert(item);
              }
            };
            return (
              <div
                key={index}
                className={style.but}
                onTouchStartCapture={btnActive}
                onTouchEndCapture={(e) => {
                  btnNotActive(e);
                  onClick();
                }}
                onMouseDown={btnActive}
                onMouseUp={btnNotActive}
                onClick={onClick}>
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <footer className={style.footer}>&copy; Soham Waghmare</footer>
    </>
  );
}
