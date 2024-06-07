import React, { useCallback, useEffect, useState } from "react";
import historyUtils from "../../libs/history.utils";
import { useParams } from "react-router-dom";
import RouteName from "../../routes/Route.name";
import { useDispatch} from "react-redux";
import { serviceGetProductDetails } from "../../services/Product.service";
import { actionDeleteProduct} from "../../actions/Product.action";
import {serviceDeleteProduct} from "../../services/Product.service";
import SnackbarUtils from "../../libs/SnackbarUtils";
const useProductDetailHook = () => {
  const [profileDetails, setProfileDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidePanel, setSidePanel] = useState(false);
  const [profileId, setProfileId] = useState(null);
  const [editData, setEditData] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };
  
  const closeDialog = () => {
    setIsDialogOpen(false);
  };
  
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

  // const handleDelete = useCallback(
  //   (id) => {
  //     dispatch(actionDeleteProduct(id));
  //     setEditData(null);
  //   },
  //   [setEditData]
  // );
  const handleDelete = useCallback(
    async (id) => {
      if (id) {

        const formattedId = String(id);
  
        try {
          const response = await serviceDeleteProduct({ id: formattedId });
  
          if (!response.error) {
            console.log(`Product with id: ${formattedId} deleted successfully.`);
            window.location.reload();
          } else {
            SnackbarUtils.error(response.message);
          }
        } catch (error) {
          console.error('Error deleting unit:', error);
        }
      }
    },
    
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
    openDialog,
    closeDialog,
    isDialogOpen,
  };
};

export default useProductDetailHook;
