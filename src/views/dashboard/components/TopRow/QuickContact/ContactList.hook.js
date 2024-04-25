import React, { useState } from "react";
import { useCallback ,useEffect } from "react";
import {companyList} from "../../../../../helper/Helper";
import {associateTagsList} from "../../../../../helper/Helper";
import {sourceList} from "../../../../../helper/Helper";
import {leadOwnerList} from "../../../../../helper/Helper";

const initialForm = {
  country:'',
  userPhone:'',
    email: "",
    fullName:"",
    prefixType:'',
    jobTitle:"",
    BusinessType:'',
    interested_in_type:"",
    company_name_list:null,
    Associate_tags_list:[],
    source:null,
    leadOwner:null,
    leadStageType:'',
    is_initial_task:false
  };
function useContactList({ isOpen, handleToggle}) {
  const [showBusiness, setShowBusiness] = useState(true);
  const [showImage,setShowImage]=useState(false);
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [isVerified, setIsVerified] = useState(false);
  const [resData, setResData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [declaration, setDeclaration] = useState(false);
  const [companylistData, setCompanyListData] = useState([]);
  const [associateTagsData,setAssociateTagsData]=useState([]);
  const [sourceData,setSorceData]=useState([]);
  const [LeadOwnerData,setLeadOwnerData]=useState([]);
  useEffect(() => {
    if (isOpen) {
      setForm({ ...initialForm });
      setResData([]);
      setIsSubmitted(false);
      setIsVerified(false);
      setErrorData({});
      setCompanyListData([...companyList])
      setAssociateTagsData([...associateTagsList])
      setSorceData([...sourceList])
      setLeadOwnerData([...leadOwnerList])
    }
  }, [isOpen]);
  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );
  console.log("form", form);
  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      t[fieldName] = text;
      setForm(t);
      shouldRemoveError && removeError(fieldName);
      setIsVerified(false);
    },
    [removeError, form, setForm, setIsVerified]
  );
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
   
    let required = [
      "country",
      "userPhone",
      "email",
      "fullName",
      "prefixType",
      "BusinessType",
      "interested_in_type",
      "jobTitle",
      "company_name_list",
      " Associate_tags_list",
      "source",
      "leadOwner",
      "leadStageType",
    
    ];
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
      //   serviceApproveCLaim({
      //     review_id: candidateId,
      //     ...form,
      //   }).then((res) => {
      //     if (!res.error) {
      //       SnackbarUtils.success("Request Approved");
      //       historyUtils.goBack();
      //       // historyUtils.push(RouteName.CLAIMS_LIST);
      //       handleToggle();
      //       SnackbarUtils.success("Request Approved");
      //     } else {
      //       SnackbarUtils.error(res?.message);
      //     }
      setIsSubmitting(false);
      //   });
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle]);
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
    [changeTextData]
  );

  const handleBusinessToggle = useCallback(
    (data) =>
      data === "business" ? setShowBusiness(true) : setShowBusiness(false),
    [showBusiness, setShowBusiness]
  );
  return { showBusiness, setShowBusiness, handleBusinessToggle, form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    errorData,
    isSubmitting,
    resData,
    isSubmitted,
    isVerified,companylistData,associateTagsData,sourceData,LeadOwnerData,showImage,setShowImage};
}
export default useContactList;
