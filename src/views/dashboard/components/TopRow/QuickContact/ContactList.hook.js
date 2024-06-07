import React, { useState } from "react";
import { useCallback, useEffect } from "react";
import { cleanContactNumber, companyList } from "../../../../../helper/Helper";
import { sourceList } from "../../../../../helper/Helper";
import { leadOwnerList } from "../../../../../helper/Helper";
import { serviceGetTagsList } from "../../../../../services/Blogs.service";
import { serviceGetList } from "../../../../../services/index.services";
import { isEmail } from "../../../../../libs/RegexUtils";
import { serviceCreateContactQuick } from "../../../../../services/Contact.service";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import historyUtils from "../../../../../libs/history.utils";

const initialForm = {
  contact_type: "BUSINESS",
  contact: "",
  email: "",
  full_name: "",
  prefix_type: "",
  job_title: "",
  buying_role: "",
  service_product: [],
  company: "",
  tags: [],
  source: "",
  contact_owner: "",
  lead_stage_type: "",
  is_lead_owner_task: false,
};
function useContactList({ isOpen, handleToggle }) {
  const [showBusiness, setShowBusiness] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [isVerified, setIsVerified] = useState(false);
  const [resData, setResData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companylistData, setCompanyListData] = useState([]);
  const [associateTagsData, setAssociateTagsData] = useState([]);
  const [sourceData, setSorceData] = useState([]);
  const [LeadOwnerData, setLeadOwnerData] = useState([]);
  const [listData, setListData] = useState({
    PRODUCTS: [],
  });
  useEffect(() => {
    if (isOpen) {
      setForm({ ...initialForm });
      setResData([]);
      setIsSubmitted(false);
      setIsVerified(false);
      setErrorData({});
      setCompanyListData([...companyList]);
      setSorceData([...sourceList]);
      setLeadOwnerData([...leadOwnerList]);
    }
  }, [isOpen]);

  useEffect(() => {
    (async () => {
      const promises = await Promise.allSettled([
        serviceGetTagsList(),
        serviceGetList(["PRODUCTS"]),
      ]);
      const tagList = promises[0].value?.data;
      const ProductList = promises[1].value?.data;
      setAssociateTagsData([...tagList]);
      setListData(ProductList);
    })();
  }, []);

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
      if (fieldName === "contact_type") {
        if (text === "INDIVIDUAL") {
          t["job_title"] = "";
          t["buying_role"] = "";
          t["company"] = "";
        }
        t[fieldName] = text;
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
      setIsVerified(false);
    },
    [removeError, form, setForm, setIsVerified]
  );
  const checkFormValidation = useCallback(() => {
    const errors = {};

    let required = [
      "contact",
      "email",
      "full_name",
      "prefix_type",
      "service_product",
      // "buying_role",
      // "job_title",
      // "company",
      "tags",
      "source",
      "contact_owner",
      "lead_stage_type",
    ];
    if (form?.contact_type === "BUSINESS") {
      required.push(...["buying_role", "job_title", "company"]);
    }
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if ([].indexOf(val) < 0) {
        delete errors[val];
      }
    });
    if (form?.email && !isEmail(form?.email)) {
      errors.email = true;
    }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const updatedFd = {};
      Object.keys({ ...initialForm }).forEach((key) => {
        if (key === "service_product") {
          const getId =
            form[key]?.length > 0 ? form[key]?.map((item) => item?.id) : [];
          updatedFd[key] = getId;
        } else if (key === "tags") {
          updatedFd[key] = form[key]?.length > 0 ? form[key]?.join(",") : "";
        } else {
          updatedFd[key] = form[key];
        }
      });
      console.log(">>>>>", { updatedFd, form });
      const contactWithCD = cleanContactNumber(form?.contact);
      console.log("contactWithCD", contactWithCD);
      serviceCreateContactQuick({
        ...updatedFd,
        contact: `${cleanContactNumber(form?.contact)}`,
      }).then((res) => {
        if (!res.error) {
          SnackbarUtils.success("Request Approved");
          historyUtils.goBack();
          // historyUtils.push(RouteName.CLAIMS_LIST);
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle]);
  console.log("form", form);
  const handleSubmit = useCallback(() => {
    const errors = checkFormValidation();
    console.log("===?", form, errors);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, submitToServer]);

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData, form]
  );

  return {
    showBusiness,
    setShowBusiness,
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    errorData,
    isSubmitting,
    resData,
    isSubmitted,
    isVerified,
    companylistData,
    associateTagsData,
    sourceData,
    LeadOwnerData,
    showImage,
    setShowImage,
    listData,
  };
}
export default useContactList;
