import React, { useState } from "react";
import { FormControlLabel, Radio, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import styles from "./Style.module.css";
const RadioButtonWithText = ({
  title,
  description,
  checked,
  handleChange,
  value,
}) => {
  return (
    <>
      <Box
        border={1}
        borderColor={checked ? "#2063CE !important" : "#D8D8DD"}
        borderWidth={2}
        padding={1}
        borderRadius={2}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        width="100%"
        className={`${styles.textcard}`}
      >
        {/* <div className={styles.textContent}> */}
            <div className={styles.row}>
            <FormControlLabel
              control={
                <Radio
                  checked={checked}
                  onChange={handleChange}
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
        {/* </div> */}
      </Box>
    </>
  );
};

export default RadioButtonWithText;
