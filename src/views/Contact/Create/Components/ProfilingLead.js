import React from "react";
import styles from "../../Styles.module.css";
import {
  Autocomplete,
  MenuItem,
  Tooltip,
  Typography,
  TextField,
} from "@mui/material";
import { Clear, Search } from "@mui/icons-material";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import MultiComplete from "../../../../components/FormFields/AutoCompleteText/MultiComplete";
import { InfoOutlined as InfoIcon } from "@mui/icons-material";
import { leadStatus } from "../../../../helper/Helper";
const ProfilingLead = ({
  errorData,
  changeTextData,
  onBlurHandler,
  form,
  source,
  sourceData,
  contactOwnerlistData,
  listData
}) => {
  return (
    <>
      <ShadowBox className={styles.contact}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <Typography variant={"title"} className={"heading"}>
              Profiling
            </Typography>
            <Tooltip title="Info" aria-label="info" placement="right">
              <InfoIcon fontSize={"small"} />
            </Tooltip>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <MultiComplete
              isError={errorData?.source}
              AutoCompleteList={source ? source : []}
              label="Source"
              value={form?.source}
              onTextChange={(text) => {
                changeTextData(text, "source");
              }}
              enableField={["title"]}
              style={{ marginTop: "4px" }}
            />
          </div>
          <div className={"formGroup"}>
          <MultiComplete
          isError={errorData?.service_product}
          multiple
          AutoCompleteList={listData?.PRODUCTS ? listData?.PRODUCTS : []}
          label={"Service/Product"}
          value={form?.service_product}
          onTextChange={(text) => {
            changeTextData(text, "service_product");
          }}
          enableField={["label"]}
        />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.priority}
              errorText={errorData?.priority}
              label={"Priority"}
              value={form?.priority}
              handleChange={(value) => {
                changeTextData(value, "priority");
              }}
            >
              <MenuItem value="LOW">LOW</MenuItem>
              <MenuItem value="MEDIUM">MEDIUM</MenuItem>
              <MenuItem value="HIGH">HIGH</MenuItem>
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.seniority}
              errorText={errorData?.seniority}
              label={"Seniority"}
              value={form?.seniority}
              handleChange={(value) => {
                changeTextData(value, "seniority");
              }}
            >
              <MenuItem value="JUNIOR">JUNIOR</MenuItem>
              <MenuItem value="SENIOR">SENIOR</MenuItem>
            </CustomSelectField>
          </div>
        </div>
        <div className={`formFlex `}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.description}
              errorText={errorData?.description}
              label={"Description"}
              multiline
              rows="3"
              onTextChange={(text) => {
                changeTextData(text, "description");
              }}
              className={styles.desc}
            />
          </div>
        </div>
      </ShadowBox>
      <ShadowBox className={styles.contact}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <Typography variant={"title"} className={"heading"}>
              Lead Details
            </Typography>
            <Tooltip title="Info" aria-label="info" placement="right">
              <InfoIcon fontSize={"small"} />
            </Tooltip>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.contact_type}
              errorText={errorData?.contact_type}
              label={"Contact Type"}
              value={form?.contact_type}
              handleChange={(value) => {
                changeTextData(value, "contact_type");
              }}
            >
              <MenuItem value="Business">BUSINESS</MenuItem>
              <MenuItem value="Indvidual">INDVIDUAL</MenuItem>
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <MultiComplete
              isError={errorData?.contact_owner}
              AutoCompleteList={
                contactOwnerlistData ? contactOwnerlistData : []
              }
              label="Contact Owner"
              value={form?.contact_owner}
              onTextChange={(text) => {
                changeTextData(text, "contact_owner");
              }}
              enableField={["title"]}
              style={{ marginTop: "4px" }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.lead_status}
              errorText={errorData?.lead_status}
              label={"Lead Status"}
              value={form?.lead_status}
              handleChange={(value) => {
                changeTextData(value, "lead_status");
              }}
            >
              {leadStatus?.map((item, index) => (
                <MenuItem value={item?.value} key={`status_${index}`}>
                  {item?.label}
                </MenuItem>
              ))}
            </CustomSelectField>
          </div>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.lead_type}
              errorText={errorData?.lead_type}
              label={"Lead Type"}
              value={form?.lead_type}
              handleChange={(value) => {
                changeTextData(value, "lead_type");
              }}
            >
              <MenuItem value="Hot">Hot</MenuItem>
              <MenuItem value="Regular">Regular</MenuItem>
              <MenuItem value="Cold">Cold</MenuItem>
            </CustomSelectField>
          </div>
        </div>
        <div className={`formFlex `}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.lead_details}
              errorText={errorData?.lead_details}
              label={"Lead Details"}
              multiline
              rows="3"
              onTextChange={(text) => {
                changeTextData(text, "lead_details");
              }}
              className={styles.desc}
            />
          </div>
        </div>
      </ShadowBox>
    </>
  );
};

export default ProfilingLead;
