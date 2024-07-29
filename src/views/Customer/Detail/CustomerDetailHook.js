import React from 'react'
import { useState, useEffect, useCallback, useMemo } from "react";
import { serviceGetTagsList } from "../../../services/Blogs.service";
import { serviceGetList } from "../../../services/index.services";
import {
  serviceGetContactDetails,serviceUpdateContact,

} from "../../../services/Contact.service";
import { useParams } from "react-router-dom";
import history from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
const initialForm = {
  
  interested_products: [],
  lead_stage: "New"
};
const CustomerDetailHook = () => {
  const [form, setForm] = useState({ ...initialForm });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDetailDialogOpen, setIsViewDetailDialogOpen] = useState(false);
  const [isCancelAppointmentDialogOpen, setIsCancelAppointmentDialogOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [selectedLead, setSelectedLead] = useState(" ");
  const [associateTagsData, setAssociateTagsData] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [customerDetails, setCustomerDetails] = useState(null);
  const { id } = useParams();
  const [listData, setListData] = useState({
    PRODUCTS: [],
  });
 


 

  useEffect(() => {
    serviceGetContactDetails({ id: id ? id : "" }).then((res) => {
      if (!res?.error) {
        setCustomerDetails(res?.data?.details);
      }
    });
  }, [id]);

  const handleEdit = useCallback(() => {
    if (id) {
    
      history.push(`${RouteName.CUSTOMER_UPDATE}${id}`);
    } else {
      console.error('ID is undefined');
    }
  }, [id, history]);

  useEffect(() => {
    (async () => {
      const promises = await Promise.allSettled([
        serviceGetTagsList(),
        serviceGetList(["PRODUCTS"]),
      ]);
      const tagList = promises[0]?.value?.data || [];
      const ProductList = promises[1]?.value?.data;
     
       setAssociateTagsData([...tagList]);
      setListData(ProductList);
      
      console.log("PRODUCT LIST", ProductList);
    })();
  }, []);

  const openDialog = useCallback((name) => {
    setIsDialogOpen(true);
    
  }, [setIsDialogOpen]);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, [setIsDialogOpen]);

  const handleSubmit = () => {
    // Handle submit logic here
    closeDialog();
  };

  const openViewDetailDialog = useCallback((detail) => {
    setSelectedDetail(detail);
    setIsViewDetailDialogOpen(true);
  }, []);

  const closeViewDetailDialog = useCallback(() => {
    setIsViewDetailDialogOpen(false);
  }, []);

  const openCancelAppointmentDialog = useCallback((detail) => {
    setSelectedDetail(detail);
    setIsCancelAppointmentDialogOpen(true);
  }, []);

  const closeCancelAppointmentDialog = useCallback(() => {
    setIsCancelAppointmentDialogOpen(false);
  }, []);

  const handleCancelAppointmentClick = (appointment) => {
    closeViewDetailDialog();
    openCancelAppointmentDialog(appointment);
  };

  const handleGoBackClick = (appointment) => {
    closeCancelAppointmentDialog();
    openViewDetailDialog(appointment);
  };

  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
     if (fieldName === "interested_products") {
       
        t[fieldName] = text;
      } else {
        t[fieldName] = text;
      }

      setForm(t);
      
    },
    [form, setForm]
  );
  return {
    openDialog,
    closeDialog,
    handleSubmit,
    isDialogOpen,
    openViewDetailDialog,
    closeViewDetailDialog,
    isViewDetailDialogOpen,
    openCancelAppointmentDialog,
    closeCancelAppointmentDialog,
    isCancelAppointmentDialogOpen,
    handleCancelAppointmentClick,
    handleGoBackClick,
    listData,
    tagList,
    associateTagsData,
    form,
    changeTextData,
    id,
    customerDetails,
    handleEdit,
  };
};

export default CustomerDetailHook