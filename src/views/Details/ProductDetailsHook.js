import React, { useCallback, useEffect, useState } from "react";
import historyUtils from "../../libs/history.utils";
import { useParams } from "react-router-dom";
import RouteName from "../../routes/Route.name";
import { serviceGetProductDetails } from "../../services/Product.service";

const useProductDetailHook = () => {
  const [profileDetails, setProfileDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidePanel, setSidePanel] = useState(false);
  const [profileId, setProfileId] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    serviceGetProductDetails({ id: id ? id : "" }).then((res) => {
      if (!res?.error) {
        setProfileDetails(res?.data?.details);
      }
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
    id,
  };
};

export default useProductDetailHook;
