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
import styles from "./Styles.module.css";
import { useState } from "react";

export function UserCountRadioLables({
  label,
  headerTitle,
  selectedOption,
  value,
  basicPara,
  price,
  handleRadioChange,
  setSelectedOption,
}) {
  console.log(selectedOption, "Options");
  return (
    <>
      <div className={styles.cardGrid}>
        <CardContent
          className={
            selectedOption === value ? styles.custom_option : styles.custom_opon
          }
          onClick={() => setSelectedOption(value)}
        >
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={value}
              value={selectedOption}
              onChange={handleRadioChange}
              name="radio-buttons-group"
            >
              <FormControlLabel
                value={value}
                control={<Radio />}
                label={label}
              />
            </RadioGroup>
            <div>{basicPara}</div>
          </FormControl>
          <div className={styles.flexBox}>{price}</div>
        </CardContent>

      </div>
    </>
  );
}
