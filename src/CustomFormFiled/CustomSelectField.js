import React, { useMemo, useRef, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";

import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { Select } from "@mui/material";
import { useTheme } from "@mui/styles";

const SelectFields = ({
  isError,
  errorText,
  label,
  handleChange,
  icon,
  children,
  ...rest
}) => {
  const inputLabelRef = useRef(null);
const theme = useTheme();

  const id = useMemo(() => {
    return Date.now() + "SELECTED_LABEL" + label;
  }, [label]);

  const handleChangeLocal = (event) => {
    const {
      target: { value },
    } = event;
    handleChange(value);
  };

  return (
    <FormControl
      fullWidth
      margin={"dense"}
      variant={"outlined"}
      error={isError}
    >
      <InputLabel ref={inputLabelRef} htmlFor={`selectField${id}`} sx={{mt:theme.spacing(-0.5)}}>
        {label}
      </InputLabel>

      <Select
        name={label}
        onChange={(e) => {
          handleChangeLocal && handleChangeLocal(e);
        }}
        {...rest}
      >
        {children}
      </Select>

      <FormHelperText>{isError ? errorText : ""}</FormHelperText>
    </FormControl>
  );
};

export default SelectFields;
