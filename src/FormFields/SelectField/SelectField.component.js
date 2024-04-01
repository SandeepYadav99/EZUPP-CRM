import React, {useMemo, useRef, useEffect, useState} from 'react';
import InputLabel from "@mui/material/InputLabel";
import SelectField from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";


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

                <SelectField
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
                </SelectField>
            </div>
            <FormHelperText>{isError ? (errorText) : ''}</FormHelperText>
        </FormControl>
    );
}

export default CustomSelectField;
