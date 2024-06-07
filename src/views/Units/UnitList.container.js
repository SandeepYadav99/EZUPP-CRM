import React, { useCallback, useMemo } from "react";
import { Button, IconButton } from "@mui/material";
import classNames from "classnames";
import { useSelector } from "react-redux";

import {
  Add,
  Info as EditIcon,
  Info,
  Person,
  OpenInNew as OpenInNewIcon,
  Edit,
  Topic, 
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import removeTask from "./../../assets/Assets/ic_delete@2x.png";
import styles from "./Style.module.css";
import DataTables from "./../../Datatables/Datatable.table";
import Constants from "./../../config/constants";
import FilterComponent from "./../../components/Filter/Filter.component";
import useUserListHook from "./UnitListHook";
import useUnitCreateHook from "./Create/UnitCreate.hook";
import capitalizeFirstLetter from "./../../hooks/CommonFunction";
import { ArrowPrimaryButton } from "./../../components/Buttons/PrimaryButton";
import StatusPill from "./../../components/Status/StatusPill.component";
import SidePanelComponent from "../../components/SidePanel/SidePanel.component";
import EventForm from "./Create/UnitCreate.view";
import { serviceDeleteProduct } from "../../services/Product.service";
import ShadowBox from "../../components/ShadowBox/ShadowBox";
const UnitsList = (props) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    isSidePanel,
    handleSideToggle,
    handlePageChange,
    handleEdit,
    handleEditSidePannel,
    handleFilterDataChange,
    handleSearchValueChange,
    handleProfile,
    configFilter,
    handleCreate,
    editData,
    handleDrag,
  } = useUserListHook({});
  const { handleDelete } = useUnitCreateHook({});
  const editDataId = editData ? editData.id : null;

  const {
    present,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.unit);

  const renderFirstCell = useCallback((user) => {
    return (
      <div className={styles.firstCellFlex}>
        {/* <img src={user.image} alt="" crossOrigin="anonymous" /> */}

        <div className={classNames(styles.firstCellInfo, "openSans")}>
          <div>{`${capitalizeFirstLetter(user?.name)}`} </div>
          <div> {user?.employee_id}</div>
        </div>
      </div>
    );
  }, []);
  // const handleDelete = (all) => {
  //   let params = {
  //     id: all?.id,
  //   };
  //   serviceDeleteProduct(params);
  // };
  const renderStatus = useCallback((status) => {
    if (status === "ACTIVE") {
      return <StatusPill status={"ACTIVE"} color={"active"} />;
    } else if (status === "INACTIVE") {
      return <StatusPill status={"INACTIVE"} color={"high"} />;
    }
  }, []);

  const tableStructure = useMemo(
    () => [
      {
        key: "name",
        label: "Unit Name",
        sortable: false,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "is_general",
        label: "Is General",
        sortable: false,
        render: (temp, all) => <div>{all?.is_general ? "Yes" : "No"}</div>,
      },

      {
        key: "status",
        label: "Status",
        sortable: false,
        render: (temp, all) => <div>{renderStatus(all.status)}</div>,
      },

      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div className={styles.actionButton}>
            <IconButton
              // disabled={is_calling}

              onClick={(e) => {
                e.stopPropagation()
                handleEditSidePannel(all)}}
            >
              <Edit fontSize={"small"} />
            </IconButton>
            {/* <IconButton onClick={()=>handleDelete(all) }>
              <img src={removeTask} alt="task" width={20} />
            </IconButton> */}
          </div>
        ),
      },
    ],
    [
      renderFirstCell,
      renderStatus,
      handleEdit,
      handleProfile,
      handleDelete,
      handleEditSidePannel,
    ]
  );
  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
      handleDrag: handleDrag,
      clickableRow:handleEditSidePannel
    };
    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: present,
      count: allData.length,
      page: currentPage,
      draggable: true,
    };

    return { datatableFunctions, datatable };
  }, [
    allData,
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleDelete,
    handleRowSize,
    present,
    currentPage,
    handleDrag,
  ]);
  const panelTitle = editData ? "Update Unit" : "New Unit";
  return (
    <div>
      <ShadowBox className={styles.unit}>
        <div className={styles.headerContainer}>
          <Typography
            variant={"title"}
            color={"text.primary"}
            className={styles.title}
          >
            Unit List
          </Typography>
          <ArrowPrimaryButton
            // onClick={handleCreate}
            onClick={handleSideToggle}
            icon={<Add fontSize="normal" />}
          >
            CREATE
          </ArrowPrimaryButton>
          <SidePanelComponent
            handleToggle={handleSideToggle}
            title={panelTitle}
            open={isSidePanel}
            side={"right"}
          >
            <EventForm
              isOpen={isSidePanel}
              handleToggleSidePannel={handleSideToggle}
              editData={editData}
              isEdit={!!editData}
              handleDelete={handleDelete}
              id={editData?.id ? editData?.id : ""}
            />
          </SidePanelComponent>
        </div>
        <div>
          <FilterComponent
            is_progress={isFetching}
            filters={configFilter}
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
    </div>
  );
};

export default UnitsList;
