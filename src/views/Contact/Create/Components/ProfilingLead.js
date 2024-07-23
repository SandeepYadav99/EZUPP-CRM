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
import Constants from "../../../../config/constants";
import Pipeline from "../../../../components/PipelineStages/Pipeline";
const ProfilingLead = ({
  errorData,
  changeTextData,
  onBlurHandler,
  form,
  source,
  sourceData,
  contactOwnerlistData,
  listData,
  tagList,
}) => {
  const AutoCompleteData = [
    {
      id: 1,
      title: "Hair Spa",
      label: "Hair Spa",
    },
    {
      id: 2,
      title: "Nail Extensions",
      label: "Nail Extensions",
    },
    {
      id: 1,
      title: "Hair Cut",
      label: "Hair Cut",
    },
  ];
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
              size={"small"}
              multiple
              id="tags-outlined"
              options={AutoCompleteData ? AutoCompleteData : []}
              getOptionLabel={(option) => option.title}
              value={form?.interested_in}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Interested In" />
              )}
            />
           
          </div>
          <div className={"formGroup"}>
          <CustomSelectField
              isError={errorData?.source}
              AutoCompleteList={source ? source : []}
              label="Source"
              value={form?.source}
              handleChange={(value) => {
                changeTextData(value, "source");
              }}
            >
              <MenuItem value="Website">Website</MenuItem>
              <MenuItem value="Social">Social</MenuItem>
              <MenuItem value="Affilate">Affilate</MenuItem>
              <MenuItem value="Referal">Referal</MenuItem>
              <MenuItem value="Call">Call</MenuItem>
              <MenuItem value="Database">Database</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
          </CustomSelectField>
          {/* <MultiComplete
          isError={errorData?.service_product}
          multiple
          AutoCompleteList={listData?.PRODUCTS ? listData?.PRODUCTS : []}
          label={"Service/Product"}
          value={form?.service_product}
          onTextChange={(text) => {
            changeTextData(text, "service_product");
          }}
          enableField={["label"]}
        /> */}
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
          <MultiComplete
                    isError={errorData?.tags}
                    // multiple
                    // isArray
                    // AutoCompleteList={tagList ? tagList : []}
                    // getOptionLabel={(option) => option}
                    label="Tags"
                    defaultValue={form?.tags}
                    value={form?.tags}
                    sx={{mb:0.5}}
                    onTextChange={(text) => {
                      changeTextData(text, "tags");
                    }}
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
          <MultiComplete
              isError={errorData?.contact_owner}
              AutoCompleteList={
                contactOwnerlistData ? contactOwnerlistData : []
              }
              label="Lead Owner"
              value={form?.lead_owner}
              onTextChange={(text) => {
                changeTextData(text, "lead_owner");
              }}
              enableField={["title"]}
              style={{ marginTop: "-0.5px" }}
            />
          </div>
          <div className={"formGroup"}>
          <Pipeline
        buttonText={[
          Constants.PIPELINE_STAGES.PENDING,
          Constants.PIPELINE_STAGES.IN_PROGRESS,
          Constants.PIPELINE_STAGES.PROPOSAL_SENT,
          Constants.PIPELINE_STAGES.ARCHIVED,
          Constants.PIPELINE_STAGES.CUSTOMERS,
        ]}
        value={0}
        onButtonClick={(index) => { }}
        className={styles.stages}
        />
          </div>
        </div>
        <div className={`formFlex `}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.notes}
              errorText={errorData?.notes}
              label={"Notes"}
              multiline
              rows="3"
              onTextChange={(text) => {
                changeTextData(text, "notes");
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
