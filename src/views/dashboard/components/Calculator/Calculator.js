import React, { useState, useEffect, useRef } from "react";
import { Container, Grid, TextField, Button } from "@mui/material";
import { Typography } from "@mui/material";
import styles from "./Style.module.css";

const Calculator = () => {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  console.log(inputValue, "inputValue");
  const handleButtonClick = (value) => {
    if (inputValue.length <= 15) {
      const operators = {
        "÷": "/",
        x: "*",
      };

      const operator = operators[value] || value;
      const displayValue =
        operator === "*" ? "×" : operator === "/" ? "÷" : operator;

      if (/[+\-*/]$/.test(inputValue) && /\d/.test(value)) {
        setInputValue((prevInputValue) => prevInputValue + value);
        return;
      }
      const lastCharIsOperator = /[+\-*/]$/.test(inputValue);

      if (lastCharIsOperator) {
        // Replace the last character with the new operator
        setInputValue(
          (prevInputValue) => prevInputValue.slice(0, -1) + displayValue
        );
      } else {
        setInputValue((prevInputValue) => prevInputValue + displayValue);
      }
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
    if (inputValue === ".") {
      return;
    }
    if (/[+\-*/]$/g.test(inputValue) || inputValue === "") {
      return;
    }
    try {
      const evaluatedExpression = inputValue
        .replace(/÷/g, "/")
        .replace(/×/g, "*");
      const calculatedResult = eval(evaluatedExpression);
      const formattedResult = Number(calculatedResult.toPrecision(15));
      setResult(formattedResult);
      //setResult(calculatedResult);
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
          <Typography
            variant={"h1"}
            className={styles.value}
            style={{
              // fontSize: "38px",
              color: "white",
              textAlign: "right",
              // fontWeight: "bold",
              marginRight: "10px",
              wordBreak: "break-all",
            }}
          >
            {result !== "" ? result : inputValue || "0"}
            {/* {inputValue || '0'} */}
          </Typography>
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
              //justifyContent: "space-between"
            }}
          >
           
            <Button
              className={`${styles.buttonH}`}
              onClick={handleCalculate}
              style={{ height: "188%" }}
            >
            <span style={{ fontSize: "18px" }}>  =</span> 
            </Button>
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
