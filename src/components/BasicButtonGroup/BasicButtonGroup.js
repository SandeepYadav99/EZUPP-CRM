import  React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useTheme} from "@mui/styles";
import styles from "./Styles.module.css"
import { Typography } from '@mui/material';


export default function BasicButtonGroup({ buttonText,  selectedIndex, onButtonClick}) {
  const [selectedButton, setSelectedButton] = useState(selectedIndex);
  const handleButtonClick = (index) => {
      setSelectedButton(index);
      onButtonClick(index);
    };
      const theme = useTheme();
  return (
    <ButtonGroup  aria-label="Basic button group" className={styles.buttonGroup}>
        {buttonText.map((text,index) => (
        <Button
          key={index}
          onClick={() => handleButtonClick(index)}
          className={`${styles.button} `}
          style={{
            color: selectedButton === index ? theme.palette.text.bright : theme.palette.text.secondary,
             borderColor: '#E4E4E6',
             backgroundColor: selectedButton === index ? `${theme.palette.primary.main}`: `${theme.palette.background.paper}`
          }}
          variant={selectedButton === index ? "contained" : "outlined"}
        >
        <Typography variant="body1">{text}</Typography>
        </Button>
      ))}
    </ButtonGroup>
  );
}
