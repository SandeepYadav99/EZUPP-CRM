import React, {useMemo, useRef, useEffect, useState} from 'react';
import InputLabel from "@mui/material/InputLabel";
import SelectField from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import ReactDOM from "react-dom";

const CustomSelectField = ({ isError, errorText, label, handleChange, icon, children, ...rest}) => {
    const [labelWidth, setLabelWidth] = useState(0);
    const inputLabelRef = useRef(null);

    useEffect(() => {
        if (inputLabelRef.current) {
           // setLabelWidth(ReactDOM.findDOMNode(inputLabelRef.current).offsetWidth);
        }
    }, []);

    const id = useMemo(() => {
        return Date.now();
    }, [label]);



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
                    onChange={(e) => { handleChange && handleChange(e.target.value) }}
                    {...rest}
                    input={
                        <OutlinedInput
                            margin={'dense'}
                            fullWidth
                            // labelWidth={labelWidth}
                            id={`selectField${id}`}
                        />
                    }
                >
                    {children}
                </SelectField>
            </div>
            <FormHelperText>{isError ? (errorText) : ''}</FormHelperText>
        </FormControl>
    );
}

export default CustomSelectField;
