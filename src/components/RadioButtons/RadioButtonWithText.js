import React from "react";
import {Checkbox, FormControlLabel, Radio} from "@mui/material";
import styles from "./Style.module.css";
import RadioTextWrapper from "./RadioTextWrapper";

const RadioButtonWithText = ({
  title,
  description,
  checked,
  handleChange,
  value,
  cardStyle
}) => {
  return (
      <RadioTextWrapper
          description={description}
          cardStyle={cardStyle}
          handleChange={handleChange}
          title={title}
          checked={checked}
          value={value}
          fieldComp={<FormControlLabel
              control={
                  <Radio
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
          />}
      />
  );
};

export default RadioButtonWithText;


