import React, { useCallback, useMemo } from "react";
import { Button, IconButton } from "@mui/material";
import classNames from "classnames";
import { useSelector } from "react-redux";
import styles from "./Style.module.css";
import PageBox from "../../../components/PageBox/PageBox.component";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import { Add, Create, Details, Edit } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Card,
  CardContent,
  Tooltip,
  Typography,
} from "@mui/material";
import capitalizeFirstLetter from "../../../hooks/CommonFunction";
import useRoleListHook from "./RoleListHook";
import { ArrowPrimaryButton } from "../../../components/Buttons/PrimaryButton";
import StatusPill from "../../../components/Status/StatusPill.component";
import ImageStack from "../../../components/AvatarGroup/ImageStack";
import { CustomListHeader } from "../../../components/CustomListHeader/CustomListHeader";

const RoleList = (props) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleViewDetails,
    isCalling,
    configFilter,
    handleCreate,
    isSidePanel,
    handleDetail,
    handleEdit,
  } = useRoleListHook({});

  const {
    present,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.role);

  const renderFirstCell = useCallback((user) => {
  
    const tempEmailRender = user?.email ? (
      <span style={{ textTransform: "lowercase" }}>{user?.email}</span>
    ) : null;

    return (
      <div className={styles.firstCellFlex}>
        <div>
          <img src={user?.logo} alt="" crossOrigin="anonymous" />
        </div>
        <div className={classNames(styles.firstCellInfo, "openSans")}>
          <span>
            <strong>{`${user?.name}`}</strong>
          </span>{" "}
          <br />
          {tempEmailRender}
        </div>
      </div>
    );
  }, []);

  const renderAssociatedIndustriesName = useCallback(
    (industryData) => (
      <div className={styles.imageContainer}>
        <ImageStack industryData={industryData} />
      </div>
    ),
    []
  );

  const renderStatus = useCallback((status) => {
    if (status === "ACTIVE") {
      return <StatusPill status={"ACTIVE"} color={"active"} />;
    } else if (status === "INACTIVE") {
      return <StatusPill status={"INACTIVE"} color={"high"} />;
    }
  }, []);
  const tableStructure = useMemo(() => {
    return [
      {
        key: "name",
        label: "Name",
        sortable: false,
        render: (value, all) => <>{capitalizeFirstLetter(all?.name)} </>,
      },
      {
        key: "description",
        label: "Description",
        sortable: false,

        render: (temp, all) => (
          <div className={styles.description}>{all?.description} </div>
        ),
      },
      {
        key: "users",
        label: "Users",
        sortable: false,
        render: (temp, all) => (
          <>{renderAssociatedIndustriesName(all?.users)} </>
        ),
      },
      {
        key: "status",
        label: "Status",
        sortable: false,
        render: (temp, all) => <div>{renderStatus(all?.status)} </div>,
      },

      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <>
           <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                // handleSideToggle(all?.id);
                handleEdit(all);
              }}
            >
              <Edit fontSize={"small"} />
            </IconButton>
            {/* <IconButton
              className={"tableActionBtn"}
              color="secondary"
              disabled={isCalling}
              onClick={() => {
                // handleSideToggle(all?.id);
                handleDetail(all);
              }}
            >
              <Details fontSize={"small"} />
            </IconButton> */}
          </>
        ),
      },
    ];
  }, [renderAssociatedIndustriesName, isCalling, handleEdit]);

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
      count: allData.length,
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
    <>
      <div className={"plainPaper"}>
        <CustomListHeader
          title={"Create"}
          handleCreate={handleCreate}
          sideTitlle={"Roles List"}
        />
        <div>
          <FilterComponent
            is_progress={isFetching}
            filters={configFilter} // configFilter
            handleSearchValueChange={handleSearchValueChange}
            handleFilterDataChange={handleFilterDataChange}
          />

          <div>
            <br />

            <div style={{ width: "100%" }}>
              <DataTables
                {...tableData.datatable}
                {...tableData.datatableFunctions}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleList;
