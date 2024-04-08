import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  actionFetchBlogs,
  actionSetPageBlogs,
} from "../../../actions/Blogs.action";
import { useParams } from "react-router";
import history from "../../../libs/history.utils";

const useBlogsHook = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [editData, setEditData] = useState(null);
  const [listData, setListData] = useState({
    LOCATIONS: [],
  });
  const [dataList, setDataList] = useState([]);
  const dispatch = useDispatch();
  const isMountRef = useRef(false);
  const {
    sorting_data: sortingData,
    is_fetching: isFetching,
    query,
    query_data: queryData,
  } = useSelector((state) => state.blogs);

  const { id } = useParams();

  

  useEffect(() => {
    dispatch(
      actionFetchBlogs(1, sortingData, {
        query: query,
        query_data: isMountRef.current ? queryData : null,
      })
    );
    isMountRef.current = true;
  }, [id]);

  const handlePageChange = useCallback((type) => {
    dispatch(actionSetPageBlogs(type));
  }, []);

  const queryFilter = useCallback(
    (key, value) => {
      dispatch(
        actionFetchBlogs(1, sortingData, {
          query: key == "SEARCH_TEXT" ? value : query,
          query_data: key == "FILTER_DATA" ? value : queryData,
          event_city_guide_id: id,
        })
      );
    },
    [sortingData, query, queryData, id]
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
      dispatch(
        actionFetchBlogs(
          1,
          { row, order },
          {
            query: query,
            query_data: queryData,
            event_city_guide_id: id,
          }
        )
      );
    },
    [query, queryData, id]
  );

  const handleRowSize = (page) => {
    console.log(page);
  };

  const handleEdit = useCallback(
    (data) => {
      if (data?.id) {
        setEditData(data?.id);
        history.push(`blogs/update/${data?.id}`);
      }
    },
    [editData]
  );

  const handleViewDetails = useCallback(() => { }, []);

  const handleCreateFed = useCallback(() => {
    history.push("/blogs/create");
  }, []);

  const configFilter = useMemo(() => {
    return [
      // {
      //   label: "Request Date",
      //   name: "createdAt",
      //   type: "date",
      //   options: { maxDate: new Date() },
      // },
      {
        label: "Status",
        name: "status",
        type: "select",
        fields: ["INACTIVE", "ACTIVE"],
      },
    ];
  }, [dataList]);

  return {
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleEdit,
    handleViewDetails,
    isCalling,
    editData,
    configFilter,
    handleCreateFed,
  };
};

export default useBlogsHook;
