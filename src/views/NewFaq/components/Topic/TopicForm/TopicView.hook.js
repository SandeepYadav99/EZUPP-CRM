import { useState, useCallback, useMemo, useEffect } from "react";
import {
  serviceCreateFaq,
  serviceDeleteFaq,
  serviceUpdateFaq,
} from "../../../../../services/Faq.service";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";

const initialState = {
  visible_to: "",
  title: "",
  status: true,
};

const useTopicView = (dataExist,isOpen, handletoggleSidePannel, listlength = 0) => {
  const [form, setForm] = useState({ ...initialState });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmPopUp, setConfirmPopUp] = useState(false);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["title", "visible_to"];

    required.forEach((val) => {
      const fieldValue = form?.[val]?.trim();

      if (
        (!fieldValue && parseInt(fieldValue) !== 0) ||
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

  useEffect(()=>{
    if(!isOpen){
      setForm({
        ...initialState
      })
      setErrorData({})
    }
  },[isOpen])
  
  useEffect(() => {
    if (dataExist) {
      setForm({
        visible_to: dataExist?.visible_to,
        title: dataExist?.title,
        status: dataExist?.status === "ACTIVE" ? true : false,
        priority: dataExist?.priority,
      });
    }
  }, [dataExist]);

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      t[fieldName] = text;
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const submitToServer = useCallback(() => {
    setIsSubmitting(true);
    const statusData = form?.status ? "ACTIVE" : "INACTIVE";

    const payload = {
      status: `${statusData}`,
      visible_to: form?.visible_to,
      title: form?.title,
      priority: listlength,
    };

    if (dataExist) {
      delete dataExist.status;
      delete dataExist.visible_to;
      delete dataExist.title;
    }

    const payload2 = {
      status: `${statusData}`,
      visible_to: form?.visible_to,
      title: form?.title,
      ...dataExist,
    };

    let req;

    if (dataExist) {
      req = serviceUpdateFaq({ ...payload2 });
    } else {
      req = serviceCreateFaq({ ...payload });
    }

    req?.then((res) => {
      if (!res?.error) {
        if (dataExist) {
          SnackbarUtils.success("Updated Successfully");
        } else {
          SnackbarUtils.success("Created Successfully");
        }
        handletoggleSidePannel();
      }else{
        SnackbarUtils.error(res?.message)
      }
    });
  }, [form, isSubmitting, setIsSubmitting, listlength]);

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
      if (Object.keys(errors)?.length > 0) {
        setErrorData(errors);
        return true;
      }
      submitToServer(status);
    },
    [checkFormValidation, setErrorData, form, submitToServer, listlength]
  );

  const handleDelete = () => {
    setConfirmPopUp(true);
  };

  const handleDialogClose = () => {
    setConfirmPopUp(false);
  };

  const suspendItem = () => {
    serviceDeleteFaq({ id: dataExist?.id })?.then((res) => {
      if (!res?.error) {
        SnackbarUtils.success("Deleted Successfully");
        handletoggleSidePannel();
        setConfirmPopUp(false);
      } else {
        setConfirmPopUp(false);
        handletoggleSidePannel();
      }
    });
  };

  return {
    form,
    errorData,
    changeTextData,
    handleSubmit,
    handleDelete,
    confirmPopUp,
    suspendItem,
    handleDialogClose,
  };
};

export default useTopicView;
