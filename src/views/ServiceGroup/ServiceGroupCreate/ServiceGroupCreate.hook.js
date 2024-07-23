import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { serviceGroups } from "../../../helper/Helper";
import {
  serviceGetProductGroup,
  serviceGetProductGroupPriority,
} from "../../../services/ProductGroup.service";
import debounce from "lodash.debounce";
import RouteName from "../../../routes/Route.name";
import historyUtils from "../../../libs/history.utils";

function useServiceGroupCreate() {
  const [serviceData, setServiceData] = useState([...serviceGroups]);
  const [allData, setAllData] = useState([...serviceGroups]);
  const [inputValue, setInputValue] = useState("");
  const [isSidePanel, setSidePanel] = useState(false);
  const [editData, setEditData] = useState(null);

  const renderList = useCallback(() => {
    serviceGetProductGroup().then((res) => {
      if (!res.error) {
        setAllData(res?.data);
        setServiceData(res?.data);
      }
    });
  }, []);

  
  useEffect(() => {
    renderList();
  }, []);

  const updatePrioirty = useCallback((all) => {
    const req = serviceGetProductGroupPriority({ data: [...all] });
    req.then((res) => {
      if (!res?.error) {
        console.log(">>>>res", res);
      }
    });
  }, []);

  const handleCreate = useCallback((data) => {
    historyUtils.push(RouteName.PRODUCT_CREATE,{
      parentId:data
    });
  }, []);

  const handleUpdate = useCallback((data) => {
    historyUtils.push(RouteName.PRODUCT_UPDATE + data);
  }, []);
  
  const priorityDebounce = useMemo(() => {
    return debounce((e) => {
      updatePrioirty(e);
    }, 1000);
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
        for (let i = 0; i < category?.products?.length; i++) {
          if (category?.products[i]?.id === dragId) {
            dragIndex = i;
            dragCategory = category;
          }
          if (category?.products[i]?.id === dragOverId) {
            dragOverIndex = i;
          }
          if (dragIndex !== -1 && dragOverIndex !== -1) break;
        }
        if (dragIndex !== -1 && dragOverIndex !== -1) break;
      }
      if (dragIndex >= 0 && dragOverIndex >= 0 && dragCategory) {
        const [draggedItem] = dragCategory?.products.splice(dragIndex, 1);
        dragCategory?.products?.splice(dragOverIndex, 0, draggedItem);

        dragCategory?.products?.forEach((service, index) => {
          service.priority = index;
        });
      }
      priorityDebounce([...all]);
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
    handleCreate,
    handleUpdate
  };
}

export default useServiceGroupCreate;
