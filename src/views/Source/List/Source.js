import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import DataTables from "../../../Datatables/Datatable.table";
import Constants from "../../../config/constants";
import FilterComponent from "../../../components/Filter/Filter.component";
import styles from "./Style.module.css"
import ShadowBox from "../../../components/ShadowBox/ShadowBox";
import { useTheme } from "@mui/styles";
import { CustomListHeader } from "../../../components/CustomListHeader/CustomListHeader";

import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";

import useSource from "./SourceHook";
import SourceCreate from "../Create/SourceCreate";

const Source = (props) => {
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
    handleToggleSidePannel,
    handleCreate,
  } = useSource({});

  const {
    present,
    all: allData,
    currentPage,
    is_fetching: isFetching,
  } = useSelector((state) => state.provider_user);
  const theme = useTheme();

  const tableStructure = useMemo(
    () => [
      {
        key: "source_name",
        label: "Source Name",

        sortable: false,
        render: (value, all) => <div>{}</div>,
      },
      {
        key: "source_date",
        label: "Source Date",

        sortable: false,
        render: (value, all) => <div>{}</div>,
      },
    ],
    [handleEdit, handleProfile]
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
      data: [],//present
      count: 0,// allData.length
      page: 0,//currentPage
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
    <div className={styles}>
      <ShadowBox width={"100%"}>
        <CustomListHeader
          title={"ADD SOURCE"}
          handleCreate={handleToggleSidePannel}
          sideTitlle={"Source"}
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
      <SidePanelComponent
        handleToggle={handleToggleSidePannel}
        title={"Add Source"}
        open={isSidePanel}
        side={"right"}
      >
        <SourceCreate  handleToggleSidePannel={handleToggleSidePannel}
          isSidePanel={isSidePanel}
         />
      </SidePanelComponent>
    </div>
  );
};

export default Source;
