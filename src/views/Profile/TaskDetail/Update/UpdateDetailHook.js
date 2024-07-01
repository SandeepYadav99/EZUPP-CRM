/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useReducer, useState } from "react";
import SnackbarUtils from "../../../../libs/SnackbarUtils";

import {
  serviceProviderProfileGetKeyword,
  serviceSearchAssignto,
  serviceSearchTask,
  serviceSearchUser,
  serviceTaskManagementUpdate,
} from "../../../../services/ProviderUser.service";

const initialForm = {
  title: "",
  description: "",
  due_date: "",
  category: [],
  type: "",
  priority: "",
  associated_user: "",
  associated_task: "",
  // comment:"",
  // status: true,
  assigned_to: "",
};

const initialTask = {
  categoryLists: [],
  filteredAssignedTo: [],
  filteredTask: [],
  filteredUsers: [],
};

const useAddTaskUpdate = ({
  handleSideToggle,
  isSidePanel,
  empId,
  handleCreatedTask,
  details,
}) => {
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [listData, setListData] = useState(null);
  const [isAcceptPopUp, setIsAcceptPopUp] = useState(false);
  const [fetchedAssignedTo, setFetchedAssignedTo] = useState(null);
  const [fetchedTask, setFetchedTask] = useState(null);
  const [fetchedUser, setFetchedUser] = useState(null);
  const [helperText, setHelperText] = useState("");

  const reducer = (state, action) => {
    switch (action.type) {
      case "CATEGORY":
        return { ...state, categoryLists: action.payload };
      case "ASSINEDTO":
        return { ...state, filteredAssignedTo: action.payload };
      case "FILTERED_TASK":
        return { ...state, filteredTask: action.payload };
      case "FILTERED_USER":
        return { ...state, filteredUsers: action.payload };
      default:
        return state;
    }
  };

  const [task, dispatchTask] = useReducer(reducer, initialTask);

  useEffect(() => {
    // setIsLoading(true);
    setForm({
      ...form,
      title: details?.title,
      category: details?.category,
      description: details?.description,
      due_date: details?.due_date,
      priority: details?.priority,
      type: details?.type,
    });
    setFetchedAssignedTo(details?.assignedTo);
    setFetchedUser(details?.associatedUser);
    setFetchedTask(details?.associatedTask);
  }, [details, isSidePanel]);

  useEffect(() => {
    if (!isSidePanel) return;
    Promise.all([
      serviceProviderProfileGetKeyword({ type: "TASK" }),
      serviceSearchAssignto({
        query: form?.assigned_to ? form?.assigned_to?.name : form?.assigned_to,
      }),
      serviceSearchTask({
        query: form?.associated_task
          ? form?.associated_task?.title
          : form?.associated_task,
      }),
      serviceSearchUser({
        id: empId ? empId : "",
        query: form?.associated_user
          ? form?.associated_user?.name
          : form?.associated_user,
      }),
    ]).then(([catRes, assignRes, filterTaskRes, userRes]) => {
      if (!catRes.error) {
        dispatchTask({ type: "CATEGORY", payload: catRes.data });
      }
      if (!assignRes.error) {
        dispatchTask({ type: "ASSINEDTO", payload: assignRes.data });
      }
      if (!filterTaskRes.error) {
        dispatchTask({ type: "FILTERED_TASK", payload: filterTaskRes.data });
      }
      if (!userRes.error) {
        dispatchTask({ type: "FILTERED_USER", payload: userRes.data });
      } else {
        // dispatchTask({ type: "FILTERED_USER", payload: [] });
      }
    });
  }, [isSidePanel]);

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
    let required = [
      "type",
      "title",
      "description",
      "priority",
      "due_date",
      "category",
    ];
    if (!fetchedAssignedTo) {
      required.push("assigned_to");
    }
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
    if(!form?.assigned_to){
      errors.assigned_to= true;
    }
    if (!form.due_date || isNaN(new Date(form?.due_date))) {
      setHelperText("Invalid date/time format.");
      errors.due_date = true;
    } else {
      // delete form?.due_date;
      setHelperText("");
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

    const industryID =
      Array.isArray(form.category) && form?.category?.length > 0
        ? form?.category?.map((item) => item) // item.id || item._id
        : [];

    const updateData = {
      title: form?.title,
      description: form?.description,
      due_date: form?.due_date,
      category: industryID,
      type: form?.type,
      priority: form?.priority,
      associated_user: form?.associated_user?._id , //|| fetchedUser?.id
      associated_task: form?.associated_task?._id , // || fetchedTask?._id,
      comment: "Task",
      // is_completed: form?.status ? true : false,
      assigned_to: form?.assigned_to?._id || fetchedAssignedTo.id,
    };

    if (empId) {
      updateData.id = empId;
    }

    try {
      const req = serviceTaskManagementUpdate; // empId ? serviceHubMasterUpdate :
      const res = await req(updateData);

      if (!res.error) {
        handleSideToggle();
        handleCreatedTask();
      } else {
        SnackbarUtils.error(res.message);
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }, [form, isSubmitting, setIsSubmitting, empId, handleSideToggle]);

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
      if (fieldName === "name") {
        t[fieldName] = text;
      } else if (fieldName === "category") {
        const tempKeywords = text?.filter((val, index) => {
          if (val?.trim() === "") {
            return false;
          } else if (val?.length < 2 || val?.length > 20) {
            SnackbarUtils.error(
              "Values cannot be less than 2 and more than 20 character"
            );
            return false;
          } else {
            const key = val?.trim().toLowerCase();
            const isThere = text?.findIndex(
              (keyTwo, indexTwo) =>
                keyTwo?.toLowerCase() === key && index !== indexTwo
            );
            return isThere < 0;
          }
        });
     
        t[fieldName] = tempKeywords;
      } else if (fieldName === "associated_task") {
        t[fieldName] = text;
      } else if (fieldName === "assigned_to") {
        t[fieldName] = text;
      } else if (fieldName === "due_date") {
        t[fieldName] = text;
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
    handleSideToggle();
    setIsAcceptPopUp((e) => !e);
  }, [empId, isAcceptPopUp]);

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
    listData,
    errorData,
    handleReset,
    empId,
    toggleAcceptDialog,
    isAcceptPopUp,
    suspendItem,
    filteredUsers: task?.filteredUsers,
    filteredTask: task?.filteredTask,
    filteredAssignedTo: task?.filteredAssignedTo,
    fetchedAssignedTo,
    fetchedTask,
    fetchedUser,
    categoryLists: task?.categoryLists,
    setFetchedUser,
    setFetchedTask,
    helperText,
  };
};

export default useAddTaskUpdate;
