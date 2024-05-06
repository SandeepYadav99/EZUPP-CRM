import {useCallback, useState} from "react";

const useStyleGuide = ({}) => {
    const [checkboxValue, setCheckboxValue] = useState([]);

    const handleCheckboxChange = useCallback((value) => {
        const tempVal = JSON.parse(JSON.stringify(checkboxValue));
        if (tempVal.indexOf(value) >= 0) {
            tempVal.splice(tempVal.indexOf(value), 1);
        } else {
            tempVal.push(value);
        }
        setCheckboxValue(tempVal);
    }, [checkboxValue, setCheckboxValue]);

    return {
        checkboxValue,
        handleCheckboxChange
    }
}

export default useStyleGuide;
