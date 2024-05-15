import React, { useCallback, useEffect, useState } from "react";
import historyUtils from "../../libs/history.utils";
import { useParams } from "react-router-dom";
import RouteName from "../../routes/Route.name";
import { useDispatch} from "react-redux";
import { serviceGetProductDetails } from "../../services/Product.service";
import { actionDeleteProduct} from "../../actions/Product.action";
const useProductDetailHook = () => {
  const [profileDetails, setProfileDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidePanel, setSidePanel] = useState(false);
  const [profileId, setProfileId] = useState(null);
  const [editData, setEditData] = useState(null);
  const dispatch = useDispatch();
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

  const handleDelete = useCallback(
    (id) => {
      dispatch(actionDeleteProduct(id));
      setEditData(null);
    },
    [setEditData]
  );

  return {
    profileDetails,
    isLoading,
    isSidePanel,
    handleSideToggle,
    profileId,
    handleDetailPage,
    handleDelete,
    id,
  };
};

export default useProductDetailHook;
