import React, { useState, useEffect } from 'react';
import styles from './Styles.module.css';
import {useTheme} from "@mui/styles";
import { Tooltip, Typography } from '@mui/material';
export default function CustomButtonGroup({buttonText, value, onButtonClick}) {
  const theme = useTheme();
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [hoveredButton, setHoveredButton] = useState(null);
  // useEffect(() => {
  //   setSelectedButtons([value]);
  // }, [value]);

  // const handleButtonClick = (index) => {
  //   setSelectedButtons((prevSelected) => {
  //       const newSelectedButtons = [];
  //       for (let i = 0; i <= index; i++) {
  //         newSelectedButtons.push(i);
  //       }
  //       return newSelectedButtons;
  //     });
  //     onButtonClick(index);
  // };
  const [selectedIndex, setSelectedIndex] = useState(value);

  const handleButtonClick = (index) => {
    setSelectedIndex(index);
    onButtonClick(index);
  };


  return (
    <div className={styles.buttonGroup}>
      {buttonText.map((text, index) => (
        <>
        {/* <Tooltip
          key={index}
          title={text}
          placement="bottom"
          enterDelay={100}
        > */}
        <button
          key={index}
          onClick={() => handleButtonClick(index)}
          className={`${styles.button} ${index <= selectedIndex  ? styles.selected : ''}`}
          style={{  backgroundColor:  index <= selectedIndex 
            ? theme.palette.primary.main
            : theme.palette.border,
            color: index <= selectedIndex  ? theme.palette.text.bright : theme.palette.text.primary,}}
        >
 <Typography variant="body2">{text}</Typography>
        </button>
        {/* </Tooltip> */}
        </>
      ))}
    </div>
  );
}
