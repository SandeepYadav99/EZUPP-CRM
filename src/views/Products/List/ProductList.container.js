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
import removeTask from "../../../assets/Assets/ic_delete@2x.png";
import styles from "../Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import useUserListHook from "./ProductListHook";
import capitalizeFirstLetter from "../../../hooks/CommonFunction";
import {
  ActionButton,
  ArrowPrimaryButton,
  PrimaryButton,
} from "../../../components/Buttons/PrimaryButton";
import StatusPill from "../../../components/Status/StatusPill.component";

const ProductList = (props) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleEdit,
    handleFilterDataChange,
    handleSearchValueChange,
    handleProfile,
    configFilter,
    isSidePanel,
    handleSideToggle,
    handleCreate,
  } = useUserListHook({});

  const {
    present,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.provider_user);

  const renderFirstCell = useCallback((user) => {
    return (
      <div className={styles.firstCellFlex}>
        <img src={user.image} alt="" crossOrigin="anonymous" />

        <div className={classNames(styles.firstCellInfo, "openSans")}>
          <div>{`${capitalizeFirstLetter(user?.name)}`} </div>
          <div> {user?.employee_id}</div>
        </div>
      </div>
    );
  }, []);

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
        label: "Product Info",
        sortable: false,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "role",
        label: "Type",
        sortable: false,
      },
      {
        key: "productLink",
        label: "Link",
        sortable: false,
        render: (temp, all) => <div>{all?.productLink}</div>,
      },
      {
        key: "role",
        label: "Measure Unit",
        sortable: false,
        render: (temp, all) => <div>{all?.role?.name}</div>,
      },

      {
        key: "status",
        label: "Status",
        sortable: false,
        render: (temp, all) => <div>{renderStatus(all.status)}</div>,
      },
      {
        key: "last_login",
        label: "Last Updated At",
        sortable: false,
        render: (temp, all) => <div>{all?.lastLoginText}</div>,
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div className={styles.actionButton}>
            <IconButton
              // disabled={is_calling}
              onClick={() => handleEdit(all)}
            >
              <Edit fontSize={"small"} />
            </IconButton>
            <IconButton
            >
              <img src={removeTask} alt="task" width={20} />
            </IconButton>
            
          </div>
        ),
      },
    ],
    [renderFirstCell, renderStatus, handleEdit, handleProfile]
  );
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
    <div>
      <div className={"plainPaper"}>
        <div className={styles.headerContainer}>
          <Typography variant={"title"} color={"text.primary"} className={styles.title}>Product List</Typography>
          <ArrowPrimaryButton
            onClick={handleCreate}
            icon={<Add fontSize="normal" />}
          >
            CREATE
          </ArrowPrimaryButton>
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
      </div>
    </div>
  );
};

export default ProductList;