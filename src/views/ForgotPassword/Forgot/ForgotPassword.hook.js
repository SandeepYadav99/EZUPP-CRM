import React, { useCallback, useState } from "react";
import history from "../../../libs/history.utils";
import { serviceForgotPassword } from "../../../services/index.services";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useDispatch } from "react-redux";
import { isEmail } from "../../../libs/RegexUtils";

const initialForm = {
  email: "",
};
const useForgotPasswordHook = () => {
  const [form, setForm] = useState({ ...initialForm });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const [errorData, setErrorData] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["email"];

    required.forEach((val) => {
      if (!form?.[val]) {
        errors[val] = true;
      } else {
        errors[val] = false;
      }
    });
    if (!isEmail(form?.email)) {
      errors["email"] = true;
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

      serviceForgotPassword(form).then((val) => {
        if (!val?.error) {
          SnackbarUtils.success("Password Reset Email Sent");
          history.push("/password/resend",{
            emailAddress:form?.email,
          });
        } else {
          SnackbarUtils.error("Invalid Email Address");
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
        return true;
      }
      submitToServer(status);
    },
    [checkFormValidation, setErrorData, form, submitToServer]
  );

  const handleReturn = useCallback(() => {
    history.push("/login");
  }, []);

  return {
    handleSubmit,
    onBlurHandler,
    changeTextData,
    form,
    errorData,
    isSubmitting,
    showPassword,
    togglePasswordVisibility,
    handleReturn,
  };
};

export default useForgotPasswordHook;
