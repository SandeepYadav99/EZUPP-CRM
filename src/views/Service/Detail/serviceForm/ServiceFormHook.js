
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import {
//   // actionFetchHubMaster,
//   actionSetPageHubMasterRequests,
// } from "../../../actions/HubMaster.action";
import { actionFetchServiceForm } from "../../../../actions/ServiceForm.action";
import { useLocation } from "react-router-dom";
const useServiceFormHook = ({id}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editId, setEditId] = useState("");
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const formId = queryParams.get("id");
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
    all,
  } = useSelector((state) => state.ServiceForm);

  useEffect(() => {
    dispatch(
      actionFetchServiceForm(
        1,
        {},
        {
          id:formId,
          query: isMountRef.current ? query : null,
          query_data: isMountRef.current ? queryData : null,
        }, id
      )
    );
    isMountRef.current = true;
  }, []);

  const handleSideToggle = useCallback(
    (data) => {
      setSidePanel((e) => !e);
      setEditId("");
      setEditData(null);
    },
    [setEditId, setSidePanel, setEditData]
  );

  const handleEdit = useCallback(
    (data) => {
      setSidePanel((e) => !e);
      setEditId(data?.id);
      setEditData(data);
    },
    [setEditData, setSidePanel, setEditId]
  );

  const configFilter = useMemo(() => {
    return [
      { label: "Created On", name: "createdAt", type: "date" },
      {
        label: "Status",
        name: "status",
        type: "select",
        fields: ["INACTIVE", "ACTIVE"],
      },
    ];
  }, []);

  return {
  
    handleSideToggle,
    isCalling,
    editData,
    isSidePanel,
    configFilter,
    editId,
    handleEdit,
  };
};

export default useServiceFormHook;
