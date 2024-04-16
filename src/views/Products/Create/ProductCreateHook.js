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

function useProductCreateHook() {
  const initialForm = {
    name: "",
    productCode: "",
    productLink: "",
    associateTags: "",
    description: "",
    image: "",

    ballparkCost: "",
    ballparkPrice: "",
    discountPercent: "",
    discountValue: "",

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
    valueAdd: false,
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
    if (id) {
      serviceGetProviderUserDetail({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data;

          const formData = {
            ...form,
            name: data?.name,

            productCode: data?.productCode,
            productLink: data?.productLink,
            description: data?.description,
            ballparkCost: data?.ballparkCost,
            ballparkPrice: data?.ballparkPrice,
            discountPercent: data?.discountPercent,
            discountValue: data?.discountValue,
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
  console.log(images, "Image");

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "name",
      "email",
      "contact",
      "productCode",
      // "productLink",
      "role",
      "valueAdd",
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

export default useProductCreateHook;
