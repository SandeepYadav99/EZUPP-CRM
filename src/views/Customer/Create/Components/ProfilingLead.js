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
  associateTagsData,
  LeadOwnerData,
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
          {console.log(listData)}
          <MultiComplete
              size={"small"}
              multiple
              id="tags-outlined"
              // options={AutoCompleteData ? AutoCompleteData : []}
              AutoCompleteList={listData?.PRODUCTS ? listData?.PRODUCTS : []}
               label={"Interested In"}
              value={form?.interested_products}
              
              onTextChange={(selectedItems) => {
                changeTextData(selectedItems, "interested_products");
              }}
             
              enableField={["label"]}
           
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
            <CustomTextField
                type="referred_by"
                isError={errorData?.referred_by}
                errorText={errorData?.referred_by}
                label={"Referred By"}
                value={form?.referred_by}
                onTextChange={(text) => {
                  changeTextData(text, "referred_by");
                }}
                
              />
            </div>
            <div className={"formGroup"}>
                </div>
</div>       
      </ShadowBox>
      
    </>
  );
};

export default ProfilingLead;
