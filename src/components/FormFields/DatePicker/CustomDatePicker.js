/**
 * Created by charnjeetelectrovese@gmail.com on 2/7/2020.
 */

import React, { Component, useMemo } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { TextField, useTheme } from "@mui/material";

const CustomDatePicker = ({
  onChange,
  minDate,
  isError,
  errorText,
  maxDate,
  value,
  label,
  clearable,
  ...rest
}) => {
  const theme = useTheme();
  const handleOnChange = (e, d) => {
    // const tempDate  = new Date(e);
    // const formattedDate = tempDate.getDate() + "-" + (tempDate.getMonth() + 1) + "-" + tempDate.getFullYear();
    // console.log(formattedDate);
    onChange && onChange(e);
  };

  const mD = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 10);
    return maxDate ? maxDate : d;
  }, [maxDate]);

  if (clearable) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          clearable={clearable}
          margin="dense"
          variant="inline"
          id="time-picker"
          fullWidth
          label={label}
          InputLabelProps={{
            sx: {
              color: theme.palette.text.primary,
            },
          }}
          value={value ? dayjs(value) : null}
          onChange={handleOnChange}
          inputVariant={"outlined"}
          // format={
          //     "dd-MM-yyyy"
          // }
          inputFormat="DD/MM/yyyy"
          error={isError ? true : false}
          minDate={minDate && dayjs(minDate)}
          maxDate={mD ? dayjs(mD) : dayjs()}
          // showTodayButton
          InputProps={{
            disableUnderline: true,
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                color: theme.palette.text.primary,
                ".MuiInputBase-input": {
                  padding: "2px 110px",
                  color: theme.palette.text.primary,
                  
                },
              }}
            />
          )}
          {...rest}
          // KeyboardButtonProps={{
          //     'aria-label': 'change time',
          // }}
        />
      </LocalizationProvider>
    );
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        margin="dense"
        variant="inline"
        id="time-picker"
        fullWidth
        label={label}
        InputLabelProps={{
            sx: {
              color: theme.palette.text.primary,
            },
          }}
        value={value ? value : new Date()}
        onChange={handleOnChange}
        inputVariant={"outlined"}
        format={"dd-MM-yyyy"}
        error={isError}
        minDate={minDate}
        maxDate={mD}
        
        // KeyboardButtonProps={{
        //     'aria-label': 'change time',
        // }}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
