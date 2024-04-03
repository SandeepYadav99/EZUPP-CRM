import React, { useCallback, useState } from "react";

function useCalendarList() {
  const [isSidePanel, setSidePanel] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleSideToggle = useCallback(
    (data) => {
      setSidePanel((e) => !e);
      if (data) {
        setEditData(data?.id);
      }
    },
    [setEditData, setSidePanel]
  );
  return {
    isSidePanel,
    handleSideToggle,
  };
}

export default useCalendarList;
