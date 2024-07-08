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
    if (!isSidePanel) return;
    // setIsLoading(true);
    const assignedValue = {
      id: details?.assignedTo?.id,
      name: details?.assignedTo?.name,
      email: details?.assignedTo?.email,
      image: details?.assignedTo?.image,
    };
    const assignedUser = {
      id: details?.associatedUser?.id,
      name: details?.associatedUser?.name,
      email: details?.associatedUser?.email,
      image: details?.associatedUser?.image,
    };
    const assignedTask = {
      id: details?.associatedTask?._id,
      title: details?.associatedTask?.title,
    };

    setForm({
      ...form,

      title: details?.title,
      category: details?.category,
      description: details?.description,
      due_date: details?.due_date,
      priority: details?.priority,
      type: details?.type,
      assigned_to: { ...assignedValue },
      associated_user: { ...assignedUser },
      associated_task: { ...assignedTask },
    });
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
      "assigned_to",
    ];

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

  const submitToServer = useCallback(() => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    const industryID =
      Array.isArray(form.category) && form?.category?.length > 0
        ? form?.category?.map((item) => item)
        : [];

    const updateData = {
      title: form?.title,
      description: form?.description,
      due_date: form?.due_date,
      category: industryID,
      type: form?.type,
      priority: form?.priority,
      associated_user:
        form?.associated_user?.id || form?.associated_user?._id || null,
      associated_task:
        form?.associated_task?.id || form?.associated_task?._id || null,
      comment: "Task",
      // is_completed: form?.status ? true : false,
      assigned_to: form?.assigned_to?._id || form?.assigned_to?.id,
    };

    if (empId) {
      updateData.id = empId;
    }

    const req = serviceTaskManagementUpdate;
    const res = req(updateData);

    if (!res.error) {
      handleSideToggle();
      // handleCreatedTask();
    } else {
      SnackbarUtils.error(res.message);
    }

    setIsSubmitting(false);
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
          const trimmedVal = val?.trim();

          if (!trimmedVal) {
            return false;
          } else if (trimmedVal.length < 2 || trimmedVal.length > 20) {
            SnackbarUtils.error(
              "Values cannot be less than 2 and more than 20 characters"
            );
            return false;
          } else {
            const isDuplicate = text?.some(
              (otherVal, otherIndex) =>
                otherVal?.trim().toLowerCase() === trimmedVal.toLowerCase() &&
                index !== otherIndex
            );

            if (isDuplicate) {
              SnackbarUtils.error("Category keyword already created");
              return false;
            }

            return true;
          }
        });
        t[fieldName] = tempKeywords;
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
