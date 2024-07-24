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
    image: "",
    contact: "",
    email: "",
    role: "",
    type: "",
    employee_id: "",
    joining_date: "",
    manager: "",
    end_date: "",
    manager_id: false,
    invoiteToUser: false,
    status: "",
  };

  const [form, setForm] = useState({ ...initialForm });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [listData, setListData] = useState({
    ROLES: [],
    MANAGERS: [],
  });

  const { id } = useParams();

  console.log("form", form);

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

          const formData = {
            ...form,
            name: data?.name,
            user_name: data?.user_name,
            contact: data?.contact,
            email: data?.email,
            role: data?.role?.id,
            employee_id: data?.employee_id,
            joining_date: data?.joining_date,
            manager: data?.manager?.id,
            end_date: data?.exit_date,
            manager_id: data?.is_manager,
            invoiteToUser: data?.is_primary_user,
            status: data?.status,
          };

          setForm(formData);
        } else {
          SnackbarUtils.error(res?.message);
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
        if (phoneNumber) {
          if (phoneNumber?.isValid() === false) {
            errors.contact = true;
            SnackbarUtils.error("Invalid contact");
          }
        } else {
          errors.contact = true;
          SnackbarUtils.error("Invalid contact");
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
    if (form?.designation && form?.designation?.trim().length < 2) {
      errors.designation = true;
    }
    if (form?.email && !isEmail(form?.email)) {
      errors.email = true;
    }

    if (form?.joining_date && form?.end_date) {
      const joinDate = new Date(form?.joining_date).getTime();
      const endDate = new Date(form?.end_date).getTime();

      if (joinDate > endDate) {
        errors.end_date = SnackbarUtils.error(
          "Joining date should not be greater than end date"
        );
        errors.end_date = true;
      }
    }

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData, form?.country_code]);
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

  const submitToServer = useCallback(
    (status) => {
      if (isSubmitting) {
        setIsSubmitting(true);
        const fd = new FormData();

        const formDataFields = {
          name: form?.name,
          image: form?.image,
          contact: form?.contact,
          email: form?.email,
          user_name: form?.user_name,
          is_primary_user: true,
          status: form?.status,
          // email_send: form?.invoiteToUser,
          country_code: 91,
        };

        for (const field in formDataFields) {
          if (formDataFields.hasOwnProperty(field)) {
            fd.append(field, formDataFields[field]);
          }
        }

        let req;
        if (id) {
          fd.append("id", id);
          // fd.append("image", images ? images : null);
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
    },
    [form, checkFormValidation, setErrorData]
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
    // images,
    id,
  };
}

export default useAdminUserCreateHook;
