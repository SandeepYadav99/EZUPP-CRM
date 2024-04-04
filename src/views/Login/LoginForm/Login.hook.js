import React, { useCallback, useState } from "react";
import history from "../../../libs/history.utils";
import { serviceLoginUser } from "../../../services/index.services";
import { actionLoginUser } from "../../../actions/Auth.action";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import { useDispatch } from "react-redux";

const initialForm = {
  email: "",
  password: "",
  logged_in: "",
};
const useLoginHook = () => {
  const [form, setForm] = useState({ ...initialForm });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const [errorData, setErrorData] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["email", "password"];

    required.forEach((val) => {
      if (!form?.[val]) {
        errors[val] = true;
      } else {
        errors[val] = false;
      }
    });

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

  const handleForgotPassword = () => {
    history.push("/forgot/password");
  };

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

  const submitToServer = useCallback(
    (status) => {
      setIsSubmitting(true);

      delete form.logged_in;

      serviceLoginUser(form).then((res) => {
        if (!res.error) {
          dispatch(actionLoginUser(res?.data));
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    },
    [form, isSubmitting, setIsSubmitting]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = useCallback(
    async (status) => {
      const errors = checkFormValidation();
      if (Object.keys(errors)?.length > 0) {
        setErrorData(errors);
        console.log(errorData, "errorData is here");
        return true;
      }
      submitToServer(status);
    },
    [checkFormValidation, setErrorData, form, submitToServer]
  );

  return {
    handleSubmit,
    onBlurHandler,
    changeTextData,
    form,
    errorData,
    isSubmitting,
    handleForgotPassword,
    showPassword,
    togglePasswordVisibility,
  };
};

export default useLoginHook;
