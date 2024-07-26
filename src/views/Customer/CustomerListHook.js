import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import RouteName from "./../../routes/Route.name";
import {
  actionFetchContact,
  actionSetPageContactRequests,
  actionFetchCustomer,
  actionSetPageCustomerRequests,
} from "./../../actions/Contact.action";
import history from "./../../libs/history.utils";

const useUserListHook = ({}) => {
  const [editData, setEditData] = useState(null);

  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
    all,
  } = useSelector((state) => state?.contact);

  useEffect(() => {
    dispatch(
      actionFetchCustomer(
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
    dispatch(actionSetPageCustomerRequests(type));
  }, []);

  const queryFilter = useCallback(
    (key, value) => {
      dispatch(
        actionFetchCustomer(1, sortingData, {
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
      dispatch(actionSetPageCustomerRequests(1));
      dispatch(
        actionFetchCustomer(
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

  const handleDetail = useCallback((type) => {
    history.push(`${RouteName.CUSTOMER_DETAIL}${type?.id}`);
  }, []);

  const handleCreate = useCallback(() => {
    history.push(RouteName.CUSTOMER_CREATE);
  }, []);

  const configFilter = useMemo(() => {
    return [
      {
        label: "Created On",
        name: "createdAt",
        type: "date",
        options: { maxDate: new Date() },
      },
      {
        label: "Status",
        name: "status",
        type: "select",
        fields: ["PENDING", "ACTIVE"],
      },
    ];
  }, []);

  return {
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleSortOrderChange,
    handleDetail,
    editData,
    configFilter,
    handleCreate,
  };
};

export default useUserListHook;
