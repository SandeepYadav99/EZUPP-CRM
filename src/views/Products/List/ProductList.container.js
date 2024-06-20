import React, { useCallback, useMemo, useState } from "react";
import { Dialog, IconButton } from "@mui/material";
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
import taskDetail from "../../../assets/Assets/ic_info@2x.png";
import styles from "../Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import useUserListHook from "./ProductListHook";
import capitalizeFirstLetter from "../../../hooks/CommonFunction";
import { ArrowPrimaryButton } from "../../../components/Buttons/PrimaryButton";
import StatusPill from "../../../components/Status/StatusPill.component";
import { serviceDeleteProduct } from "../../../services/Product.service";
import ShadowBox from "../../../components/ShadowBox/ShadowBox";
import {
  ActionButton,
  PrimaryButton,
} from "./../../../components/Buttons/PrimaryButton";
import DeleteDialog from "./component/DeleteDialog/DeleteDialog";
import { useTheme } from "@mui/styles";
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
    handleCreate,
    openDialog,
    closeDialog,
    isDialogOpen,
  } = useUserListHook({});

  const {
    present,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.product);
  const [productToDelete, setProductToDelete] = useState(null);
  const theme = useTheme();
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

  const handleDelete = (all) => {
    let params = {
      id: productToDelete?.id,
    };
    serviceDeleteProduct(params).then(() => {
      closeDialog();
      setProductToDelete(null);
      window.location.reload();
    });
  };
  const renderStatus = useCallback((status) => {
    if (status === "ACTIVE") {
      return <StatusPill status={"ACTIVE"} color={"active"} />;
    } else if (status === "DELETED") {
      return <StatusPill status={"DELETED"} color={"high"} />;
    } else if (status === "DRAFT") {
      return <StatusPill status={"DRAFT"} color={"draft"} />;
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
        key: "product_code",
        label: "Product Code",
        sortable: false,
        render: (temp, all) => <div>{all?.code}</div>,
      },
      {
        key: "role",
        label: "Type",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
      },
      {
        key: "productLink",
        label: "Link",
        sortable: false,
        render: (temp, all) => (
          <div className={styles.breakWord}>
            {" "}
            {all?.product_link ? (
            <a
              href={all?.product_link}
              style={{ color: theme.palette.primary.main }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                window.open(all?.product_link, "_blank", "noopener,noreferrer");
              }}
            >
              {all?.product_link}
            </a>
             ) : (
              "N/A"
            )}
          </div>
        ),
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
        render: (temp, all) => (
          <div>
            {all?.updatedAtText ? (
            <>
            {all?.updatedAtText?.split(" ")[0]}
            <br />
            {all?.updatedAtText?.split(" ")[1]}
            </>
            ) : (
              "N/A"
            )}
          </div>
        ),
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div className={styles.actionButton}>
            <IconButton
              // disabled={is_calling}
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(all);
              }}
            >
              {/* <Edit fontSize={"small"} /> */}
              <img src={taskDetail} alt="task" width={20} />
            </IconButton>
            {all?.status !== "DELETED" && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setProductToDelete(all);
                  openDialog();
                }}
              >
                <img src={removeTask} alt="task" width={20} />
              </IconButton>
            )}
          </div>
        ),
      },
    ],
    [renderFirstCell, renderStatus, handleEdit, handleProfile, handleDelete]
  );
  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
      clickableRow: handleEdit,
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
    handleDelete,
    present,
    currentPage,
  ]);

  return (
    <div>
      <ShadowBox className={styles.product}>
        <div className={styles.headerContainer}>
          <Typography
            variant={"title"}
            color={"text.primary"}
            className={styles.title}
          >
            Product List
          </Typography>
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
      </ShadowBox>
      <DeleteDialog
        isOpen={isDialogOpen}
        handleCLose={closeDialog}
        handleSubmit={handleDelete}
      />
    </div>
  );
};

export default ProductList;
