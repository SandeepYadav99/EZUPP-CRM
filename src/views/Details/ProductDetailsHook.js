import React, { useCallback, useEffect, useState } from "react";

import {
  serviceProfileDetail,

} from "../../services/ProviderUser.service";
import historyUtils from "../../libs/history.utils";

import { useLocation } from "react-router-dom";
import RouteName from "../../routes/Route.name";

const useMyProfileHook = () => {
  const [profileDetails, setProfileDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidePanel, setSidePanel] = useState(false);
  const [profileId, setProfileId] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
 
  const [taskLists, setTaskList] = useState(null);
 
  const userData = localStorage.getItem("user");
  const userObject = JSON.parse(userData);
  const [filterValue, setFilterValue] = useState("ALL"); // PENDING

  useEffect(() => {
    setIsLoading(true);
    serviceProfileDetail({ id: id ? id : userObject?.user?.id })
      .then((res) => {
        if (!res?.error) {
          setProfileDetails(res?.data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

 


  const handleEdit = useCallback((profile) => {
     historyUtils.push(`${RouteName.ADMIN_USER_UPDATE}${profile?.id}`);
  });

  const handleSideToggle = useCallback(
    (data) => {
      setSidePanel((e) => !e);
    },
    [setSidePanel] 
  );

  const handleDetailPage = useCallback((data) => {
    // historyUtils.push(`${RouteName.TASK_DETAIL}${data?.id}`);
  }, []);



  
  return {
    profileDetails,

    isLoading,
    isSidePanel,
    handleSideToggle,
    profileId,
    handleDetailPage,
    taskLists,
  
    filterValue,
    id,
    
  };
};

export default useMyProfileHook;
