import { useState, useCallback, useMemo, useEffect } from "react";
import {
  serviceCreateFaq,
  serviceDeleteFaq,
  serviceUpdateFaq,
} from "../../../../../services/Faq.service";
import SnackbarUtils from "../../../../../libs/SnackbarUtils";
import { serviceDeleteFaqQuestion } from "../../../../../services/FaqQuestion.service";

const initialState = {
  visible_to: "",
  title: "",
  status: true,
};

const useTopicView = (dataExist, handletoggleSidePannel) => {
  const [form, setForm] = useState({ ...initialState });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checked, setChecked] = useState(false);
  const [industries, setIndustries] = useState([]);
  const [coverImage, setCoverImage] = useState("");
  const [confirmPopUp, setConfirmPopUp] = useState(false);
  const [taglist, setTagList] = useState([]);
  const [editor_data, setEditor_Data] = useState(null);
  const [anchor, _setAnchor] = useState(null);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["title", "visible_to"];

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

  useEffect(() => {
    if (dataExist) {
      setForm({
        visible_to: dataExist?.visible_to,
        title: dataExist?.title,
        status: dataExist?.status,
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
        SnackbarUtils.success("Create Successfully");
        handletoggleSidePannel();
      } else {
        SnackbarUtils.error("Something went Wrong");
        handletoggleSidePannel();
      }
    });
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
      if (Object.keys(errors)?.length > 0) {
        setErrorData(errors);
        return true;
      }
      submitToServer(status);
    },
    [checkFormValidation, setErrorData, form, submitToServer]
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
        setConfirmPopUp(false);
      }
    });
  };

  return {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    industries,
    handleDelete,
    confirmPopUp,
    suspendItem,
    handleDialogClose,
    taglist,
    editor_data,
    anchor,
    coverImage,
    checked,
  };
};

export default useTopicView;
