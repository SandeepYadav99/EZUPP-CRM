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
import styles from "./Styles.module.css";
import DataTables from "./../../Datatables/Datatable.table";
import Constants from "./../../config/constants";
import FilterComponent from "./../../components/Filter/Filter.component";
import useUserListHook from "./ContactListHook";
import capitalizeFirstLetter from "./../../hooks/CommonFunction";
import { ArrowPrimaryButton } from "./../../components/Buttons/PrimaryButton";
import StatusPill from "./../../components/Status/StatusPill.component";
import { serviceDeleteProduct } from "./../../services/Product.service";
import ShadowBox from "../../components/ShadowBox/ShadowBox";
import BasicButtonGroup from "../../components/BasicButtonGroup/BasicButtonGroup";
const ContactList = (props) => {
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
  } = useUserListHook({});

  const {
    present,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.product);

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
  const handleDelete = (all) => {
    let params = {
      id: all?.id,
    };
    serviceDeleteProduct(params);
  };
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
        label: "Lead Info",
        sortable: false,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "product_code",
        label: "Contact",
        sortable: false,
        render: (temp, all) => <div>{all?.code}</div>,
      },
      {
        key: "role",
        label: "Interest Area",
        sortable: false,
        render: (temp, all) => <div>{all?.type}</div>,
      },
      {
        key: "productLink",
        label: "Activity",
        sortable: false,
        render: (temp, all) => <div>{all?.product_link}</div>,
      },
      {
        key: "status",
        label: "Status",
        sortable: false,
        render: (temp, all) => <div>{renderStatus(all.status)}</div>,
      },
      //   {
      //     key: "last_login",
      //     label: "Last Updated At",
      //     sortable: false,
      //     render: (temp, all) => <div>{all?.updatedAtText?.split(' ')[0]}<br/>{all?.updatedAtText?.split(' ')[1]}</div>,
      //   },
      //   {
      //     key: "user_id",
      //     label: "Action",
      //     render: (temp, all) => (
      //       <div className={styles.actionButton}>
      //         <IconButton

      //           onClick={() => handleEdit(all)}
      //         >
      //           <Edit fontSize={"small"} />
      //         </IconButton>
      //         <IconButton onClick={()=>handleDelete(all)  }>

      //         </IconButton>
      //       </div>
      //     ),
      //   },
    ],
    [renderFirstCell, renderStatus, handleEdit, handleProfile, handleDelete]
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
    handleDelete,
    present,
    currentPage,
  ]);

  return (
    <ShadowBox className={styles.contact}>
      {/* <div className={"plainPaper"}> */}
      <div className={styles.headerContainer}>
        <Typography
          variant={"title"}
          color={"text.primary"}
          className={styles.title}
        >
          Contact List
        </Typography>
        <ArrowPrimaryButton
          onClick={handleCreate}
          icon={<Add fontSize="normal" />}
        >
          CREATE
        </ArrowPrimaryButton>
      </div>
      <br></br>
      <br></br>
      <BasicButtonGroup
        buttonText={[
          "Pending",
          "In Progress",
          "Proposal Sent",
          "Archived",
          "Customers",
          "All",
        ]}
        selectedIndex={5}
        onButtonClick={(index) => console.log(`Button ${index} clicked`)}
      />
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
      {/* </div> */}
    </ShadowBox>
  );
};

export default ContactList;
