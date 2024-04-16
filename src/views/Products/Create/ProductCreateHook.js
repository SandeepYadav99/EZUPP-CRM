import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import { useParams } from "react-router";

import SnackbarUtils from "../../../libs/SnackbarUtils";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import {
  serviceCreateProviderUser,
  serviceGetProviderUserDetail,
  serviceUpdateProviderUser,
} from "../../../services/ProviderUser.service";
import { serviceGetList } from "../../../services/index.services";

function useProductCreateHook() {
  const initialForm = {};
const defaultPropertyValue = "";
const properties = [
  'name',
  'productCode',
  'productLink',
  'associateTags',
  'description',
  'image',
  'ballparkCost',
  'ballparkPrice',
  'discountPercent',
  'discountValue',
  'role',
  'type',
  'manager',
  'valueAdd'
];
properties.forEach(property => {
  initialForm[property] = defaultPropertyValue;
});
initialForm['valueAdd'] = false;

  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [images, setImages] = useState(null);
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [manager, setManager] = useState([]);
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
            role: data?.role?.id,
            designation: data?.designation,
            manager: data?.manager?.id,
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
      "productCode",
      "role",
      "valueAdd",
      "department",
      "designation",
      "manager",
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
      // const fieldsToUpdate = ["name", "productCode", "productLink", "associateTags", "description", "ballparkCost", "ballparkPrice", "discountPercent", "discountValue",  "role"];
      const updateField = {
        "name": "name",
        "contact": "contact",
        "productCode": "productCode",
        "productLink": "productLink",
        "associateTags": "associateTags",
        "description": "description",
        "ballparkCost": "ballparkCost",
        "ballparkPrice": "ballparkPrice",
        "discountPercent": "discountPercent",
        "discountValue": "discountValue",
        "email": "email",
        "role": "role",
        "department": "department",
      };
       const t = { ...form };
      // fieldsToUpdate.forEach(fieldName => {
      //   t[fieldName] = text;
      // });
      if (updateField.hasOwnProperty(fieldName)) {
        t[updateField[fieldName]] = text;
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
    manager,
  };
}

export default useProductCreateHook;
