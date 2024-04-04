import React, { useState, useEffect, useRef } from "react";
import { Container, Grid, TextField, Button } from "@mui/material";

import styles from "./Style.module.css";

const Calculator = () => {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  console.log(inputValue, "inputValue");
  const handleButtonClick = (value) => {
    console.log(value.length)
    if(inputValue.length<=15){
    const operators = {
      "÷": "/",
      x: "*",
    };
    
    const operator = operators[value] || value;
    const displayValue =
      operator === "*" ? "×" : operator === "/" ? "÷" : operator;

    setInputValue((prevInputValue) => prevInputValue + displayValue);
  }

  };

  const handleClear = () => {
    setInputValue("");
    setResult("");
  };

  const handleDelete = () => {
    setInputValue((prevInputValue) => prevInputValue.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      const evaluatedExpression = inputValue
        .replace(/÷/g, "/")
        .replace(/×/g, "*");
      const calculatedResult = eval(evaluatedExpression);
      setResult(calculatedResult);
    } catch (error) {
      setResult("Error");
    }
  };

  return (
    <Container className={styles.container}>
      <div
        className={styles.calculator}
        style={{ background: "linear-gradient(to top left, #2063CE, #25CEAE)" }}
      >
        <div>
          {/* <div style={{ fontSize: '52px', color: 'white', textAlign: 'right', fontWeight: 'bold', marginRight: '10px', fontFamily: 'Arial'}}>{value || '0'}</div> */}
          <div
            className={styles.value}
            style={{
              fontSize: "38px",
              color: "white",
              textAlign: "right",
              fontWeight: "bold",
              marginRight: "10px",
              wordBreak: "break-all",
            }}
          >
            {result !== "" ? result: inputValue || "0"}
            {console.log(result, 'result')}
          </div>
        </div>
        <div>
          <Button className={`${styles.button}`} onClick={handleClear}>
            C
          </Button>
          <Button className={styles.button} onClick={handleDelete}>
            ⟵
          </Button>
          <Button
            className={styles.button}
            onClick={() => handleButtonClick("/")}
          >
            ÷
          </Button>
          <Button
            className={styles.button}
            onClick={() => handleButtonClick("*")}
          >
            ×
          </Button>
        </div>
        <div>
          <Button
            className={styles.button}
            onClick={() => handleButtonClick("7")}
          >
            7
          </Button>
          <Button
            className={styles.button}
            onClick={() => handleButtonClick("8")}
          >
            8
          </Button>
          <Button
            className={styles.button}
            onClick={() => handleButtonClick("9")}
          >
            9
          </Button>
          <Button
            className={styles.button}
            onClick={() => handleButtonClick("-")}
          >
            -
          </Button>
        </div>
        <div>
          <Button
            className={styles.button}
            onClick={() => handleButtonClick("4")}
          >
            4
          </Button>
          <Button
            className={styles.button}
            onClick={() => handleButtonClick("5")}
          >
            5
          </Button>
          <Button
            className={styles.button}
            onClick={() => handleButtonClick("6")}
          >
            6
          </Button>
          <Button
            className={styles.button}
            onClick={() => handleButtonClick("+")}
          >
            +
          </Button>
        </div>
        <div style={{ display: "flex", alignItems: "left" }}>
          <Button
            className={styles.button}
            onClick={() => handleButtonClick("1")}
          >
            1
          </Button>
          <Button
            className={styles.button}
            onClick={() => handleButtonClick("2")}
          >
            2
          </Button>
          <Button
            className={styles.button}
            onClick={() => handleButtonClick("3")}
          >
            3
          </Button>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              className={`${styles.buttonH}`}
              onClick={handleCalculate}
              style={{ height: "188%", alignSelf: "stretch" }}
            >
              =
            </Button>{" "}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "left" }}>
          <Button
            className={`${styles.buttonW}`}
            onClick={() => handleButtonClick("0")}
          >
            0
          </Button>
          <Button
            className={styles.button}
            onClick={() => handleButtonClick(".")}
          >
            .
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Calculator;
