/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { serviceBadgeIndustry } from "../../../services/Badge.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import {
  serviceHubMasterCreate,
  serviceHubMasterDetail,
  serviceHubMasterUpdate,
} from "../../../services/HubMaster.service";
import constants from "../../../config/constants";
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
const initialForm = {
  name: "",
  displayName:"",
  description:""
};

const useRoleCreateHook = ({ handleSideToggle, isSidePanel, empId }) => {
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [geofenceCoordinates, setGeofenceCoordinates] = useState([]);
  const [listData, setListData] = useState(null);
  const [isAcceptPopUp, setIsAcceptPopUp] = useState(false);
  const [permission, setPermissions] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  // useEffect(() => {
  //   serviceBadgeIndustry({ id: id }).then((res) => {
  //     if (!res.error) {
  //       setListData(res.data);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    if (empId) {
      serviceDetailRole({ id: empId }).then((res) => {
        if (!res.error) {
          const data = res.data;

          setForm({
            ...form,
            name: data?.name,
           
            
          });
        } else {
        }
      });
    }
  }, [empId, listData]);

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
      console.log(data, "t");
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
    let required = ["name", "description"];
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
        SnackbarUtils.error("Please enter values");
      } else if (["code"].indexOf(val) < 0) {
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

  const submitToServer = useCallback(async () => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

   

    const updateData = {
      name: form?.name,
      permissions:permission,
      description:form?.description,
      is_active:true
    };

    if (empId) {
      updateData.id = empId;
    }

    try {
      const req = empId ? serviceUpdateRole : serviceCreateRole;
      const res = await req(updateData);

      if (!res.error) {
        handleSideToggle();
        // dispatch(actionFetchHubMaster(1));
        //window.location.reload();
        history.goBack()
      } else {
        SnackbarUtils.error(res.message);
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
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

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
    } else {
      await submitToServer();
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
      console.log(text, "Text");
      let shouldRemoveError = true;
      const t = { ...form };
      if (fieldName === "name") {
        t[fieldName] = text;
      } else if (fieldName === "industry_id") {
        console.log(text, "Text");
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
    [removeError, form, setForm, listData]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData, errorData, setErrorData]
  );

  const suspendItem = useCallback(async () => {
    dispatch(actionDeleteMasterDelete(empId));
    dispatch(actionFetchHubMaster(1));
    handleSideToggle();
    setIsAcceptPopUp((e) => !e);
  }, [empId, isAcceptPopUp, dispatch]);

  const handleReset = useCallback(() => {
    setForm({ ...initialForm });
    setGeofenceCoordinates([]);
    setErrorData({});
  }, [form, setForm, geofenceCoordinates, setErrorData]);

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    listData,
    errorData,
    handleReset,
    empId,
    geofenceCoordinates,
    setGeofenceCoordinates,
    permisionChangeHandler,
    permission,
    toggleAcceptDialog,
    isAcceptPopUp,
    suspendItem,
  };
};

export default useRoleCreateHook;
