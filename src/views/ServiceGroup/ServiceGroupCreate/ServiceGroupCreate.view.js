import React from "react";
import CustomAccordion from "../../../components/CustomAccordion/CustomAccordion";
import useServiceGroupCreate from "./ServiceGroupCreate.hook";
import styles from "./Style.module.css";
import { Box, TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShadowBox from "../../../components/ShadowBox/ShadowBox";
import SidePanelComponent from "../../../components/SidePanel/SidePanel.component";
import AddGroupCreate from "../AddGroupCreate/AddGroupCreate.view";

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
  } = useServiceGroupCreate();

  return (
    <ShadowBox className={styles.serviceWrapp}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
      >
        <TextField
          variant="outlined"
          placeholder="Search service name"
          InputProps={{
            endAdornment: <SearchIcon />,
          }}
          value={inputValue}
          onChange={(e) => handleSearchValueChange(e?.target?.value)}
          sx={{ width: "400px" }}
        />
        <Box>
          <Button variant="contained" color="error" sx={{ marginRight: 1 }}>
            Delete All
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSideToggle()}
          >
            Add New Group
          </Button>
        </Box>
      </Box>
      <div className={styles.lowerWrap}>
        <CustomAccordion
          data={serviceData}
          draggable
          handleDrag={handleDrag}
          handleSideToggle={handleSideToggle}
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
