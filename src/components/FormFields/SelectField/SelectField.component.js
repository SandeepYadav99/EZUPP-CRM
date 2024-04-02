import React, {useMemo, useRef, useEffect, useState} from 'react';
import { InputLabel, Select, OutlinedInput, FormHelperText, FormControl} from "@mui/material";
import LogUtils from "../../../libs/LogUtils";

const CustomSelectField = ({ isError, errorText, label, handleChange, icon, children, ...rest}) => {
    const [labelWidth, setLabelWidth] = useState(0);
    const inputLabelRef = useRef(null);


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
        <FormControl fullWidth margin={'dense'} variant={'outlined'} error={isError}>
            <InputLabel
                ref={inputLabelRef}
                htmlFor={`selectField${id}`}
            >
                {label}
            </InputLabel>
            <div style={{position: 'relative', display: 'inline-block'}}>

                <Select
                    name={label}
                    {...rest}
                    input={
                        <OutlinedInput
                            margin={'dense'}
                            fullWidth
                            // labelWidth={labelWidth}
                            id={`selectField${id}`}
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
