import { useCallback, useEffect, useState } from "react";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import {
  serviceCreateContact,
  serviceDeleteContact,
  serviceUpdateContact,
} from "../../../services/Contact.service";

const initialForm = {
  title: "",
};
const useAddGroupCreateHook = ({
  isOpen,
  handleToggle,
  editData,
  renderList,
}) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log("editData", editData);
  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setForm({
          ...form,
          title: editData?.title,
        });
      }
    } else {
      setForm({ ...initialForm });
      setErrorData({});
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
    },
    [removeError, form, setForm]
  );

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["title"];
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
      let req = serviceCreateContact;
      if (editData?.id) {
        req = serviceUpdateContact;
      }

      req({
        ...form,
      }).then((res) => {
        if (!res.error) {
          handleToggle();
          renderList();
          SnackbarUtils.success(
            `${editData?.id ? "Updated" : "Created"} successfully`
          );
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsSubmitting(false);
      });
    }
  }, [form, isSubmitting, setIsSubmitting, handleToggle, editData, renderList]);

  const handleSubmit = useCallback(() => {
    const errors = checkFormValidation();
    console.log("===?", form, errors);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }
    submitToServer();
  }, [checkFormValidation, setErrorData, form, submitToServer, editData]);

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  const handleDelete = useCallback(
    (id) => {
      const req = serviceDeleteContact({ id: id });
      req.then((res) => {
        if (!res?.error) {
          SnackbarUtils.success("Deleted Successfully");
          handleToggle();
          renderList();
        }
      });
    },
    [handleToggle, renderList]
  );

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    errorData,
    isSubmitting,
    isSubmitted,
    handleDelete,
  };
};

export default useAddGroupCreateHook;
