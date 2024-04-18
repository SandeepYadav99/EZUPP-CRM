import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import {
  serviceCreateProduct,
  serviceUpdateProduct,
} from "../../../services/Product.service";
import { serviceGetList } from "../../../services/index.services";

function useProductCreateHook() {
  const initialForm = {
    name: "name",
    code: "code",
    product_link: "product_link",
    tags: [],
    description: "description",
    image: "",
    unit_id: "kg",
    currency: "",
    ballpark_cost: "",
    ballpark_price: "",
    discount_percent: "",
    discount_value: "",
    type: "",
    status: "",
    is_show_public: false,
    is_value_add: false,
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

  useEffect(() => {
    serviceGetList(["ROLES", "UNITS"]).then((res) => {
      if (!res.error) {
        setListData(res.data);
      }
    });
  }, []);

  // serviceGetTags;
  // useEffect(() => {
  //   if (id) {
  //     serviceGetProviderUserDetail({ id: id }).then((res) => {
  //       if (!res.error) {
  //         const data = res?.data;

  //         const formData = {
  //           ...form,
  //           name: data?.name,
  //           code: data?.code,
  //           product_link: data?.product_link,
  //           description: data?.description,
  //           ballpark_cost: data?.ballpark_cost,
  //           ballpark_price: data?.ballpark_price,
  //           discount_percent: data?.discount_percent,
  //           discount_value: data?.discount_value,
  //           designation: data?.designation,
  //           is_show_public: data?.is_show_public?.id,
  //         };

  //         setForm(formData);
  //         setImages(data?.image);
  //       } else {
  //         SnackbarUtils.error(res?.message);
  //       }
  //     });
  //   }
  // }, [id]);
  console.log(images, "Image");

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
          if (["image"].indexOf(key) < 0) {
            if (key === "is_show_public" || key === "is_value_add") {
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
          req = serviceUpdateProduct(fd);
        } else {
          req = serviceCreateProduct(fd);
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
  };
}

export default useProductCreateHook;
