import React, { useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import LogUtils from "../../../libs/LogUtils";
import historyUtils from "../../../libs/history.utils";
import {
  serviceCreateBlogs,
  serviceUpdateBlogs,
  serviceDeleteBlogs,
  serviceGetTagsList,
  serviceBlogsDetails,
} from "../../../services/Blogs.service";
import { serviceGetIndustryList } from "../../../services/Industry.service";
import constants from "../../../config/constants";
import { useParams } from "react-router-dom";
import slugify from "slugify";

const initialForm = {
  title: "",
  slug: "",
  tags: [],
  topic: "",
  meta_description: "",
  author: "",
  image: null,
  is_featured: true,
  blog_description: "",
  publish_on: "",
  status: "",
};

function useNewBlogCreateHook({ location }) {
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [confirmPopUp, setConfirmPopUp] = useState(false);
  const [taglist, setTagList] = useState([]);
  const descriptionRef = useRef(null);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const promises = await Promise.allSettled([
        serviceGetTagsList(),
        serviceGetIndustryList(),
      ]);
  
      const tagList = promises[0].value?.data;
      const industryList = promises[1].value?.data;

      setTagList(tagList);
    })();
  }, []);

  const handleCancel = () => {
    setForm({ ...initialForm });
  };
  useEffect(() => {
    if (id) {
      serviceBlogsDetails({ id: id })?.then((res) => {
        const data = res?.data;
        console.log("data", data);
        setCoverImage(data?.image);

        setForm({
          ...form,
          // ...data,
          title: data?.title,
          slug: data?.slug,
          topic: data?.topic,
          author: data?.author,
          is_featured: data?.is_featured,
          status: data?.status,
          tags: data?.tags?.length>1?data?.tags:data?.tags?.[0]?.split(","),
          blog_description: data?.blog_description,
          meta_description: data?.meta_description,
        });
      });
    }
  }, [id]);

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = [
      "title",
      "tags",
      "author",
      "meta_description",
      "topic",
      "slug",
      "status",
      "blog_description",
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
  }, [form, errorData, id]);

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
        // t['slug']=text?.toLowerCase()?.replace(' ','-');
        t["slug"] = slugify(text, { replacement: "-", lower: true });
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

        Object.keys(form).forEach((key) => {
          if (key !== "image") {
            fd.append(key, form[key]);
          }
        });
        if (form?.image) {
          fd.append("image", form?.image);
        }
        let req;
        if (id) {
          fd.append("id", id);
         
          req = serviceUpdateBlogs(fd);
        } else {
          req = serviceCreateBlogs(fd);
        }
        req.then((res) => {
          
          if (!res.error) {
            historyUtils.push("/blogs");
          } else {
            SnackbarUtils.error(res?.message);
          }
          setIsSubmitting(false);
        });
      }
    },
    [form, isSubmitting, setIsSubmitting, id,]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData, form]
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
    [checkFormValidation, setErrorData, submitToServer]
  );

  const suspendItem = () => {
    serviceDeleteBlogs({ id: id })?.then((res) => {
      SnackbarUtils.success("Deleted SuccessFully");
      setConfirmPopUp(false);
      historyUtils.push("/blogs");
    });
  };
  descriptionRef.current = changeTextData;

  return {
    form,
    errorData,
    changeTextData,
    handleSubmit,
    isSubmitting,
    confirmPopUp,
    suspendItem,
    taglist,
    handleCancel,
    coverImage,
    descriptionRef,
  };
}

export default useNewBlogCreateHook;
