import React, {useMemo, useRef, useEffect, useState} from 'react';
import {InputLabel, Select, OutlinedInput, FormHelperText, FormControl, MenuItem} from "@mui/material";
import { useTheme } from '@emotion/react';

const CustomSelectField = ({ isError, errorText, label, handleChange, icon, children, outlinedProps, name, ...rest}) => {
    const [labelWidth, setLabelWidth] = useState(0);
    const inputLabelRef = useRef(null);
    const theme = useTheme();
    const id = useMemo(() => {
        return Date.now()+'SELECTED_LABEL'+label;
    }, [label]);

    const handleChangeLocal = (event) => {
        const {
            target: { value },
        } = event;
        handleChange(value);
    };


    return (
        <FormControl size={'small'} fullWidth  error={isError}
                       sx= {{
            color:  theme.palette.text.primary,
            "& .MuiInputBase-input": {
              color: theme.palette.text.primary,
            },
          }}
        >
            <InputLabel
                // ref={inputLabelRef}
                id={`selectFieldLabel${name}`}
                sx={{
                    color: theme.palette.text.primary,
                    "&.MuiInputLabel-outlined.MuiInputLabel-shrink": {
                        color: theme.palette.text.primary,
                        // background:theme.palette.tableHeadColor,
                        // overflow:"hidden"
                    },
                  }}
            >
                {label}
            </InputLabel>

                <Select
                    labelId={`selectFieldLabel${name}`}
                    id={`selectField${name}`}
                    label={label}
                    {...rest}
                    onChange={(e) => { handleChangeLocal && handleChangeLocal(e); }}
                >
                    {children}
                </Select>
            <FormHelperText>{isError ? (errorText) : ''}</FormHelperText>
        </FormControl>
    );
}

export default CustomSelectField;
