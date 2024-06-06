import { useCallback, useEffect, useMemo, useReducer, useState } from "react";

import SnackbarUtils from "../../../libs/SnackbarUtils";

import { useDispatch } from "react-redux";
import {
  actionDeleteMasterDelete,
  actionFetchHubMaster,
} from "../../../actions/HubMaster.action";
import {
  serviceCreateRole,
  serviceDetailPermissions,
  serviceDetailRole,
  serviceUpdateRole,
} from "../../../services/Role.service";
import { useParams } from "react-router-dom";
import history from "../../../libs/history.utils";
import { isAlphaNum, isAlphaNumChars } from "../../../libs/RegexUtils";

const initialForm = {
  name: "",
  displayName: "",
  description: "",
  is_active: true,
};

const useRoleCreateHook = ({ handleSideToggle, isSidePanel, empId }) => {
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isAcceptPopUp, setIsAcceptPopUp] = useState(false);
  const [permission, setPermissions] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      serviceDetailRole({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          setForm({
            ...form,
            name: data?.name,
            description: data?.description,
            displayName: data?.display_name,
            is_active: data?.is_active === "ACTIVE" ? true : false,
          });
        } else {
        }
      });
    }
  }, [id]);

  useEffect(() => {
    serviceDetailPermissions({ id: id ? id : " " }).then((res) => {
      if (!res?.error) {
        setPermissions(res?.data);
      }
    });
  }, [id]);

  const permisionChangeHandler = useCallback(
    (index, data) => {
      const t = [...permission];
      t[index] = { ...t[index], ...data };
      setPermissions(t);
    },
    [permission, setPermissions]
  );

  useEffect(() => {
    if (!isSidePanel) {
      handleReset();
    }
  }, [handleSideToggle, isSidePanel]);

  const toggleAcceptDialog = useCallback(
    (obj) => {
      setIsAcceptPopUp((e) => !e);
    },
    [isAcceptPopUp, empId]
  );


  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["name", "displayName"];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
        // SnackbarUtils.error("Please enter values");
      } else if (["code"].indexOf(val) < 0) {
        delete errors[val];
      }
    });

    if (form?.name?.length <= 2) {
      errors.name = true;
    }
    if (form?.displayName?.length <= 2) {
      errors.displayName = true;
    }

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });

    return errors;
  }, [form, errorData]);

  const submitToServer = useCallback(async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    const updateData = {
      name: form?.name,
      permissions: permission,
      display_name: form?.displayName,
      description: form?.description,
      is_active: form?.is_active === true ? true : false,
    };

    if (id) {
      updateData.id = id;
    }

    const req = id ? serviceUpdateRole : serviceCreateRole;
    const res = await req(updateData);

    if (!res.error) {
      history.goBack();
    } else {
      SnackbarUtils.error(res.message);
    }

    setIsSubmitting(false);
  }, [
    form,
    isSubmitting,
    setIsSubmitting,
    empId,
    handleSideToggle,
    permission,
    setPermissions,
    dispatch,
  ]);

  const checkPermissions = (data) => {
    return data.every(obj =>
        Object.keys(obj).some(key => ["all_data", "create", "read", "update", "delete"].includes(key) && obj[key])
    );
};

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
   const hasPermission = checkPermissions(permission);
   
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
    } else {
      if (!hasPermission) {
        SnackbarUtils.error("Permission should be required");
      } else {
        await submitToServer();
      }
    }
  }, [
    checkFormValidation,
    setErrorData,
    form,
    submitToServer,
    empId,
    errorData,
    permission,
    setPermissions,
  ]);

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
      if (fieldName === "name" || fieldName === "displayName") {
        if (!text || (isAlphaNum(text) && text.toString().length <= 20)) {
          t[fieldName] = text;
        }
      } else if (fieldName === "industry_id") {
        t[fieldName] = text?.filter((item, index, self) => {
          return (
            index ===
            self.findIndex((i) => i.id === item.id && i._id === item._id)
          );
        });
      } else {
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData, errorData, setErrorData]
  );

  const cancelRole = useCallback((type) => {
    history.goBack();
  }, []);

  const suspendItem = useCallback(async () => {
    dispatch(actionDeleteMasterDelete(empId));
    dispatch(actionFetchHubMaster(1));
    handleSideToggle();
    setIsAcceptPopUp((e) => !e);
  }, [empId, isAcceptPopUp, dispatch]);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });

    setErrorData({});
  }, [form, setForm, setErrorData]);

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,

    errorData,
    handleReset,
    empId,

    permisionChangeHandler,
    permission,
    toggleAcceptDialog,
    isAcceptPopUp,
    suspendItem,
    cancelRole,
    id,
  };
};

export default useRoleCreateHook;
