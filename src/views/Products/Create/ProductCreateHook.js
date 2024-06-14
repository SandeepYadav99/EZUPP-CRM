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
  serviceProductCheck,
  serviceGetProductDetails
} from "../../../services/Product.service";
import {
  serviceGetTagList,
  serviceGetUnitsList,
} from "../../../services/index.services";
import { validateUrl } from "../../../libs/RegexUtils";
import history from "../../../libs/history.utils";
import useDebounce from "../../../hooks/DebounceHook";

function useProductCreateHook() {
  const initialForm = {
    name: "",
    code: "",
    product_link: "",
    tags: [],
    description: "",
    image: null,
    unit_id: "",
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
    UNITS: [],
  });

  const [tagList, setTagList] = useState([]);
  const codeDebouncer = useDebounce(form?.code, 500);

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
          const obj ={}
          Object.keys({...initialForm})?.forEach((key)=>{
            if(key !== "image"){
              obj[key] = details[key]
            }
          })
          setForm({
            ...form,
            ...obj
          })
          setImages(details?.image);
        
        } 
      });
    }
  
    
  }, [id]);

  const checkCodeValidation = useCallback(() => {
    serviceProductCheck({ code: form?.code , id:id ? id : null }).then((res) => {
      if (!res.error) {
        const errors = JSON.parse(JSON.stringify(errorData));
        if (res.data.is_exists) {
          errors["code"] = "Department Code Exists";
          setErrorData(errors);
        } else {
          delete errors.code;
          setErrorData(errors);
        }
      }
    });
  }, [errorData, setErrorData, form?.code, id]);

  useEffect(() => {
    if (codeDebouncer) {
      checkCodeValidation();
    }
  }, [codeDebouncer]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", "code", "type", "currency", "status", "unit_id"];
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
    if (form.discount_value > form.ballpark_price) {
      SnackbarUtils.error(
        "Discount value should not be greater than Ballpark price value"
      );
      errors["discount_value"] = true;
    }
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
      if(title !== "code"){
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
        ["ballpark_cost", "ballpark_price", "discount_value"]?.includes(
          fieldName
        )
      ) {
        if (text >= 0) {
          t[fieldName] = text;
        }
      } else if (fieldName === "discount_percent") {
        if (text >= 0 && text <= 100) {
          t[fieldName] = text;
        }
      } else if (fieldName === "code") {
        if (text?.length <= 40) {
          t[fieldName] = text;
        }
      } else if (fieldName === "name") {
        if (text?.length <= 100) {
          t[fieldName] = text;
        }
      } else if (fieldName === "tags") {
        const tempKeywords = text?.filter((val, index) => {
          if (val?.trim() === "") {
            return false;
          } else if (val?.length <= 2 || val?.length > 20) {
            SnackbarUtils.error(
              "Values cannot be less than 2 and more than 20 character"
            );
            return false;
          } else {
            const key = val?.trim().toLowerCase();
            const isThere = text?.findIndex(
              (keyTwo, indexTwo) =>
                keyTwo?.toLowerCase() === key && index !== indexTwo
            );
            return isThere < 0;
          }
        });
        console.log("tempKeywords", tempKeywords);
        t[fieldName] = tempKeywords;
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
            if (res.message.includes("Code already exists")) {
              setErrorData((prev) => ({ ...prev, code: true }));
            }
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
    [changeTextData, checkCodeValidation]
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
