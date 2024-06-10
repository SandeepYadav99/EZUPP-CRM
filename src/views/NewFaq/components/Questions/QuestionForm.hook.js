import { KeyOffRounded } from "@mui/icons-material";
import { useState, useEffect,useRef,useCallback } from "react";
import { useParams } from "react-router-dom";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import historyUtils from "../../../../libs/history.utils";

const initialState = {
  question: "",
  priority: "",
  is_active: false,
  description:"",
};

const useQuestionFormHook = () => {
  const [form, setForm] = useState({...initialState});
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checked, setChecked] = useState(false);
  const [industries, setIndustries] = useState([]);
  const [coverImage, setCoverImage] = useState("");
  const [confirmPopUp, setConfirmPopUp] = useState(false);
  const [taglist, setTagList] = useState([]);
  const [editor_data, setEditor_Data] = useState(null);
  const [anchor, _setAnchor] = useState(null);

  const params = useParams();


  const descriptionRef = useRef(null);

  const onChangeCheckBox = () => {
    setChecked(!checked);
  };

  useEffect(() => {
   
  }, [params]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["question", "priority"];

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
      t[fieldName] = text;
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  descriptionRef.current = changeTextData;

  const submitToServer = useCallback(
    (status) => {
      if (!isSubmitting) {
        setIsSubmitting(true);
        
        let req ;
       
        req.then((res) => {
          if (!res.error) {
            historyUtils.push("/new/faq");
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
    // serviceDeleteBlogs({ id: params?.id })?.then((res) => {
    //   SnackbarUtils.success("Deleted SuccessFully");
    //   setConfirmPopUp(false);
    //   historyUtils.push("/new/faq");
    // });
  };

  const handleEditor = (data) => {
    setForm({
      ...form,
      blog_description: data,
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
