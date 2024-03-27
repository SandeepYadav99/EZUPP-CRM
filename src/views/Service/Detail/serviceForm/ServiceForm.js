/**
 * Created by sandeep.electrovese@gmail.com on 11/02/2020.
 */
import React, { Component, useCallback, useMemo } from "react";
import { Button, ButtonBase, IconButton, withStyles } from "@material-ui/core";
import {  Info as EditIcon } from "@material-ui/icons";
import DataTables from "../../../../Datatables/Datatable.table";
import Constants from "../../../../config/constants";
import styles from "./Style.module.css";
import classNames from "classnames";



import { useSelector } from "react-redux";


import useServiceFormHook from "./ServiceFormHook";
import StatusPill from "../../../../components/Status/StatusPill.component";

const ServiceForm = ({ listData, id }) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleViewDetails,
    isCalling,
  } = useServiceFormHook({ listData, id });

  const {
    present,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.ServiceForm);

  const renderStatus = useCallback((status) => {
    return <StatusPill status={status} />;
  }, []);

  const renderFirstCell = useCallback((product) => {
    if (product) {
      return (
        <div className={styles.firstCellFlex}>
          <div className={classNames(styles.firstCellInfo, "openSans")}>
            <span>
              <strong></strong>
            </span>{" "}
            <br />
          </div>
        </div>
      );
    }
    return null;
  }, []);

  // const getstatusColor = (status) => {
  //   switch (status) {
  //     case 'RESOLVED':
  //       return '#008000';
  //     case 'PENDING':
  //       return '#FFA500';
  //       case 'Reject':
  //         return '#FF0000';
  //     default:
  //       return '#FFFFFF'; 
  //   }
  // };

  const getstatusColor = (status) => {
    switch (status) {
      case 'RESOLVED':
        return 'white';
      case 'PENDING':
        return 'white';
        case 'Reject':
          return '#FF0000';
      default:
        return '#FFFFFF'; 
    }
  };

  const tableStructure = useMemo(() => {
    
    return [
      {
        key: "customer_name",
        label: "Customer Name",
        sortable: false,
        render: (temp, all) => <div>{all?.name}</div>,
      },
      {
        key: "customer_name",
        label: "Customer details",
        sortable: false,
        render: (temp, all) => <div>{all?.contact}<br></br>{all?.email} </div>,
       
      },
      {
        key: "interested_in",
        label: "Interested In",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
      },
      {
        key: "industry",
        label: "Industry",
        sortable: false,
        render: (temp, all) => <div>{all?.industry?.name}</div>,
      },
      {
        key: "business_name",
        label: "Business Name",
        sortable: false,
        render: (temp, all) => <div>{all?.business_name}</div>,
      },
      {
        key: "message",
        label: "Message",
        sortable: false,
        render: (temp, all) => <div >{all?.message}</div>,
        //  candidate?.applied_date
      },
      {
        key: "received_on",
        label: "Received On",
        sortable: false,
        render: (temp, all) => <div>{all?.createdAt || "N/A"}</div>,
      },
      {
        key: "Status",
        label: "Status",
        sortable: false,
        render: (temp, all) => <div style={{ backgroundColor: getstatusColor(all?.action),  fontSize: "20px",
        color: "#20c997",
        background: "rgba(32,201,151,.1)",
        padding: "3px 10px",
        borderRadius: "0px",
        textTransform: "capitalize",   }}>{all?.action || "N/A"}</div>,
      },
   
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            <IconButton
              className={"tableActionBtn"}
              color="secondary"
              // disabled={all.status != 'ACTIVE'}
              onClick={() => {
                handleEdit(all);
              }}
            >
              <EditIcon fontSize={"small"} className={styles.black} />
            </IconButton>
          </div>
        ),
      },
    
  
    ];
  }, [renderStatus, renderFirstCell, handleViewDetails, handleEdit, isCalling]);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
    };
    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: present,
      count: allData?.length,
      page: currentPage,
    };

    return { datatableFunctions, datatable };
  }, [
    allData,
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    present,
    currentPage,
  ]);

  return (
    <div>
      <div style={{ width: "100%" }}>
        <DataTables
          {...tableData.datatable}
          {...tableData.datatableFunctions}
        />
      </div>
    </div>
  );
};

export default ServiceForm;
