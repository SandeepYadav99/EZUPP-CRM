import React, { useState } from 'react';
import { Container, Grid, TextField, Button } from '@mui/material';

import styles from './Style.module.css';

const Calculator = () => {
  
    const [value, setValue] = useState('');
  
    const handleButtonClick = (input) => {
      setValue((prevValue) => prevValue + input);
    };
  
    const handleClear = () => {
      setValue('');
    };
  
    const handleDelete = () => {
      setValue((prevValue) => prevValue.slice(0, -1));
    };
  
    const handleCalculate = () => {
      try {
        setValue(eval(value).toString());
      } catch (error) {
        setValue('Error');
      }
    };
  
    return (
      <Container>
        <div className={styles.calculator} style={{background: 'linear-gradient(to top left, #2063CE, #25CEAE)'}}>
  <div>
  <div style={{ fontSize: '52px', color: 'white', textAlign: 'right', fontWeight: 'bold', marginRight: '10px'}}>{value || '0'}</div>
    {/* <TextField
      value={value}
      InputProps={{
        readOnly: true,
        disableUnderline: true,
        style: { 
          fontSize: '52px', 
          border: 'none', 
          boxShadow: 'none', 
        }
      }}
    /> */}
  </div>
  <div>
    <Button  className={styles.button} onClick={handleClear}>C</Button>
    <Button  className={styles.button} onClick={handleDelete}>←</Button>
    <Button  className={styles.button} onClick={() => handleButtonClick('/')}>÷</Button>
    <Button  className={styles.button} onClick={() => handleButtonClick('*')}>X</Button>
  </div>
  <div>
    <Button  className={styles.button} onClick={() => handleButtonClick('7')}>7</Button>
    <Button  className={styles.button} onClick={() => handleButtonClick('8')}>8</Button>
    <Button  className={styles.button} onClick={() => handleButtonClick('9')}>9</Button>
    <Button  className={styles.button} onClick={() => handleButtonClick('-')}>-</Button>
  </div>
  <div>
    <Button  className={styles.button} onClick={() => handleButtonClick('4')}>4</Button>
    <Button  className={styles.button} onClick={() => handleButtonClick('5')}>5</Button>
    <Button  className={styles.button} onClick={() => handleButtonClick('6')}>6</Button>
    <Button  className={styles.button} onClick={() => handleButtonClick('+')}>+</Button>
  </div>
  <div style={{ display: 'flex', alignItems: 'left' }}>
    <Button  className={styles.button} onClick={() => handleButtonClick('1')}>1</Button>
    <Button  className={styles.button} onClick={() => handleButtonClick('2')}>2</Button>
    <Button  className={styles.button} onClick={() => handleButtonClick('3')}>3</Button>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Button className={`${styles.buttonH}`} onClick={handleCalculate} style={{ height: '190%', alignSelf: 'stretch' }}>=</Button> </div>
  </div>
  
  <div style={{ display: 'flex', alignItems: 'left'}}>
    <Button  className={`${styles.buttonW} `} onClick={() => handleButtonClick('0')}>0</Button>
    <Button  className={styles.button} onClick={() => handleButtonClick('.')}>.</Button>
   
  </div>
  
</div>

      </Container>
    );
}

export default Calculator;