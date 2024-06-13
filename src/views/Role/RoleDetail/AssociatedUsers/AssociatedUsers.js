import React, { useCallback, useMemo } from "react";

import DataTables from "../../../../Datatables/Datatable.table";
import Constants from "../../../../config/constants";
import styles from "./Style.module.css";
import classNames from "classnames";
import { useSelector } from "react-redux";
import StatusPill from "../../../../components/Status/StatusPill.component";
import useAssociatedUsersHook from "./AssociatedUsersHook";
import { IconButton, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import { useTheme } from "@mui/styles";

const AssociatedUsers = ({ listData, id }) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleViewDetails,
    isCalling,
  } = useAssociatedUsersHook({ listData, id });
  const theme = useTheme();
  const {
    present,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.associatedManufactures);

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

  const tableStructure = useMemo(() => {
    return [
      {
        key: "user_info",
        label: "User Info",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.image}>
            <img src={all?.image} className={styles.imageContainer} />

            <div style={{ marginLeft: "3px" }}> {all?.first_name} </div>
            <div style={{ marginLeft: "5px" }}>{all?.last_name}</div>
          </div>
        ),
      },
      {
        key: "contact",
        label: "Contact",
        sortable: false,
        render: (temp, all) => <div>{all?.business?.company_name}</div>,
      },
      {
        key: "department_designation",
        label: "Department/ Designation",
        sortable: false,
        render: (temp, all) => <div>{all?.membership_type}</div>,
        //  candidate?.applied_date
      },

      {
        key: "status",
        label: "Status",
        sortable: false,
        render: (temp, all) => <StatusPill status={all?.status} />,
      },
      {
        key: "action",
        label: "Action",
        sortable: false,
        render: (temp, all) => (
          <div>
            <IconButton>
              <Edit fontSize="small" />
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
      data: present || [],
      count: allData?.length || 1,
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
   
    <ShadowBox width={"100%"}>
      <Typography fontSize={18} margin={theme.spacing(1)}>
        Associated Users
      </Typography>
      <div style={{width:"100%"}}>
        <DataTables
          {...tableData.datatable}
          {...tableData.datatableFunctions}
        />
      </div>
    </ShadowBox>
     
   
  );
};

export default AssociatedUsers;
