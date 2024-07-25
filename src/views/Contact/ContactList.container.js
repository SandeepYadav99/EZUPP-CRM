import React, { useCallback, useMemo , useState} from "react";
import { Button, IconButton } from "@mui/material";
import classNames from "classnames";
import { useSelector } from "react-redux";
import {
  Add,
  Info as EditIcon,
  OpenInNew as OpenInNewIcon,
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
import ContactCreatehook from "./Create/ContactCreatehook";
const ContactList = (props) => {
  const {
    handleSortOrderChange,
    handleRowSize,
    handlePageChange,
    handleDetail,
    handleFilterDataChange,
    handleSearchValueChange,
    handleProfile,
    configFilter,
    handleCreate,
  } = useUserListHook({});
//const{getProductNames, productMap}= ContactCreatehook({});
  const {
    present,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.contact);


  const renderFirstCell = useCallback((user) => {
    return (
      <div className={styles.firstCellFlex}>
        {/* <img src={user.image} alt="" crossOrigin="anonymous" /> */}

        <div className={classNames(styles.firstCellInfo, "openSans")}>
          <div>{`${capitalizeFirstLetter(user?.full_name)}`} </div>
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
  const renderStatus = useCallback((lead_stage) => {
    if (lead_stage === "PENDING") {
      return <StatusPill status={"Pending"} color={"medium"} />;
    } else if (lead_stage === "IN_PROGRESS") {
      return <StatusPill status={"In Progress"} color={"active"} />;
    }
    else if (lead_stage === "PROPOSAL_SENT") {
      return <StatusPill status={"Proposal Sent"} color={"proposal"} />;
    }
    else if (lead_stage === "ARCHIVED") {
      return <StatusPill status={"Archived"} color={"service"} />;
    }
    else if (lead_stage === "CUSTOMER") {
      return <StatusPill status={"Customer"} color={"draft"} />;
    }
   
  }, []);

  const tableStructure = useMemo(
    () => [
      {
        key: "full_name",
        label: "Name",
        sortable: false,
        render: (value, all) => <div>{renderFirstCell(all)}</div>,
      },
      {
        key: "contact",
        label: "Contact Info",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.full_contact}
            <br />
            {all?.email}
          </div>
        ),
      },
      {
        key: "source",
        label: "Source",
        sortable: false,
        render: (temp, all) => (
          <div>
            {all?.source}
           
          </div>
        ),
      },
      {
        key: "interestedProducts",
        label: "Interest Area",
        sortable: false,
        render: (temp, all) => (
         
         
          <div className={styles.prodWrpa}>
            
            { console.log("interested_products:", all?.interested_products)}
            {all?.interestedProducts?.map((item, index) => (
              // <Typography
              //   variant={"body2"}
              //   className={styles.tags}
              //   key={`interestedProducts_${index}`}
              // >
              //   {item?.name}
              // </Typography>
              <StatusPill status={item?.name} color={"service"} />
              
            ))}
          </div>
        
        ),
        
      },
      {
        key: "lead_stage",
        label: "Status",
        sortable: false,
        render: (temp, all) => <div>{renderStatus(all.lead_stage)}</div>,
      },
      //   {
      //     key: "last_login",
      //     label: "Last Updated At",
      //     sortable: false,
      //     render: (temp, all) => <div>{all?.updatedAtText?.split(' ')[0]}<br/>{all?.updatedAtText?.split(' ')[1]}</div>,
      //   },
        // {
        //   key: "user_id",
        //   label: "Action",
        //   render: (temp, all) => (
        //     <div className={styles.actionButton}>
        //       <IconButton

        //         onClick={() => handleDetail(all)}
        //       >
        //         {/* <Edit fontSize={"small"} /> */}
        //       </IconButton>
             
        //     </div>
        //   ),
        // },
    ],
    [renderFirstCell, renderStatus, handleDetail, handleProfile, handleDelete]
  );
  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
      clickableRow: handleDetail,
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
