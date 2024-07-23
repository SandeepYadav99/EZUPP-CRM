import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import {
  serviceCreateProduct,
  serviceUpdateProduct,
  serviceDeleteProduct,
  serviceGetProductDetails,
} from "../../../services/Product.service";
import {
  serviceGetTagList,
  serviceGetUnitsList,
} from "../../../services/index.services";
import history from "../../../libs/history.utils";

function useProductCreateHook() {
  const initialForm = {
    name: "",
    duration: "",
    staff_ids: [],
    tax_slab: "",
    hsn_code: "",
    type: "",
    currency: "",
    reminder_days: "",
    full_price: "",
    discounted_price: "",
    description: "",
    is_active: true,
  };

  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [images, setImages] = useState(null);
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listData, setListData] = useState({
    UNITS: [],
  });

  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    (() => {
      Promise.allSettled([
        serviceGetUnitsList(["UNITS"]),
        serviceGetTagList({
          query: "",
          type: "PRODUCT",
        }),
      ]).then((promises) => {
        const unitList = promises[0]?.value?.data;
        const tagList = promises[1]?.value?.data;
        setListData(unitList);
        setTagList([...tagList]);
      });
    })();
  }, []);

  useEffect(() => {
    if (id) {
      serviceGetProductDetails({ id }).then((res) => {
        if (!res.error) {
          const details = res.data.details;
          const obj = {};
          Object.keys({ ...initialForm })?.forEach((key) => {
            obj[key] = details[key] || "";
          });
          setForm({
            ...form,
            ...obj,
          });
        }
      });
    }
  }, [id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", "duration", "currency", "full_price"];
    required.forEach((val) => {
      if (
        (!form?.[val] && parseInt(form?.[val]) != 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      } else if (["code"].indexOf(val) < 0) {
        delete errors[val];
      }
    });

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData, setErrorData]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      if (title !== "code") {
        temp[title] = false;
        setErrorData(temp);
      }
    },
    [setErrorData, errorData]
  );

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      if (
        [
          "duration",
          "tax_slab",
          "reminder_days",
          "full_price",
          "discounted_price",
        ]?.includes(fieldName)
      ) {
        if (text >= 0) {
          t[fieldName] = text;
        }
      } else if (fieldName === "name") {
        if (text?.length <= 100) {
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
  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      let req;
      const data = { ...form };
      if (id) {
        data.id = id;
        req = serviceUpdateProduct({ ...data });
      } else {
        req = serviceCreateProduct({ ...data });
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
  }, [form, isSubmitting, setIsSubmitting]);

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

  const handleCancel = useCallback(() => {
    history.push("/products");
  }, []);

  const handleDelete = useCallback((id) => {
    if (id) {
      const formattedId = String(id);
      const response = serviceDeleteProduct({ id: formattedId });

      if (!response.error) {
        console.log(`Product with id: ${formattedId} deleted successfully.`);
        window.location.reload();
      } else {
        SnackbarUtils.error(response.message);
      }
    }
  });
  return {
    form,
    errorData,
    listData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    handleDelete,
    isSubmitting,
    images,
    id,
    tagList,
    handleCancel,
  };
}

export default useProductCreateHook;
