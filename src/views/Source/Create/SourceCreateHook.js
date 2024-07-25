import React, { useCallback, useEffect } from "react";
import { useState } from "react";

import LogUtils from "../../../libs/LogUtils";


const initialForm = {
  name: ""

};

const useSourceCreate=({isSidePanel, handleToggleSidePannel})=> {

  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
 
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name"];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
        // SnackbarUtils.error("Please enter values");
      } else if (["code"].indexOf(val) < 0) {
        delete errors[val];
      }
    });

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });

    return errors;
  }, [form, errorData]);

  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }
  }, [isSidePanel]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
     
        t[fieldName] = text;
      
  
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );


  const onBlurHandler = useCallback(
    (type) => {
      // if (form?.[type]) {
      //   changeTextData(form?.[type].trim(), type);
      // }
    },
    [changeTextData]
  );

  const handleSubmit = useCallback(
    async (status) => {
      const errors = checkFormValidation();
      LogUtils.log("errors==>", errors);

      if (Object.keys(errors)?.length > 0) {
        setErrorData(errors);
        return true;
      }
    //   submitToServer(status);
    },
    [checkFormValidation, setErrorData, form]
  );

 
  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
    setErrorData({})
  }, [form, setForm, errorData, setErrorData]);

  return {
    form,
    errorData,
   
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
 
  };
}

export default useSourceCreate;
