import React, { useState } from "react";
import { FormControlLabel, Radio, Checkbox, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import styles from "./Style.module.css";
import {useTheme} from "@mui/styles";
import csx from 'classnames';
const RadioButtonWithText = ({
  title,
  description,
  checked,
  handleChange,
  value,
  cardStyle,
  type
}) => {
  const theme = useTheme();
  const CheckboxOrRadio = type === "checkbox" ? Checkbox : Radio;
  return (
    <>
      <Box
        border={1}
        sx={{
          display: 'flex',
          flexDirection:"column",
          alignItems: "flex-start",
          borderRadius: theme.spacing(1),
          padding: theme.spacing(1),
          borderColor: checked ? `${theme.palette.primary.main}` : "#D8D8DD",
          cursor: 'pointer',
      }}
        borderWidth={2}
        className={csx(styles.textcard, cardStyle ? cardStyle : {})}
        onClick={() => {
          handleChange && handleChange(value)
      }}
      >

            <div className={styles.row}>
            <FormControlLabel
              control={
                <CheckboxOrRadio
                  checked={checked}
                  onChange={() => {
                    // handleChange && handleChange(value)
                }}
                  //onChange={handleChange}
                  value={value}
                  size="small"
                />
              }
              className={styles.radio1}
            />
            <div className={styles.textContent}>
            <Typography variant="subtitle1" className="title">
              {title}
            </Typography>
         
          <Typography variant="body1" className="title">
            {description}
          </Typography>
          </div>
          </div>
        
      </Box>
    </>
  );
};

export default RadioButtonWithText;
