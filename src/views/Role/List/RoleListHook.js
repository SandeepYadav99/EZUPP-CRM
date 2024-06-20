/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import RouteName from "../../../routes/Route.name";
import history from "../../../libs/history.utils";
import { actionFetchRole, actionSetPageRole } from "../../../actions/Role.action";

const useRoleListHook = ({}) => {
  const [isSidePanel, setSidePanel] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editId, setEditId] = useState("");
  const [isOpenImageStack, setIsOpenImageStack]=useState(false)
  const dispatch = useDispatch();
  const isMountRef = useRef(false);

  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
    all,
  } = useSelector((state) => state.role);

  useEffect(() => {
    dispatch(
      actionFetchRole(
        1,
        {},
        {
          query: isMountRef.current ? query : null,
          query_data: isMountRef.current ? queryData : null,
        }
      )
    );
    isMountRef.current = true;
  }, []);

  const handlePageChange = useCallback((type) => {
    dispatch(actionSetPageRole(type));
  }, []);

  const queryFilter = useCallback(
    (key, value) => {
      dispatch(
        actionFetchRole(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
        })
      );
    },
    [sortingData, query, queryData]
  );

  const handleFilterDataChange = useCallback(
    (value) => {
      queryFilter("FILTER_DATA", value);
    },
    [queryFilter]
  );

  const handleSearchValueChange = useCallback(
    (value) => {
      queryFilter("SEARCH_TEXT", value);
    },
    [queryFilter]
  );

  const handleSortOrderChange = useCallback(
    (row, order) => {
      dispatch(actionSetPageRole(1));
      dispatch(
        actionFetchRole(
          1,
          { row, order },
          {
            query: query,
            query_data: queryData,
          }
        )
      );
    },
    [query, queryData]
  );

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
      // setSidePanel((e) => !e);
      // setEditId(data?.id);
      // setEditData(data);
      history.push(`${RouteName.ROLE_CREATE_UPDATE}${data?.id}`)
    },
    [setEditData, setSidePanel, setEditId]
  );

  const handleDetail = useCallback(
    (data) => {
 
      history.push(`${RouteName.ROLE_DETAIL}${data?.id}`)
    },
    [setEditData, setSidePanel, setEditId]
  );

  const handleCreate = useCallback(() => {
    history.push(RouteName.ROLE_CREATE);
  }, []);
  
  const openProfilePopUp = useCallback(
    (data) => {
      setIsOpenImageStack((e) => !e);
     
    },
    [setIsOpenImageStack]
  );
  const configFilter = useMemo(() => {
    return [
      // { label: "Created On", name: "createdAt", type: "date" },
      {
        label: "Status",
        name: "status",
        type: "select",
        fields: ["INACTIVE", "ACTIVE"],
      },
    ];
  }, []);

  return {
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleSortOrderChange,
    handleSideToggle,
    isCalling,
    editData,
    isSidePanel,
    configFilter,
    editId,
    handleEdit,
    handleCreate,
    handleDetail,
    openProfilePopUp,
    isOpenImageStack
  };
};

export default useRoleListHook;
