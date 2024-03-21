"use client";
import Light from "@/themes/Light";
import { useEffect, useRef, useState } from "react";
import style from "./calculator.module.css";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import { Tooltip } from "@mui/material";

const ButtonData = ["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-", "AC", "0", "=", "+"];

export default function Calculator() {
  const [outputContent, setOutputContent] = useState("0");
  const [ipContent, setIpContent] = useState("");

  const btnRefs = useRef([]);
  const inputRef = useRef(null);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboardPress);
    window.addEventListener("keyup", handleKeyboardPress);
    return () => {
      window.removeEventListener("keydown", handleKeyboardPress);
      window.removeEventListener("keyup", handleKeyboardPress);
    };
  }, []);

  function insert(num) {
    setIpContent((prev) => {
      switch (num) {
        case "÷":
          num = "/";
          break;
        case "×":
          num = "*";
          break;
        default:
          break;
      }
      return `${prev}${num}`;
    });
  }

  const equal = () => {
    // console.log(ipContent);
    if (!ipContent) {
      setOutputContent((prev) => "0");
      return;
    }
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

  const handleKeyboardPress = (e) => {
    if (inputRef.current === document.activeElement) {
      return;
    }
    const key = e.key;
    // console.log(key);

    let index = ButtonData.indexOf(key);
    switch (key) {
      case "Escape":
        index = ButtonData.indexOf("AC");
        break;
      case "Enter":
        index = ButtonData.indexOf("=");
        break;
      case "/":
        index = ButtonData.indexOf("÷");
        break;
      case "*":
        index = ButtonData.indexOf("×");
        break;
      case "Backspace":
        setIpContent((prev) => prev.slice(0, -1));
        break;
      case "-":
        index = ButtonData.indexOf("-");
        break;
      case "+":
        index = ButtonData.indexOf("+");
        break;
      case "%":
        insert("%");
        break;
      case "^":
        insert("^");
        break;
      case "(":
        insert("(");
        break;
      case ")":
        insert(")");
        break;
      case "e":
        insert("e");
        break;
      case ".":
        insert(".");
        break;
      default:
        break;
    }

    if (index !== -1) {
      const btnRef = btnRefs.current[index];
      if (btnRef) {
        btnRef.click();
        if (e.type === "keydown") {
          btnRef.classList.add(`${style.active}`);
        } else if (e.type === "keyup") {
          btnRef.classList.remove(`${style.active}`);
        }
      }
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
            ref={inputRef}
            className={style.ip}
            type="text"
            value={ipContent}
            onChange={(e) => {
              const value = e.target.value;
              const regex = /^[\.0-9+\-%^&*()e/]*$/;
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
                ref={(ref) => (btnRefs.current[index] = ref)}
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
      <Tooltip title="You can use your keyboard to enter values." placement="left" arrow disableInteractive>
        <KeyboardIcon
          sx={{
            position: "fixed",
            top: 15,
            right: 20,
            fontSize: "2.5rem",
            cursor: "pointer",
          }}
        />
      </Tooltip>
    </>
  );
}
