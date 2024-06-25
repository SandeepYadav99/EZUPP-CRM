import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

const CustomCheckbox = ({ handleChange, label, ...rest }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          onChange={(e) => {
            handleChange(e.target.checked);
          }}
          {...rest}
        />
      }
      label={label}
    />
  );
};

export default CustomCheckbox;
