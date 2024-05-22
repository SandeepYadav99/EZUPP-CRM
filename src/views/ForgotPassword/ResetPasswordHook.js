/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import SnackbarUtils from "../../libs/SnackbarUtils";
import { serviceResetProfilePassword } from "../../services/index.services";

const initialForm = {
  password: "",
  confirm_password: "",
};

const useResetPasswordHook = ({ open, email, handleClose }) => {
  const [isLoading] = useState(false);

  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });

  const [listData, setListData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  useEffect(() => {
    if (!open) {
      handleReset();
    }
  }, [open]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["password", "confirm_password"];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if (["code"].indexOf(val) < 0) {
        delete errors[val];
      }
    });
    if (form?.password && form.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (form.confirm_password && form.password !== form.confirm_password) {
      errors.confirm_password = "Password doesn't match";
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const submitToServer = useCallback(async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);
    try {
      const formData = {
        confirm_password: form?.confirm_password,
        password: form?.password,
        email: email,
      };
      const serviceFunction = serviceResetProfilePassword;
      const res = await serviceFunction(formData);
      if (!res.error) {
        handleClose();
        SnackbarUtils.success("Password Changed Successfully");
      } else {
        SnackbarUtils.error(res.message);
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }, [form, isSubmitting, setIsSubmitting]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();

    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
    } else {
      await submitToServer();
    }
  }, [checkFormValidation, setErrorData, form, submitToServer]);

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
      if (fieldName === "password") {
        t[fieldName] = text;
      } else {
        t[fieldName] = text;
      }

      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  
  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
    setErrorData({});
    setShowConfirmPassword(false);
    setShowPassword(false);
  }, [form, setForm]);

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isLoading,
    isSubmitting,
    listData,
    errorData,
    showConfirmPassword,
    showPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  };
};

export default useResetPasswordHook;
