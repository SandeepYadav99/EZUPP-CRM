import React, { useCallback, useMemo } from "react";
import {  IconButton } from "@mui/material";
import classNames from "classnames";
import { useSelector } from "react-redux";
import {

  Info as EditIcon,
  Info,
 
  OpenInNew as OpenInNewIcon,
  Edit,

} from "@mui/icons-material";
import addTask from "../../../assets/img/ic_add_task@2x.png";
import styles from "../Style.module.css";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import useUserListHook from "./UserListHook";
import capitalizeFirstLetter from "../../../hooks/CommonFunction";

import ShadowBox from "../../../components/ShadowBox/ShadowBox";
import StatusPill from "../../../components/Status/StatusPill.component";
import {

  CustomListHeader,
} from "../../../components/CustomListHeader/CustomListHeader";

const UserList = (props) => {
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
        label: "User Info",
       
        sortable: false,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "contact",
        label: "Contact",
        
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.email}
            <br />
            {all?.contact}
          </div>
        ),
      },
      {
        key: "designation",
        label: "Designation",
        
        sortable: false,
        render: (temp, all) => <div>{all?.designation}</div>,
      },
      {
        key: "role",
        label: "User Role",
       
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
        label: "Last Login",
        sortable: false,
        render: (temp, all) => <div>{all?.lastLoginText}</div>,
      },
      {
        key: "user_id",
        label: "Action",
        render: (temp, all) => (
          <div className={styles.actionButton}>
            <IconButton
              color="inherit"
            
              onClick={() => handleProfile(all)}
            >
              <Info fontSize={"small"} />
            </IconButton>
            <IconButton
            
            // onClick={() => handleProfile(all)}
            >
              <img src={addTask} alt="task" width={20} />
            </IconButton>
            <IconButton
              
              onClick={() => handleEdit(all)}
            >
              <Edit fontSize={"small"} />
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
      <ShadowBox width={"100%"}>
        <CustomListHeader
          title={"CREATE"}
          handleCreate={handleCreate}
          sideTitlle={"User List"}
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
      </ShadowBox>
    </div>
  );
};

export default UserList;
