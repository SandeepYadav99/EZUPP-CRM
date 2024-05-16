import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import RouteName from "./../../routes/Route.name";
import {
  actionFetchProduct,
  actionSetPageProductRequests,
} from "./../../actions/Product.action";
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
  } = useSelector((state) => state?.product);

  useEffect(() => {
    dispatch(
      actionFetchProduct(
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
    dispatch(actionSetPageProductRequests(type));
  }, []);

  const queryFilter = useCallback(
    (key, value) => {
      dispatch(
        actionFetchProduct(1, sortingData, {
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
      dispatch(actionSetPageProductRequests(1));
      dispatch(
        actionFetchProduct(
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

  const handleEdit = useCallback((type) => {
    history.push(`${RouteName.PRODUCT_DETAILS}${type?.id}`);
  }, []);

  const handleCreate = useCallback(() => {
    history.push(RouteName.CONTACT_CREATE);
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
    handleEdit,
    editData,
    configFilter,
    handleCreate,
  };
};

export default useUserListHook;
