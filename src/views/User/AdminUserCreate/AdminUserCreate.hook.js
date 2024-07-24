import React, { useCallback, useEffect, useMemo } from "react";
import { useState } from "react";
import { isAlphaNum, isEmail, isSpace } from "../../../libs/RegexUtils";
import { useParams } from "react-router";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import parsePhoneNumberFromString from "libphonenumber-js";
import {
  serviceCreateProviderUser,
  serviceGetProviderUserDetail,
  serviceProviderIsExist,
  serviceUpdateProviderUser,
} from "../../../services/ProviderUser.service";
import { serviceGetList } from "../../../services/index.services";
import debounce from "lodash.debounce";

function useAdminUserCreateHook() {
  const initialForm = {
    name: "",
    user_name: "",
    image: null,
    contact: "",
    email: "",
    role_id: "",
    type: "",
    employee_id: "",
    joining_date: "",
    exit_date: "",
    manager_id: "",
    is_login_access: false,
    send_email: false,
    is_manager: false,
    status: "",
  };

  const [form, setForm] = useState({ ...initialForm });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [image, setImage] = useState("");
  const [listData, setListData] = useState({
    ROLES: [],
    MANAGERS: [],
  });

  const { id } = useParams();

  useEffect(() => {
    serviceGetList(["ROLES", "MANAGERS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  useEffect(() => {
    if (id) {
      serviceGetProviderUserDetail({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data;
          const obj = {};
          Object.keys({ ...initialForm })?.forEach((key) => {
            if (
              ["is_login_access", "send_email", "is_manager"]?.includes(key)
            ) {
              obj[key] = data[key] ? true : false;
            } else if (key === "contact") {
              const value = `+${data?.country_code} ${data?.contact}`;
              obj[key] = value || "";
            } else {
              obj[key] = data[key] || "";
            }
          });
          setForm({
            ...obj,
            image: null,
          });
          setImage(data?.image);
        }
      });
    }
  }, [id]);
  const checkForUserInfo = useCallback(
    (data, fieldName, errorArr) => {
      if (data) {
        let filteredForm = {};
        if (id) {
          filteredForm.id = id;
        }
        if (fieldName === "user_name") {
          filteredForm["user_name"] = data;
        } else {
          filteredForm[fieldName] = data;
        }
        let req = serviceProviderIsExist({
          ...filteredForm,
        });
        req.then((res) => {
          if (!res.error) {
            const errors = JSON.parse(JSON.stringify(errorArr));
            if (res.data.is_exists) {
              if (fieldName === "employee_id") {
                errors[fieldName] = `Employee code already exist`;
              }
              if (fieldName === "email") {
                errors[fieldName] = `Email already exist`;
              }
              if (fieldName === "user_name") {
                errors[fieldName] = `Username already exists`;
              }
              setErrorData(errors);
            } else {
              delete errors[fieldName];
              setErrorData(errors);
            }
          }
        });
      }
    },
    [id]
  );

  const checkUserInfoDebouncer = useMemo(() => {
    return debounce((e, fieldName, errorArr) => {
      checkForUserInfo(e, fieldName, errorArr);
    }, 1000);
  }, [checkForUserInfo]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", "email", "contact", "user_name", "status"];
    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) != 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      }

      if (val === "contact" && form?.contact) {
        const phoneNumber = parsePhoneNumberFromString(form.contact);
        console.log("phoneNumber", phoneNumber);
        if (phoneNumber) {
          if (!phoneNumber?.isValid()) {
            errors.contact = true;
            SnackbarUtils.error("Invalid contact");
          }
        }
      }
    });

    if (form?.name && form?.name?.trim().length < 2) {
      errors.name = true;
    }
    if (form?.user_name && form?.user_name?.trim().length < 2) {
      errors.user_name = true;
    }
    if (form?.employee_id?.trim().length < 2) {
      errors.employee_id = true;
    }

    if (form?.email && !isEmail(form?.email)) {
      errors.email = true;
    }

    if (form?.joining_date && form?.exit_date) {
      const joinDate = new Date(form?.joining_date).getTime();
      const endDate = new Date(form?.exit_date).getTime();

      if (joinDate > endDate) {
        errors.exit_date = SnackbarUtils.error(
          "Joining date should not be greater than end date"
        );
        errors.exit_date = true;
      }
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
      if (fieldName === "name") {
        if (!text || text.length <= 40) {
          t[fieldName] = text?.trimStart();
        }
      } else if (fieldName === "user_name") {
        if (!text || (isAlphaNum(text) && text?.length <= 20)) {
          t[fieldName] = text?.toLowerCase()?.trimStart();
        }
      } else if (fieldName === "email") {
        if (text?.length <= 70) {
          t[fieldName] = text;
        }
      } else if (fieldName === "employee_id") {
        if (!text || (!isSpace(text) && text?.length <= 20)) {
          t[fieldName] = text;
        }
      } else {
        t[fieldName] = text;
      }
      if (["email", "employee_id", "user_name"].includes(fieldName)) {
        checkUserInfoDebouncer(text, fieldName, errorData);
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const fd = new FormData();
      Object.keys(form).forEach((key) => {
        if (["image"].indexOf(key) < 0 && form[key]) {
          if (key === "contact") {
            const phoneNumber = parsePhoneNumberFromString(form?.contact);
            fd.append("country_code", phoneNumber?.countryCallingCode);
            fd.append("contact", phoneNumber?.nationalNumber);
          } else if (
            ["is_login_access", "send_email", "is_manager"]?.includes(key)
          ) {
            fd.append(key, form[key] ? true : false);
          } else {
            fd.append(key, form[key]);
          }
        }
      });
      if (form?.image) {
        fd.append("image", form?.image);
      }

      let req;
      if (id) {
        fd.append("id", id);
        req = serviceUpdateProviderUser(fd);
      } else {
        req = serviceCreateProviderUser(fd);
      }
      req.then((res) => {
        if (!res.error) {
          historyUtils.goBack();
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
      setIsSubmitting(false);
    }
  }, [form, setForm, checkFormValidation, setErrorData]);

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
      submitToServer();
    },
    [checkFormValidation, setErrorData, form, setForm, submitToServer]
  );

  return {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    image,
    id,
  };
}

export default useAdminUserCreateHook;
