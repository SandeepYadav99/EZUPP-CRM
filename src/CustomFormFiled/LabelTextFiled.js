import { InputLabel, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import React, { useCallback, useMemo } from "react";

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

  const id = useMemo(() => {
    return Date.now() + "LABEL" + label;
  }, [label]);

  return (
    <>
      <InputLabel>
        <Typography htmlFor={`label${id}`}>{label}</Typography>
      </InputLabel>
      <TextField
        sx={{
          mt: theme.spacing(-0.2),

          input: {
            fontWeight: "600",
          },
        }}
        name={label}
        id={`label${id}`}
        error={isError}
        onChange={handleChange}
        variant={"outlined"}
        margin={"dense"}
        size="small"
        fullWidth
        {...rest}
      />
    </>
  );
};

export default LabelTextFiled;
