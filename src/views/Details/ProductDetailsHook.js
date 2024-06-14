import React, { useCallback, useEffect, useState } from "react";
import historyUtils from "../../libs/history.utils";
import { useParams } from "react-router-dom";
import RouteName from "../../routes/Route.name";
import { useDispatch } from "react-redux";
import { serviceGetProductDetails } from "../../services/Product.service";
import { actionDeleteProduct } from "../../actions/Product.action";
import { serviceDeleteProduct } from "../../services/Product.service";
import SnackbarUtils from "../../libs/SnackbarUtils";
import history from "../../libs/history.utils";
const useProductDetailHook = () => {
  const [profileDetails, setProfileDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidePanel, setSidePanel] = useState(false);
  const [profileId, setProfileId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [editId, setEditId] = useState("");
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

  // const handleEdit = useCallback(
  //   (data) => {
      
  //     history.push(`${RouteName.PRODUCT_UPDATE}${data?.id}`)
  //   },
  //   [setEditData, setEditId]
  // );
  const handleEdit = useCallback(() => {
    if (id) {
      history.push(`${RouteName.PRODUCT_UPDATE}${id}`);
    } else {
      console.error('ID is undefined');
    }
  }, [id, history]);


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
  const handleDelete = useCallback(() => {
    if (id) {
      const response = serviceDeleteProduct({ id: id });
      if (!response.error) {
        console.log(`Deleted successfully.`);
        historyUtils.goBack();
        // window.location.reload();
      } else {
        SnackbarUtils.error(response.message);
      }
    }
  }, [id]);

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
    handleEdit
  };
};

export default useProductDetailHook;
