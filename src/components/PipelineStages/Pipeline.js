import React, { useState, useEffect } from 'react';
import styles from './Styles.module.css';
import {useTheme} from "@mui/styles";
import { Tooltip } from '@mui/material';
export default function CustomButtonGroup({buttonText, value, onButtonClick}) {
  const theme = useTheme();
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [hoveredButton, setHoveredButton] = useState(null);
  useEffect(() => {
    setSelectedButtons([0]);
  }, []);

  const handleButtonClick = (index) => {
    setSelectedButtons((prevSelected) => {
        const newSelectedButtons = [];
        for (let i = 0; i <= index; i++) {
          newSelectedButtons.push(i);
        }
        return newSelectedButtons;
      });
      onButtonClick(index);
  };


  return (
    <div className={styles.buttonGroup}>
      {buttonText.map((text, index) => (
        <>
        <Tooltip
          key={index}
          title={text}
          placement="bottom"
          enterDelay={100}
        >
        <button
          key={index}
          onClick={() => handleButtonClick(index)}
          onMouseEnter={() => setHoveredButton(index)}
          onMouseLeave={() => setHoveredButton(null)}
          className={`${styles.button} ${selectedButtons.includes(index) ? styles.selected : ''}`}
          style={{  backgroundColor: selectedButtons.includes(index)
            ? theme.palette.selected.main
            : theme.palette.border}}
        >

        </button>
        </Tooltip>
        </>
      ))}
    </div>
  );
}
