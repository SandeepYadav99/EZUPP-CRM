import React, {useMemo, useRef, useEffect, useState} from 'react';
import { InputLabel, Select, OutlinedInput, FormHelperText, FormControl} from "@mui/material";
import LogUtils from "../../../libs/LogUtils";
import { useTheme } from '@emotion/react';

const CustomSelectField = ({ isError, errorText, label, handleChange, icon, children, outlinedProps, ...rest}) => {
    const [labelWidth, setLabelWidth] = useState(0);
    const inputLabelRef = useRef(null);
    const theme = useTheme();

console.log(theme)
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
        <FormControl   size={'small'} fullWidth margin={'dense'} variant={'outlined'} error={isError}    sx= {{
            color:  theme.palette.text.primary,
            "& .MuiInputBase-input": {
              color: theme.palette.text.primary,
            },
          }}>
            <InputLabel
                ref={inputLabelRef}
                htmlFor={`selectField${id}`}
                sx={{
                    color: theme.palette.text.primary,
                    "&.MuiInputLabel-outlined.MuiInputLabel-shrink": {
                        color: theme.palette.text.primary,
                        background:theme.palette.tableHeadColor,
                    },
                  }}
            >
                {label}
            </InputLabel>
            <div style={{position: 'relative', display: 'inline-block'}}>

                <Select
                    name={label}
                    {...rest}
                    input={
                        <OutlinedInput
                            size={'small'}
                            fullWidth
                            // labelWidth={labelWidth}
                            id={`selectField${id}`}
                            {...outlinedProps}
                            
                        />
                    }
                    onChange={(e) => { handleChangeLocal && handleChangeLocal(e); }}
                >
                    {children}
                </Select>
            </div>
            <FormHelperText>{isError ? (errorText) : ''}</FormHelperText>
        </FormControl>
    );
}

export default CustomSelectField;
