import {  TextField } from "@mui/material";
import React, { useCallback } from "react";

const DisabledTextField = ({
  onTextChange,
  disabled,
  isError,
  isCurser,
  ...rest
}) => {
  const handleChange = useCallback(
    (e) => {
      onTextChange && onTextChange(e.target.value);
    },
    [onTextChange]
  );

  return (
    <TextField
      disabled={disabled}
      error={isError}
      sx={{
        "& .MuiInputBase-root.Mui-disabled": {
          "& > fieldset": {
            borderColor: "rgb(192, 192, 192)",
          },
        },
    }}
      onChange={handleChange}
      variant={"outlined"}
      margin={"dense"}
      size="small"
      fullWidth
      {...rest}
    />
  );
};

export default DisabledTextField;
