/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useReducer, useState } from "react";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import { useDispatch } from "react-redux";
import {
  actionDeleteMasterDelete,
  actionFetchHubMaster,
} from "../../../actions/HubMaster.action";
import {
  serviceProviderProfileGetKeyword,
  serviceSearchAssignto,
  serviceSearchTask,
  serviceSearchUser,
  serviceTaskManagementCreate,
} from "../../../services/ProviderUser.service";

const initialForm = {
  title: "",
  description: "",
  due_date: "",
  category: [],
  type: "",
  priority: "",
  associated_user: "",
  associated_task: "",
  assigned_to: "",
};

const initialTask = {
  categoryLists: [],
  filteredAssignedTo: [],
  filteredTask: [],
  filteredUsers: [],
};
const useAddTaskCreate = ({
  handleSideToggle,
  isSidePanel,
  empId,
  handleCreatedTask,
  profileDetails,
}) => {
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isAcceptPopUp, setIsAcceptPopUp] = useState(false);
  const [fetchedAssignedUser, setFetchedAssinedUser] = useState([]);
  const [taskTypes, setTaskTypes] = useState(["DISCUS"]);
  const [helperText, setHelperText] = useState("");

  const dispatch = useDispatch();
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
    setFetchedAssinedUser(profileDetails);
  }, [fetchedAssignedUser]);

  const handleSearchUsers = useCallback((searchText) => {}, []);

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
      // "taskType"
    ]; // "name", "description", "due_date", "task_type", "comment"
    if (!fetchedAssignedUser) {
      required.push("assigned_to");
    }
    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val]?.length === 0)
      ) {
        errors[val] = true;
    
      } else if (["code"].indexOf(val) < 0) {
        delete errors[val];
      }
    });
    if(form?.title?.length < 2){
      errors.title = true
    }
    // if (!form.due_date || isNaN(new Date(form?.due_date))) {
    //   setHelperText("Invalid date/time format.");
    //   errors.due_date = true;
    // } else {
    //   // delete form?.due_date;
    //   setHelperText("");
    // }
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData, helperText]);

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
      associated_user: form?.associated_user?._id,
      associated_task: form?.associated_task?._id,
      comment: "Task",
      // is_completed: form?.status ? true : false,
      assigned_to: form?.assigned_to?._id || fetchedAssignedUser?.id,
    };

    if (empId) {
      updateData.id = empId;
    }

    try {
      const req = serviceTaskManagementCreate; // empId ? serviceHubMasterUpdate :
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
  }, [form, isSubmitting, setIsSubmitting, empId, handleSideToggle, dispatch]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    if (Object.keys(errors)?.length > 0) {
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
          } else if (val?.length <= 2 || val?.length > 20) {
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
      } else if (fieldName === "associated_user") {
        t[fieldName] = text;
      } else if (fieldName === "assigned_to") {
        t[fieldName] = text;
      } else if (fieldName === "due_date") {
        // // if(text && isNaN(text)){
        //    shouldRemoveError=true;
        //   setHelperText("Invalid date/time format.");
        // }else{

        //   // setHelperText("");
        // }
        t[fieldName] = text;
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
    categoryLists: task?.categoryLists,
    handleSearchUsers,
    toggleAcceptDialog,
    isAcceptPopUp,
    suspendItem,
    filteredUsers: task?.filteredUsers,
    filteredTask: task?.filteredTask,
    filteredAssignedTo: task?.filteredAssignedTo,
    fetchedAssignedUser,
    taskTypes,
    helperText,
  };
};

export default useAddTaskCreate;
