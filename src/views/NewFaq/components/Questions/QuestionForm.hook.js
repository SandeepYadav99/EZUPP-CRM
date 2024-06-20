import { useState, useEffect, useRef, useCallback } from "react";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import historyUtils from "../../../../libs/history.utils";
import {
  serviceCreateFaqQuestion,
  serviceDeleteFaqQuestion,
  serviceUpdateFaqQuestion,
} from "../../../../services/FaqQuestion.service";

const initialState = {
  question: "",
  status: true,
  description: "",
};

const useQuestionFormHook = ({
  category,
  isOpen,
  data,
  handleToggleSidePannel,
  listLength = 0,
}) => {
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


  const descriptionRef = useRef(null);

  const onChangeCheckBox = () => {
    setChecked(!checked);
  };

  useEffect(()=>{
    if(!isOpen){
      setForm({
        ...initialState
      })
      setErrorData({})
    }
  },[isOpen])

  useEffect(() => {
    if (data) {
      setForm({
        question: data?.question,
        status: data?.status === "ACTIVE" ? true : false,
        description: data?.description,
        priority: data?.priority,
      });
    } else {
      setForm({
        ...initialState,
      });
    }
  }, [data]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["question", "description"];

    required.forEach((val) => {
      const fieldValue = form?.[val]?.trim();

      if (
        (!fieldValue && parseInt(fieldValue) !== 0) ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
      }
    });

    const strippedContent = form?.description?.replace(/<[^>]*>/g, '')?.trim();
    if(!strippedContent){
      errors['description'] = true;
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
      t[fieldName] = text;
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  descriptionRef.current = changeTextData;

  const submitToServer = useCallback(() => {
    setIsSubmitting(true);

    const statusData = form?.status ? "ACTIVE" : "INACTIVE";

    const payload = {
      title: category?.title,
      faq_category_id: category?.id,
      status: `${statusData}`,
      question: form?.question,
      description: form?.description,
    };

    let req;
    payload.priority = data?.id ? form?.priority : listLength;
    if (data) {
      req = serviceUpdateFaqQuestion({ ...payload, id: data?.id });
    } else {
      req = serviceCreateFaqQuestion({ ...payload });
    }

    req?.then((res) => {
      if (!res?.error) {
        if(data){
          SnackbarUtils.success("Update Successfully");
        }
        else {
          SnackbarUtils.success("Create Successfully");
        }
        handleToggleSidePannel();
      } else {
        SnackbarUtils.error(res?.message);
        // handleToggleSidePannel();
      }
    });
  }, [form, isSubmitting, setIsSubmitting, listLength]);

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
    [checkFormValidation, setErrorData, form, submitToServer, listLength]
  );

  const handleDelete = () => {
    setConfirmPopUp(true);
  };

  const handleDialogClose = () => {
    setConfirmPopUp(false);
  };

  const suspendItem = () => {
    serviceDeleteFaqQuestion({ id: data?.id })?.then((res) => {
      if (!res?.error) {
        setConfirmPopUp(false);
        SnackbarUtils.success("Successfully Deleted");
        handleToggleSidePannel();
      }
    });
  };

  const handleEditor = (data) => {
    setForm({
      ...form,
      description: data,
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
    onChangeCheckBox,
    handleEditor,
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
    descriptionRef,
  };
};

export default useQuestionFormHook;
