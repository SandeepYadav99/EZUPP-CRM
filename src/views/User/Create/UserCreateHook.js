import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import {
  HexCodeValid,
  isAlphaNumChars,
  isDate,
  isEmail,
  validateUrl,
} from "../../../libs/RegexUtils";
import { useParams } from "react-router";

import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";

import Constants from "../../../config/constants";
import { parsePhoneNumber } from "libphonenumber-js";

import useDebounce from "../../../hooks/DebounceHook";
import {
  serviceCreateProviderUser,
  serviceGetProviderUserDetail,
  serviceProfileManager,
  serviceProviderIsExist,
  serviceProviderProfileGetKeyword,
  serviceUpdateProviderUser,
} from "../../../services/ProviderUser.service";
import { serviceGetList } from "../../../services/index.services";

function useUserCreateHook() {
  const initialForm = {
    name: "",
    userName: "",
    image: "",
    contact: "",
    email: "",
    role: "",
    type: "",
    employee_id: "",
    // password: "1231231admin",
    joining_date: "",
    department: "",
    designation: "",
    manager: "",
    end_date: "",
    userManage: false,
    invoiteToUser: false,
  };

  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [images, setImages] = useState(null);
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const emailDebouncer = useDebounce(form.email, 500);
  const empIdDebouncer = useDebounce(form.employee_id, 500);
  const [manager, setManager] = useState([]);
  const [department, setDepartment] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [listData, setListData] = useState({
    ROLES: [],
  });

  
  useEffect(() => {
    serviceGetList(["ROLES"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);


  useEffect(() => {
    serviceProfileManager({}).then((res) => {
      if (!res?.error) {
        const data = res?.data;
        setManager(data);
      }
    });
  }, []);

  useEffect(() => {
    serviceProviderProfileGetKeyword({}).then((res) => {
      if (!res?.error) {
        const data = res?.data;
        setDepartment(data);
      }
    });
  }, []);

  const validateField = useCallback(
    (field, values, errorKey, existsMessage) => {
      serviceProviderIsExist({ [field]: values, id: id || null }).then(
        (res) => {
          if (!res.error) {
            const errors = { ...errorData };
            if (res.data.is_exists) {
              errors[errorKey] = existsMessage;
            } else {
              delete errors[errorKey];
            }
            setErrorData(errors);
          }
        }
      );
    },
    [errorData, setErrorData, id]
  );

  const checkCodeValidation = useCallback(() => {
    validateField("email", form.email, "email", "Admin User Email Exists");
  }, [form.email, id]);

  const checkEmpIdValidation = useCallback(() => {
    validateField(
      "employee_id",
      form.employee_id,
      "employee_id",
      "Admin User Employee Id Exists"
    );
  }, [form.employee_id, id]);

  useEffect(() => {
    if (emailDebouncer) checkCodeValidation();
  }, [emailDebouncer]);

  useEffect(() => {
    if (empIdDebouncer) checkEmpIdValidation();
  }, [empIdDebouncer]);

  useEffect(() => {
    if (id) {
      
      serviceGetProviderUserDetail({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data;

          const formData = {
            ...form,
            name: data?.name,

            userName: data?.user_name,

            contact: data?.contact,
            email: data?.email,
            role: data?.role?.id,
            // type: string;
            employee_id: data?.employee_id,
            joining_date: data?.joining_date,
            department: data?.department,
            designation: data?.designation,
            manager: data?.manager?.id,
            end_date: data?.exit_date,
            userManage: data?.is_manager,

            invoiteToUser: data?.is_primary_user,

            // is_access_invite: data?.is_access_invite,
            // is_active: data?.status === Constants.GENERAL_STATUS.ACTIVE,
          };

          setForm(formData);
          setImages(data?.image);
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [id]);
console.log(images, "Image")
  // const checkCodeValidation = useCallback(() => {
  //   "serviceUpdateAdminUserSearch"({
  //     contact: form?.contact,
  //     id: id ? id : "",
  //   }).then((res) => {
  //     if (!res.error) {
  //       const data = res?.data;

  //       // if (data?.full_contact === form?.contact) {
  //       //   setIsContactInList(true);
  //       // }
  //       if (data) {
  //         const tForm = {
  //           ...form,
  //           contact: data?.full_contact,
  //           email: data?.email,
  //           reg_id: data?.reg_id,
  //           name2: data?.name,
  //           member_id: data?.member?.id,
  //           title: data?.title,
  //           company_name:data?.member
  //           ?.name

  //         };
  //         setForm(tForm);
  //       } else {
  //         if (data?.contact !== form?.contact) {
  //           // setIsContactInList(false);
  //         }
  //         setForm({
  //           ...form,
  //           id: "",
  //         });
  //       }
  //     }
  //   });
  // }, [form, id, form?.contact]);

  // useEffect(() => { 
  //   if (codeDebouncer) {
  //     checkCodeValidation();
  //   }
  // }, [codeDebouncer]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "name",
      "email",
      "contact",
      "userName",
      // "role",
      "employee_id",
      "joining_date",
      "department",
      "designation",
      "manager",
      "end_date",
    ];
    if (!id) {
      required.push("image");
    }
    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) != 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      }
      if (val === "contact" && form?.contact) {
        const phoneNumber = parsePhoneNumber(form?.contact);

        if (phoneNumber) {
          if (phoneNumber.isValid() === false) {
            errors.contact = "Invalid Number";
          }
        } else {
          errors.contact = "Invalid Number";
        }
      }
    });

    if (form?.email && !isEmail(form?.email)) {
      errors.email = true;
    }
    // if (form?.url && !validateUrl(form?.url)) {
    //   errors.url = true;
    //   SnackbarUtils.error("Please Enter the Valid Url");
    // }
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
        t[fieldName] = text;
      } else if (fieldName === "contact") {
        t[fieldName] = text;
      } else if (fieldName === "userName") {
        t[fieldName] = text;
      } else if (fieldName === "email") {
        t[fieldName] = text;
      } else if (fieldName === "contact") {
        t[fieldName] = text;
      } else if (fieldName === "role") {
        t[fieldName] = text;
      } else if (fieldName === "department") {
        t[fieldName] = text;
      } else {
        t[fieldName] = text;
      }

      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );
  console.log(form, "Form");
  const submitToServer = useCallback(
    (status) => {
      if (!isSubmitting) {
        setIsSubmitting(true);
        const fd = new FormData();

        const formDataFields = {
          name: form?.name,
          image: form?.image,
          contact: form?.contact,
          role_id: form?.role,
          email: form?.email,
          employee_id: form?.employee_id,
          joining_date: form?.joining_date,
          exit_date: form?.end_date,
          department: form?.department,
          designation: form?.designation,
          manager: form?.manager,
          user_name: form?.userName,
          is_primary_user: true,
          is_manager: form?.userManage,
          email_send:form?.invoiteToUser,
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
          setIsSubmitting(false);
        });
      }
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
    // isContactInList,
    isOpen,
    manager,
    department,
  };
}

export default useUserCreateHook;
