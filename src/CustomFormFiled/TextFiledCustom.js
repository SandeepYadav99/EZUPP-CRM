import { InputLabel, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import React, { useCallback } from "react";

const TextFiledCustom = ({
  onTextChange,
  onChange,
  isError,
  isCurser,
  ...rest
}) => {
  const handleChange = useCallback(
    (e) => {
      onChange && onChange(e);
      onTextChange && onTextChange(e.target.value);
    },
    [onTextChange, onChange]
  );

  return (
    <TextField
      error={isError}
      onChange={handleChange}
      variant={"outlined"}
      margin={"dense"}
      size="small"
      fullWidth={"true"}
      {...rest}
    />
  );
};

export default TextFiledCustom;
