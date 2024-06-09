import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import {
  serviceCreateProduct,
  serviceUpdateProduct,
  serviceDeleteProduct
} from "../../../services/Product.service";
import { actionDeleteProduct} from "../../../actions/Product.action";
import {
  serviceGetList,
  serviceGetTagList,
  serviceGetUnitsList,
} from "../../../services/index.services";
//import {serviceGetUnitList} from "../../../services/Unit.service";
import { validateUrl } from "../../../libs/RegexUtils";
import { useDispatch, useSelector } from "react-redux";
import history from "../../../libs/history.utils";

function useProductCreateHook() {
  const initialForm = {
    name: "",
    code: "",
    product_link: "",
    tags: [],
    description: "",
    image: "",
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
  const [tagList,setTagList] = useState([])
  const dispatch = useDispatch();
  const [editData, setEditData] = useState(null);
  
  useEffect(() => {
    serviceGetUnitsList(["UNITS"]).then((res) => {
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
    let required = ["name", "code", "type", "currency", "status", "unit_id"];
    // if (!id) {
    //   required.push("image");
    // }
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
    if (form.discount_value > form.ballpark_price) {
      errors["discount_value"] = "Discount price value should not be greater than Ballpark price value";
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
        if (fieldName === "discount_value" && text > t.ballpark_price) {
          setErrorData((prevErrors) => ({
            ...prevErrors,
            discount_value: "Discount value should not be greater than Ballpark price value",
          }));
          shouldRemoveError = false;
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
  // const handleDelete = useCallback(
  //   (id) => {
  //     dispatch(actionDeleteProduct(id));
  //     setEditData(null);
  //   },
  //   [setEditData]
  // );
  const handleDelete = useCallback(
    async (id) => {
      if (id) {

        const formattedId = String(id);
  
        try {
          const response = await serviceDeleteProduct({ id: formattedId });
  
          if (!response.error) {
            console.log(`Product with id: ${formattedId} deleted successfully.`);
            window.location.reload();
          } else {
            SnackbarUtils.error(response.message);
          }
        } catch (error) {
          console.error('Error deleting unit:', error);
        }
      }
    },
    
  );
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
