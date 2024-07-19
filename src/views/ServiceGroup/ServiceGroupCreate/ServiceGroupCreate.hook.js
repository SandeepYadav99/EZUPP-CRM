import React, { useCallback, useEffect, useRef, useState } from "react";
import { serviceGroups } from "../../../helper/Helper";

function useServiceGroupCreate() {
  const [serviceData, setServiceData] = useState([...serviceGroups]);
  const [allData, setAllData] = useState([...serviceGroups]);
  const [inputValue, setInputValue] = useState("");
  const [isSidePanel, setSidePanel] = useState(false);
  const [editData, setEditData] = useState(null);

  const renderList = useCallback(() => {
    // serviceGetCalendar({
    //   index: 1,
    //   row: "createdAt",
    //   order: "desc",
    //   query: "",
    //   query_data: null,
    // }).then((res) => {
    //   if (!res.error) {
    //     setData(res.data);
    //   }
    // });
  }, []);

  useEffect(() => {
    renderList();
  }, []);

  const handleSideToggle = useCallback(
    (data) => {
      setSidePanel((e) => !e);
      if (data) {
        setEditData(data);
      } else {
        setEditData(null);
      }
    },
    [setEditData, setSidePanel]
  );

  const handleDrag = useCallback(
    (dragId, dragOverId) => {
      const all = serviceData ? [...serviceData] : [];
      let dragIndex = -1;
      let dragOverIndex = -1;
      let dragCategory = null;

      for (let category of all) {
        for (let i = 0; i < category?.services?.length; i++) {
          if (category?.services[i]?.id === dragId) {
            dragIndex = i;
            dragCategory = category;
          }
          if (category?.services[i]?.id === dragOverId) {
            dragOverIndex = i;
          }
          if (dragIndex !== -1 && dragOverIndex !== -1) break;
        }
        if (dragIndex !== -1 && dragOverIndex !== -1) break;
      }
      if (dragIndex >= 0 && dragOverIndex >= 0 && dragCategory) {
        const [draggedItem] = dragCategory?.services.splice(dragIndex, 1);
        dragCategory?.services?.splice(dragOverIndex, 0, draggedItem);

        dragCategory?.services?.forEach((service, index) => {
          service.priority = index;
        });
      }
      setServiceData([...all]);
      console.log("all", all);
      // props.actionDragFaq(dragId, dragOverId);
    },
    [serviceData]
  );

  const handleSearchValueChange = useCallback(
    (value) => {
      if (value) {
        const tempData = allData.filter((val) => {
          if (val?.title?.match(new RegExp(value, "ig"))) {
            return val;
          }
        });
        setServiceData(tempData);
      } else {
        setServiceData(allData);
      }
      setInputValue(value);
    },
    [, serviceData, setServiceData, allData, inputValue]
  );

  return {
    serviceData,
    handleDrag,
    handleSearchValueChange,
    inputValue,
    editData,
    renderList,
    isSidePanel,
    handleSideToggle,
  };
}

export default useServiceGroupCreate;
