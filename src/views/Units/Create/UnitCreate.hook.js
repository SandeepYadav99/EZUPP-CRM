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

function useUnitCreateHook() {
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
  const [tagList,setTagList] = useState([])
  useEffect(() => {
    serviceGetList(["ROLES", "UNITS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  useEffect(() => {
    serviceGetTagList({query:"a"}).then((res) => {
      if (!res.error) {
        setTagList(res.data);
      }
    });
  }, []);

  console.log(tagList, "Image");

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", "code", "type", "currency", "status"];
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
    });
    if (form?.name?.length < 2) {
      errors["name"] = true;
    }
    if (form?.code?.length < 2) {
      errors["code"] = true;
    }
    if (form?.product_link && !validateUrl(form?.product_link)) {
      SnackbarUtils.error("Please Enter the Valid Url");
      errors["product_link"] = true;
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
      if (
        fieldName === "ballpark_cost" ||
        fieldName === "ballpark_price" ||
        fieldName === "discount_value"
      ) {
        if (text >= 0) {
          t[fieldName] = text;
        }
      } else if (fieldName === "discount_percent") {
        if (text >= 0 && text <= 100) {
          t[fieldName] = text;
        }
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
        Object.keys(form).forEach((key) => {
          // if (["image"].indexOf(key) < 0) {
          //   if (key === "is_show_public" || key === "is_value_add") {
          //     fd.append(key, form[key] ? true : false);
          //   } else {
          //     fd.append(key, form[key]);
          //   }
          // }
        });
        // if (form?.image) {
        //   fd.append("image", form?.image);
        // }
        let req;
        if (id) {
          fd.append("id", id);
          req = serviceUpdateUnit(fd);
        } else {
          req = serviceCreateUnit(fd);
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
    tagList
  };
}

export default useUnitCreateHook;
