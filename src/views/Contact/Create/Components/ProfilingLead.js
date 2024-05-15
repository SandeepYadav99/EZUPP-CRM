import React from "react";
import styles from "../../Styles.module.css";
import {Autocomplete, MenuItem, Tooltip, Typography, TextField } from "@mui/material";
import { Clear, Search } from "@mui/icons-material";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import {  InfoOutlined as InfoIcon } from "@mui/icons-material";
const ProfilingLead = ({errorData, changeTextData, onBlurHandler, form, source}) => {
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
        <Autocomplete
              id="tags-outlined"
              onChange={(e, value) => {
                changeTextData(value, "source");
              }}
              value={form?.source || []}
              options={source || []} 
              getOptionLabel={(option) => option}
              defaultValue={form?.source || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label={"Source"}
                  // error={errorData?.source}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {form?.source ? (
                          <Clear
                            onClick={() =>
                              changeTextData(null, "source")
                            }
                            style={{ cursor: "pointer" }}
                          />
                        ) : null}
                        <Search
                          style={{ marginRight: -20, cursor: "pointer" }}
                        />
                      </>
                    ),
                  }}
                />
              )}
               disableClearable
            />
          {/* <CustomTextField
            type="name"
            isError={errorData?.source}
            errorText={errorData?.source}
            label={"Source"}
            value={form?.source}
            onTextChange={(text) => {
              changeTextData(text, "source");
            }}
          /> */}
        </div>
        <div className={"formGroup"}>
          <CustomTextField
            type="name"
            isError={errorData?.service_product}
            errorText={errorData?.service_product}
            label={"Service/Product"}
            value={form?.service_product}
            onTextChange={(text) => {
              changeTextData(text, "service_product");
            }}
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
            <MenuItem value="Low">LOW</MenuItem>
            <MenuItem value="Medium">MEDIUM</MenuItem>
            <MenuItem value="High">HIGH</MenuItem>
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
            <MenuItem value=""></MenuItem>
            <MenuItem value="OTHER"></MenuItem>
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
      <Autocomplete
              id="tags-outlined"
              onChange={(e, value) => {
                changeTextData(value, "contact_owner");
              }}
              value={form?.contact_owner || []}
              options={source || []} 
              getOptionLabel={(option) => option}
              defaultValue={form?.contact_owner || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label={"Contact Owner"}
                  // error={errorData?.source}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {form?.contact_owner ? (
                          <Clear
                            onClick={() =>
                              changeTextData(null, "contact_owner")
                            }
                            style={{ cursor: "pointer" }}
                          />
                        ) : null}
                        <Search
                          style={{ marginRight: -20, cursor: "pointer" }}
                        />
                      </>
                    ),
                  }}
                />
              )}
               disableClearable
            />
      {/* <CustomSelectField
          isError={errorData?.contact_owner}
          errorText={errorData?.contact_owner}
          label={"Contact Owner"}
          value={form?.contact_owner}
          handleChange={(value) => {
            changeTextData(value, "contact_owner");
          }}
        >
          <MenuItem value=""></MenuItem>
          <MenuItem value="OTHER"></MenuItem>
        </CustomSelectField> */}
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
          <MenuItem value=""></MenuItem>
          <MenuItem value="OTHER"></MenuItem>
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
          <MenuItem value=""></MenuItem>
          <MenuItem value="OTHER"></MenuItem>
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
