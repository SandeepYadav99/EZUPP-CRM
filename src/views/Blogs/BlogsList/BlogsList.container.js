import { Button } from "@mui/material";
import FilterComponent from "../../../components/Filter/Filter.component";
import { Add } from "@mui/icons-material";
import useBlogsHook from "./BlogsList.hook";
import styles from "./Style.module.css";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import PageBox from "../../../components/PageBox/PageBox.component";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import MenuItemView from "../component/MenuItem.component";

const BlogListContainer = () => {
  const {
    handlePageChange,
    handleFilterDataChange,
    handleSearchValueChange,
    handleRowSize,
    handleSortOrderChange,
    handleEdit,
    handleViewDetails,
    isCalling,
    editData,
    configFilter,
    handleCreateFed,
  } = useBlogsHook();

  const {
    data,
    all: allData,
    currentPage,
    is_fetching: isFetching,
    query,
  } = useSelector((state) => state.blogs);

  const renderStatus = (status) => {
    if (status === "ACTIVE") {
      return (
        <span
          style={{
            fontSize: "12px",
            color: "#20c997",
            background: "rgba(32,201,151,.1)",
            padding: "3px 10px",
            borderRadius: "20px",
            textTransform: "capitalize",
          }}
        >
          {status}
        </span>
      );
    }
    return (
      <span
        style={{
          ...styles.spanFont,
          fontSize: "12px",
          color: "#fa8b0c",
          background: `${
            status == "NEW" ? "rgba(250,139,12,.1)" : "rgba(250,139,12,.1)"
          }`,
          padding: "3px 10px",
          borderRadius: "20px",
          textTransform: "capitalize",
        }}
      >
        {status}
      </span>
    );
  };

  const tableStructure = useMemo(() => {
    return [
      {
        key: "title",
        label: "Title",
        sortable: false,
        render: (temp, all) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={all?.cover_image} alt="" height={"50"} width={"50"} />
            <div style={{ marginLeft: "10px" }}>{all.title}</div>
          </div>
        ),
      },
      {
        key: "author",
        label: "Author",
        sortable: false,
        render: (temp, all) => <div>{all.author}</div>,
      },
      {
        key: "featured",
        label: "Featured",
        sortable: false,
        render: (temp, all) => <div>{all.is_featured ? "Yes" : "No"}</div>,
      },
      {
        key: "createdAt",
        label: "Date",
        sortable: true,
        render: (temp, all) => <div>{all.createdAt}</div>,
      },
      {
        key: "status",
        label: "Status",
        sortable: true,
        render: (temp, all) => <div>{renderStatus(all.status)}</div>,
      },
      {
        key: "_id",
        label: "Action",
        render: (temp, all) => (
          <div>
            <MenuItemView handleEdit={handleEdit(allData)} blogId={all.slug} />
          </div>
        ),
      },
    ];
  }, [handleViewDetails, handleEdit, isCalling,allData]);

  const tableData = useMemo(() => {
    const datatableFunctions = {
      onSortOrderChange: handleSortOrderChange,
      onPageChange: handlePageChange,
      onRowSizeChange: handleRowSize,
    };

    const datatable = {
      ...Constants.DATATABLE_PROPERTIES,
      columns: tableStructure,
      data: allData?.length > 0 ? allData : [],
      count: allData?.length > 0 ? allData?.length : 0,
      page: currentPage,
    };


    return { datatableFunctions, datatable };
  }, [
    allData,
    tableStructure,
    handleSortOrderChange,
    handlePageChange,
    handleRowSize,
    data,
    currentPage,
  ]);


  return (
    <div>
      <PageBox>
        <div className={styles.headerContainer}>
          <span className={styles.title}>Blogs List</span>
          <Button
            onClick={handleCreateFed}
            variant={"contained"}
            color={"primary"}
          >
            <Add></Add> Create
          </Button>
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
                {...tableData?.datatable}
                {...tableData?.datatableFunctions}
              />
            </div>
          </div>
        </div>
      </PageBox>
    </div>
  );
};

export default BlogListContainer;
