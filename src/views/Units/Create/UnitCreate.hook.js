import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import {
  serviceCreateUnit,
  serviceUpdateUnit,
} from "../../../services/Unit.service";
import {
  serviceGetList,
  serviceGetTagList,
} from "../../../services/index.services";
import { validateUrl } from "../../../libs/RegexUtils";

function useUnitCreateHook({handleToggle}) {
  const initialForm = {
    name: "",
    is_general: false,
    is_active: true,
    
  };

  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [images, setImages] = useState(null);
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listData, setListData] = useState({
    ROLES: [],
    UNITS: [],
  });
  // const [tagList,setTagList] = useState([])
  // useEffect(() => {
  //   serviceGetList(["ROLES", "UNITS"]).then((res) => {
  //     if (!res.error) {
  //       setListData(res.data);
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   serviceGetTagList({query:"a"}).then((res) => {
  //     if (!res.error) {
  //       setTagList(res.data);
  //     }
  //   });
  // }, []);



  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name"];
    
    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) != 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      }
    });
    if (form?.name?.length < 2) {
      errors["name"] = true;
    }
    if (form?.code?.length < 2) {
      errors["code"] = true;
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const changeTextData = useCallback(
    // (text, fieldName) => {
    //   let shouldRemoveError = true;
    //   const t = { ...form };
      (value, fieldName) => {
        let updatedForm = { ...form };
    
        // Handle different field names
        if (fieldName === "is_general") {
          updatedForm.is_general = value; // Update is_general directly
        } else {
          updatedForm[fieldName] = value;
        }
    
        setForm(updatedForm); // Update the form state
        removeError(fieldName); // Remove any previous error for this field
      },
      // if (
      //   fieldName === "ballpark_cost" ||
      //   fieldName === "ballpark_price" ||
      //   fieldName === "discount_value"
      // ) {
      //   if (text >= 0) {
      //     t[fieldName] = text;
      //   }
      // } else if (fieldName === "discount_percent") {
      //   if (text >= 0 && text <= 100) {
      //     t[fieldName] = text;
      //   }
      // } else {
      //   t[fieldName] = text;
      // }
      // setForm(t);
      // shouldRemoveError && removeError(fieldName);
    // },
    [removeError, form, setForm]
  );
  console.log(form, "Form");
  const submitToServer = useCallback(
    () => {
      if (!isSubmitting) {
        setIsSubmitting(true);
  
      
        const errors = {};
        if (!form.name.trim()) {
          errors.name = "Unit Name is required";
        }
       
        if (Object.keys(errors).length > 0) {
          setErrorData(errors);
          setIsSubmitting(false); 
          return;
        }
  
      
        const formData = {
          name: form.name.trim(),
          is_general: form.is_general,
          is_active: form.is_active,
      
        };
  
        let req;
        if (id) {
          
          formData.id = id;
          req = serviceUpdateUnit(formData);
        } else {
         
          req = serviceCreateUnit(formData);
        }
  
        req.then((res) => {
          if (!res.error) {
            
            handleToggle();
            //  historyUtils.goBack();
            SnackbarUtils.success("Unit saved successfully");

            setErrorData({});
          } else {
            
            SnackbarUtils.error(res.message);
          }
          setIsSubmitting(false); 
        });
      }
    },
    [form, isSubmitting, setIsSubmitting, setErrorData, id]
  );
  const handleDeleteTask = useCallback((taskData) => {
    const updatedTasks = form.tasks.filter(task => task.id !== taskData.id);
  setForm(prevForm => ({
    ...prevForm,
    tasks: updatedTasks,
  }));
  }, [form, setForm]);
  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
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
      submitToServer(status);
    },
    [checkFormValidation, setErrorData, form, submitToServer]
  );

  return {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    images,
    id,
    handleDeleteTask,
  };
}

export default useUnitCreateHook;
