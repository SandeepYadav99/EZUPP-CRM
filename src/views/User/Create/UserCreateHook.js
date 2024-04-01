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

function useUserCreateHook() {
  const initialForm = {
    name: "",
    url: "",
    chapter_ids: [],
    image: "",
    name2: "",
    email: "",
    title: "",
    contact: "",
    is_active: true,
    is_access_invite: false,
    country_code: "",
    company_name: "",
    image1: "",

    // is_valid_member:false
  };
  const colorKey = ["name2", "email", "title", "contact"];
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [images, setImages] = useState(null);
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const codeDebouncer = useDebounce(form?.contact, 6000);

  const [isOpen, setIsOpen] = useState(false);
  const [listData, setListData] = useState({
    ADMIN: [],
    CITY_CHAPTERS: [],
    EVENTS: [],
    ADMIN_CHAPTERS: [],
    CHAPTERS: [],
  });

  // useEffect(() => {
  //   serviceGetList([
  //     "ADMIN",
  //     "CITY_CHAPTERS",
  //     "EVENTS",
  //     "ADMIN_CHAPTERS",
  //     "CHAPTERS",
  //   ]).then((res) => {
  //     if (!res.error) {
  //       setListData(res.data);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    if (id) {
      "serviceDetailsMemberList"({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;

          const formData = {
            ...form,
            name: data?.name,
            url: data?.url,
            chapter_ids: data?.chapters,
            is_access_invite: data?.is_access_invite,
            is_active: data?.status === Constants.GENERAL_STATUS.ACTIVE,
          };
          if (data?.primary_user?.id) {
            formData.name2 = data?.primary_user?.name;
            formData.email = data?.primary_user?.email;
            formData.title = data?.primary_user?.title;
            formData.contact = data?.primary_user?.full_contact;
            formData.company_name=data?.primary_user?.company_name
          }
          setForm(formData);
          setImages(data?.image);
        } else {
          SnackbarUtils.error(res?.message);
        }
      });
    }
  }, [id]);

  const checkCodeValidation = useCallback(() => {
    "serviceUpdateAdminUserSearch"({
      contact: form?.contact,
      id: id ? id : "",
    }).then((res) => {
      if (!res.error) {
        const data = res?.data;

        // if (data?.full_contact === form?.contact) {
        //   setIsContactInList(true);
        // }
        if (data) {
          const tForm = {
            ...form,
            contact: data?.full_contact,
            email: data?.email,
            reg_id: data?.reg_id,
            name2: data?.name,
            member_id: data?.member?.id,
            title: data?.title,
            company_name:data?.member
            ?.name
           
          };
          setForm(tForm);
        } else {
          if (data?.contact !== form?.contact) {
            // setIsContactInList(false);
          }
          setForm({
            ...form,
            id: "",
          });
        }
      }
    });
  }, [form, id, form?.contact]);

  useEffect(() => {
    if (codeDebouncer) {
      checkCodeValidation();
    }
  }, [codeDebouncer]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name",  "name2", "email", "contact", "title"];
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
      // if (val === "contact" && form?.contact) {
      //   const phoneNumber = parsePhoneNumber(
      //     "+" + form?.contact)
      //   );

    //     if (phoneNumber) {
    //       if (phoneNumber.isValid() === false) {
    //         errors.contact = "Invalid Number";
    //       }
    //     } else {
    //       errors.contact = "Invalid Number";
    //     }
    //   }
     });

    if (form?.email && !isEmail(form?.email)) {
      errors.email = true;
    }
    if (form?.url && !validateUrl(form?.url)) {
      errors.url = true;
      SnackbarUtils.error("Please Enter the Valid Url");
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
        t[fieldName] = text;
      } else if (fieldName === "contact") {
        t[fieldName] = text;
      } else {
        t[fieldName] = text;
      }

      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const submitToServer = useCallback(
    (status) => {
      if (!isSubmitting) {
        setIsSubmitting(true);
        const fd = new FormData();

        const relatedId =
          Array.isArray(form.chapter_ids) && form.chapter_ids.length > 0
            ? form.chapter_ids.map((item) => item.id)
            : [];
        form.chapter_ids = relatedId;
        const themeData = {};

        for (const prop in form) {
          if (colorKey.includes(prop)) {
            if (prop === "name2") {
              themeData["name"] = form[prop];
            } else if (prop === "contact") {
              themeData[prop] = `${form[prop]}`;
            } else {
              themeData[prop] = form[prop];
            }
            delete form[prop];
          }
        }
        if (id) {
          fd.append("id", id);
        }
        form.member_users = themeData;
        Object.keys(form).forEach((key) => {
          if (["chapter_ids", "member_users"].includes(key)) {
            fd.append(key, JSON.stringify(form[key]));
          } else {
            fd.append(key, form[key]);
          }
        });
        fd.delete("country_code");
        let req;
        if (id) {
          req = "serviceUpdateMemberList"(fd);
        } else {
          req = "serviceCreateMemberList"(fd);
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
  };
}

export default useUserCreateHook;
