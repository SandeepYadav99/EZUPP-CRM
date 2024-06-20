import React, { useCallback, useMemo } from "react";

import DataTables from "../../../../Datatables/Datatable.table";
import Constants from "../../../../config/constants";
import styles from "./Style.module.css";
import classNames from "classnames";
import { useSelector } from "react-redux";

import useAssociatedUsersHook from "./AssociatedUsersHook";
import { IconButton, Typography } from "@mui/material";
import { Edit, Info } from "@mui/icons-material";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import { useTheme } from "@mui/styles";
import StatusPill from "../../../../components/Status/StatusPill.component";
import history from "../../../../libs/history.utils";

const AssociatedUsers = ({ listData, id }) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleViewDetails,
    isCalling,
    data,
    currentData,
    currentPage
  } = useAssociatedUsersHook({ listData, id });
  const theme = useTheme();
  // const {
  //   present,
  //   all: allData,
  //   currentPage,
  //   is_fetching: isFetching,
  // } = useSelector((state) => state.associatedManufactures);

 
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
            <img
              src={all?.image}
              className={styles.imageContainer}
              crossOrigin="anonymous"
              alt="..."
            />

            <Typography variant="body1"> {all?.name} </Typography>
          </div>
        ),
      },
      {
        key: "contact",
        label: "Contact",
        sortable: false,
        render: (temp, all) => <div>{all?.contact}</div>,
      },
      {
        key: "department_designation",
        label: "Department/ Designation",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.depatment || "N/A"} / {all?.designation || "N/A"}
          </div>
        ),
        //  candidate?.applied_date
      },

      {
        key: "status",
        label: "Status",
        sortable: false,
        render: (temp, all) => (
          <StatusPill
            status={all?.status}
            color={all?.status === "ACTIVE" ? "active" : "high"}
          />
        ),
      },
      {
        key: "action",
        label: "Action",
        sortable: false,
        render: (temp, all) => (
          <div>
            <IconButton onClick={()=>history.push(`/profile/?id=${all?.id}`)}>
              <Info fontSize="small" />
            </IconButton>
          </div>
        ),
      },
    ];
  }, [renderFirstCell, handleViewDetails, handleEdit, isCalling]);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
    };
    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: currentData,
      count: data.length,
      page: currentPage - 1,
      rowsPerPage: 10,
      allRowSelected: false,
      showSelection: false,
    };

    return { datatableFunctions, datatable };
  }, [
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    data,
    currentPage,
    currentData
  ]);

  return (
    <ShadowBox width={"100%"}>
      <Typography variant="h4" sx={{mb:2}}  fontWeight={600} color={theme.palette.text.primary} margin={theme.spacing(1)}>
        Associated Users
      </Typography>
      <div style={{ width: "100%" }}>
        <DataTables
          {...tableData.datatable}
          {...tableData.datatableFunctions}
        />
      </div>
    </ShadowBox>
  );
};

export default AssociatedUsers;
