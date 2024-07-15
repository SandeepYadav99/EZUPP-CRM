import React, { useCallback, useEffect, useRef, useState } from "react";
const initialForm = {
  name: "",
  internalName: "",
  fieldType: "",
  textFiled: "",
};
const useCustomFiledHook = () => {
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const dropDownRef = useRef(null);
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "name",
      "internalName",
      "fieldType",
    ];
    if (form?.fieldType === "TEXT_FIELD") {
       required.push("textFiled");
    }
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      } else if (["code"].indexOf(val) < 0) {
        delete errors[val];
      }
    });
    if (form?.title?.length < 2) {
      errors.title = true;
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  // useEffect(() => {
  
  //     handleReset();
    
  // }, []);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    const isIncludesValidOne =form?.fieldType === "DROPDOWN" && dropDownRef.current.isValid();
    if (Object.keys(errors)?.length > 0 ||  !isIncludesValidOne) {
      setErrorData(errors);
    } else {
      //   await submitToServer();
    }
  }, [
    checkFormValidation,
    setErrorData,
    form,
    // submitToServer,

    errorData,
  ]);

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

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
    setErrorData({});
  
  }, [form, setForm]);
  return {
    form,
    errorData,
    changeTextData,
    handleSubmit,
    dropDownRef,
  };
};

export default useCustomFiledHook;
