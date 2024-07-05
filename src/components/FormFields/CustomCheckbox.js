import { useTheme } from "@emotion/react";
import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

const CustomCheckbox = ({ handleChange, label, ...rest }) => {
  const theme = useTheme();

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
