import React, { useCallback, useMemo, useState } from "react";
import { Avatar,  IconButton } from "@mui/material";
import classNames from "classnames";
import { useSelector } from "react-redux";
import styles from "./Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import {
 
  Edit,
  Info,

} from "@mui/icons-material";

import capitalizeFirstLetter from "../../../hooks/CommonFunction";
import useRoleListHook from "./RoleListHook";

import StatusPill from "../../../components/Status/StatusPill.component";
import ImageStack from "../../../components/AvatarGroup/ImageStack";
import { CustomListHeader } from "../../../components/CustomListHeader/CustomListHeader";
import ShadowBox from "../../../components/ShadowBox/ShadowBox";
import ImageStackPopUp from "./ImageStackPopUp/ImageStackPopUp";
import { useTheme } from "@mui/styles";

const RoleList = (props) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    isCalling,
    configFilter,
    handleCreate,
    handleDetail,
    handleEdit,
    openProfilePopUp,
    isOpenImageStack,
  } = useRoleListHook({});
  const [renderImageStackData, setRenderImageStackData] = useState([]);
  const theme = useTheme();
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
        {industryData?.length > 0  ? 
        <ImageStack
          industryData={industryData}
          open={isOpenImageStack}
          openProfilePopUp={openProfilePopUp}
        /> : <Avatar src={require("../../../assets/img/profile.png")}   sx={{
          marginLeft: theme.spacing(-1),
         
          
        }}></Avatar>}
      </div>
    ),
    [isOpenImageStack, openProfilePopUp]
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
        key: "display_name",
        label: "Display Name",
        sortable: false,
        render: (value, all) => (
          <>{capitalizeFirstLetter(all?.display_name)} </>
        ),
      },
      {
        key: "description",
        label: "Description",
        sortable: false,

        render: (temp, all) => (
          <div className={styles.description}>{all?.description || "N/A"} </div>
        ),
      },
      {
        key: "users",
        label: "Users",
        sortable: false,
        render: (temp, all) => (
          <div onClick={() => setRenderImageStackData(all?.users)}>
            {renderAssociatedIndustriesName(all?.users)}{" "}
          </div>
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
           
              disabled={isCalling}
              onClick={() => {
                // handleSideToggle(all?.id);
                handleDetail(all);
              }}
            >
              <Info fontSize={"small"} color={theme.palette.text.primary} />
            </IconButton>
            <IconButton
             
              disabled={isCalling}
              onClick={() => {
                // handleSideToggle(all?.id);
                handleEdit(all);
              }}
            >
              <Edit fontSize={"small"}  color={theme.palette.text.primary}/>
            </IconButton>
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
      <ShadowBox width={"100%"}>
        <CustomListHeader
          title={"CREATE"}
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
      </ShadowBox>
      {renderImageStackData.length > 2 && (
        <ImageStackPopUp
          open={isOpenImageStack}
          handleClose={openProfilePopUp}
          industryData={renderImageStackData}
        />
      )}
    </>
  );
};

export default RoleList;
