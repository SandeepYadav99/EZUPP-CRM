import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import styles from "./Style.module.css";
const RadioButtons = ({ image, title, checked, handleChange, value }) => {
  return (
    <>
      <Box
        border={1}
        borderColor={checked ? "#2063CE !important" : "#D8D8DD"}
        // borderColor={selectedValue === name ? "#007AFF" : "#D8D8DD"}
        borderWidth={2}
        padding={1}
        borderRadius={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        className={`${styles.card}`}
      >
        <div className={styles.cardContent}>
          <div className="image-container">
            <img src={image} />
          </div>
          <Typography variant="body3" className="title">
            {title}
          </Typography>

          <FormControlLabel
            control={
              <Radio checked={checked} onChange={handleChange} size="small" value={value} />
            }
            // labelPlacement="top"
            className={styles.radio}
            // sx={{ marginBottom: 8, boxSizing: "border-box" }}
          />
        </div>
      </Box>
    </>
  );
};

export default RadioButtons;
