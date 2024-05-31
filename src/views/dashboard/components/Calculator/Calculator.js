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

      if (result !== "") {
        setInputValue(result.toString());
        setResult("");
      }
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
      setInputValue(formattedResult.toString());
      //setResult(calculatedResult);
    } catch (error) {
      setResult("Error");
    }
  };

  return (
    // <div className={styles.container}>
    <div
      className={styles.calculator}
      style={{ background: "linear-gradient(to top left, #2063CE, #25CEAE)" }}
    >
      <div>
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
        </Typography>
      </div>
      
      <div>
        <Button className={`${styles.button}`} onClick={handleClear}>
          <Typography variant={"h5"}> C </Typography>
        </Button>
        <Button className={styles.button} onClick={handleDelete}>
          <Typography variant={"h5"}> ⟵ </Typography>
        </Button>
        <Button
          className={styles.button}
          onClick={() => handleButtonClick("/")}
        >
          <Typography variant={"h5"}>÷</Typography>
        </Button>
        <Button
          className={styles.button}
          onClick={() => handleButtonClick("*")}
        >
          <Typography variant={"h5"}>× </Typography>
        </Button>
      </div>
      <div>
        <Button
          className={styles.button}
          onClick={() => handleButtonClick("7")}
        >
          <Typography variant={"h5"}> 7 </Typography>
        </Button>
        <Button
          className={styles.button}
          onClick={() => handleButtonClick("8")}
        >
          <Typography variant={"h5"}> 8 </Typography>
        </Button>
        <Button
          className={styles.button}
          onClick={() => handleButtonClick("9")}
        >
          <Typography variant={"h5"}>9</Typography>
        </Button>
        <Button
          className={styles.button}
          onClick={() => handleButtonClick("-")}
        >
          <Typography variant={"h5"}> - </Typography>
        </Button>
      </div>
      <div>
        <Button
          className={styles.button}
          onClick={() => handleButtonClick("4")}
        >
          <Typography variant={"h5"}>4</Typography>
        </Button>
        <Button
          className={styles.button}
          onClick={() => handleButtonClick("5")}
        >
          <Typography variant={"h5"}>5</Typography>
        </Button>
        <Button
          className={styles.button}
          onClick={() => handleButtonClick("6")}
        >
          <Typography variant={"h5"}>6</Typography>
        </Button>
        <Button
          className={styles.button}
          onClick={() => handleButtonClick("+")}
        >
          <Typography variant={"h5"}>+</Typography>
        </Button>
      </div>
      <div style={{ display: "flex", alignItems: "left" }}>
        <Button
          className={styles.button}
          onClick={() => handleButtonClick("1")}
        >
          <Typography variant={"h5"}>1</Typography>
        </Button>
        <Button
          className={styles.button}
          onClick={() => handleButtonClick("2")}
        >
          <Typography variant={"h5"}>2</Typography>
        </Button>
        <Button
          className={styles.button}
          onClick={() => handleButtonClick("3")}
        >
          <Typography variant={"h5"}>3</Typography>
        </Button>
        <div
        className={`${styles.buttonWrap}`}
        
        >
          <Button
            className={`${styles.buttonH}`}
            onClick={handleCalculate}
          >
            <Typography variant={"h5"}>=</Typography>
          </Button>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "left" }}>
        <Button
          className={`${styles.buttonW}`}
          onClick={() => handleButtonClick("0")}
        >
          <Typography variant={"h5"}>0</Typography>
        </Button>
        <Button
          className={styles.button}
          onClick={() => handleButtonClick(".")}
        >
          <Typography variant={"h5"}>.</Typography>
        </Button>
      </div>
    </div>
  );
};

export default Calculator;
