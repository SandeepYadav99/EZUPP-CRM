import React from "react";
import CustomAccordion from "../../../components/CustomAccordion/CustomAccordion";
import useServiceGroupCreate from "./ServiceGroupCreate.hook";
import styles from "./Style.module.css";
import { Box, TextField, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import ShadowBox from "../../../components/ShadowBox/ShadowBox";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import AddGroupCreate from "../AddGroupCreate/AddGroupCreate.view";
import { ArrowPrimaryButton } from "../../../components/Buttons/PrimaryButton";
import { Typography } from "@mui/material";
import FilterComponent from "../../../components/Filter/Filter.component";

function ServiceGroupCreate() {
  const {
    serviceData,
    handleDrag,
    handleSearchValueChange,
    inputValue,
    editData,
    renderList,
    isSidePanel,
    handleSideToggle,
    handleCreate,
    handleUpdate
  } = useServiceGroupCreate();

  return (
    <ShadowBox className={styles.serviceWrapp}>
      <div className={styles.headerContainer}>
        <Typography
          variant={"title"}
          color={"text.primary"}
          className={styles.title}
        >
          Product List
        </Typography>
        <ArrowPrimaryButton
          onClick={() => handleSideToggle()}
          icon={<Add fontSize="normal" />}
        >
          Create New Group
        </ArrowPrimaryButton>
      </div>

      <div style={{ width: "100%" }}>
        <FilterComponent
          filters={[]}
          handleSearchValueChange={handleSearchValueChange}
        />
      </div>
      <div className={styles.lowerWrap}>
        <CustomAccordion
          data={serviceData}
          draggable
          handleDrag={handleDrag}
          handleSideToggle={handleSideToggle}
          handleCreate={handleCreate}
          handleUpdate={handleUpdate}
        />
      </div>
      <SidePanelComponent
        handleToggle={handleSideToggle}
        title={`${editData?.id ? "Update " : "New"} Service Group`}
        open={isSidePanel}
        side={"right"}
      >
        <AddGroupCreate
          isOpen={isSidePanel}
          handleToggle={handleSideToggle}
          editData={editData}
          renderList={renderList}
        />
      </SidePanelComponent>
    </ShadowBox>
  );
}

export default ServiceGroupCreate;
