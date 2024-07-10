import { InputLabel, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import React, { useCallback } from "react";

const LabelTextFiled = ({
  label,
  onTextChange,
  onChange,
  isError,
  isCurser,
  ...rest
}) => {
  const theme = useTheme();

  const handleChange = useCallback(
    (e) => {
      onChange && onChange(e);
      onTextChange && onTextChange(e.target.value);
    },
    [onTextChange, onChange]
  );

  return (
    <>
      <InputLabel>
        <Typography>{label}</Typography>
      </InputLabel>
      <TextField
        sx={{
          mt: theme.spacing(-0.2),

          input: {
            fontWeight: "600",
          },
        }}
        error={isError}
        onChange={handleChange}
        variant={"outlined"}
        margin={"dense"}
        size="small"
        fullWidth={"true"}
        {...rest}
      />
    </>
  );
};

export default LabelTextFiled;
