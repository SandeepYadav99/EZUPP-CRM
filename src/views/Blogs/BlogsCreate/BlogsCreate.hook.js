import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import LogUtils from "../../../libs/LogUtils";
import historyUtils from "../../../libs/history.utils";
import {
  serviceCreateBlogs,
  serviceUpdateBlogs,
  serviceDeleteBlogs,
  serviceGetTagsList,
} from "../../../services/Blogs.service";
import { serviceGetIndustryList } from "../../../services/Industry.service";
import constants from "../../../config/constants";

function useCreateHook({ location }) {
  const initialForm = {
    title: "",
    slug: "",
    tags: [],
    read_time: "",
    meta_description: "",
    author: "",
    cover_image: null,
    is_featured: "",
    description: "",
    publish_on: "",
    status: "ACTIVE",
  };
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checked, setChecked] = useState(false);
  const [industries, setIndustries] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [confirmPopUp, setConfirmPopUp] = useState(false);
  const [taglist, setTagList] = useState([]);
  const [editor_data, setEditor_Data] = useState(null);
  const [anchor, _setAnchor] = useState(null);

  useEffect(() => {
    serviceGetTagsList()?.then((res) => {
      setTagList(res?.data);
    });
  }, []);

  useEffect(() => {
    serviceGetIndustryList()?.then((res) => {
      setIndustries(res?.data);
    });
  }, []);

  const dataMapped = location?.state?.dataValue;

  const onChangeCheckBox = () => {
    setChecked((e) => !e);
  };

  useEffect(() => {
    if (form?.is_featured) {
      setForm({
        ...form,
        is_featured: checked,
      });
    } else {
      setForm({
        ...form,
        is_featured: checked,
      });
    }
  }, [checked]);

  const DataValue = new Date();
  const Day = DataValue?.getDate();
  const Month = DataValue?.getMonth() + 1;
  const Year = DataValue?.getFullYear();

  const handleFileUpload = () => {};

  const handleSave = () => {};

  useEffect(() => {
    if (dataMapped) {
      setCoverImage(dataMapped?.cover_image);
      setForm({
        ...form,
        title: dataMapped?.title,
        slug: dataMapped?.slug,
        read_time: dataMapped?.read_time,
        author: dataMapped?.author,
        meta_description: dataMapped?.meta_description,
        cover_image: coverImage,
        is_featured: dataMapped?.is_featured,
        status: dataMapped?.status === constants.GENERAL_STATUS.ACTIVE,
        tags: dataMapped?.tags,
        description: `<p>dataMapped?.description</p>`,
      });
    }
  }, [dataMapped]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "title",
      "tags",
      "author",
      "meta_description",
      "cover_image",
      "read_time",
    ];

    if (dataMapped) {
      const index = required.indexOf("cover_image");
      required.splice(index, 1);
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
      const t = { ...form };
      if (fieldName === "title") {
        t[fieldName] = text;
      } else if (fieldName === "read_time") {
        if (text >= 0) {
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

  const submitToServer = useCallback(
    (status) => {
      if (!isSubmitting) {
        setIsSubmitting(true);
        const fd = new FormData();
        if (dataMapped) {
          fd.append("cover_image", coverImage);
        }
        Object.keys(form).forEach((key) => {
          if (key === "status") {
            fd.append(key, form[key] ? "ACTIVE" : "INACTIVE");
          } else if (key === "publish_on") {
            fd.append(key, `${Day}-${Month}-${Year}`);
          } else {
            fd.append(key, form[key]);
          }
        });
        let req;
        if (dataMapped) {
          fd.append("id", dataMapped?.id);
          req = serviceUpdateBlogs(fd);
        } else {
          req = serviceCreateBlogs(fd);
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

  const handleDelete = () => {
    setConfirmPopUp(true);
  };

  const handleDialogClose = () => {
    setConfirmPopUp(false);
  };

  const suspendItem = () => {
    serviceDeleteBlogs({ id: dataMapped?.id })?.then((res) => {
      SnackbarUtils.success("Deleted SuccessFully");
      setConfirmPopUp(false);
      historyUtils.push("/blogs");
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
    dataMapped,
    handleDelete,
    confirmPopUp,
    suspendItem,
    handleDialogClose,
    taglist,
    handleFileUpload,
    handleSave,
    editor_data,
    anchor,
    coverImage,
  };
}

export default useCreateHook;
