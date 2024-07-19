import React, { useCallback, useRef, useState } from "react";
import { serviceGroups } from "../../../helper/Helper";

function useServiceGroupCreate() {
  const [serviceData, setServiceData] = useState([...serviceGroups]);

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

  return {
    serviceData,
    handleDrag,
  };
}

export default useServiceGroupCreate;
