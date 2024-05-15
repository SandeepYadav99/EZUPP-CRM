import ShadowBox from "../../../../../components/ShadowBox/ShadowBox";
import CustomCountryFC from "../../../../../components/CountryFC/CustomCountryFC";

import { Typography } from "@mui/material";
// import CustomAutoComplete from "../../../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import CustomCheckbox from "../../../../../components/FormFields/CustomCheckbox";
import CardType from "./../CardType";
import { OutlineButton } from "../../../../../components/Buttons/PrimaryButton";
import { PrimaryButton } from "../../../../../components/Buttons/PrimaryButton";
import styles from "./../Style.module.css";
import useContactList from "./ContactList.hook";
import { Autocomplete, MenuItem, TextField, Select } from "@mui/material";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import { countries } from "../../../../../helper/Helper";
import { Box } from "@mui/material";
import { useEffect, useMemo } from "react";
import CustomAutoComplete from "../../../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import MultiComplete from "../../../../../components/FormFields/AutoCompleteText/MultiComplete";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DomainSharpIcon from "@mui/icons-material/DomainSharp";
import { useTheme } from "@mui/styles";

function QuickContactView({ isOpen, handleToggle }) {
  const {
    showBusiness,
   

    handleBusinessToggle,
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    removeError,
    resData,
    isSubmitted,
    isSubmitting,
    companylistData,
    associateTagsData,
    sourceData,
    LeadOwnerData,
  } = useContactList({ isOpen, handleToggle });
  const theme = useTheme();

  const options = [
    { key: 1, title: "Business", avatar: <DomainSharpIcon fontSize="small" /> },
    {
      key: 2,
      title: "Individual",
      avatar: <PersonOutlineOutlinedIcon fontSize="small" />,
    },
  ];

  return (
    <>
      <ShadowBox sx={{ padding: "1rem" }} className={styles.cardWrapper}>
        <Typography variant={"h5"} color={"text.secondary"}>
          Personal Information
        </Typography>
        <div className={styles.cardGrid1}>
          {" "}
          <CardType
            options={options}
            handleBusinessToggle={handleBusinessToggle}
          />
        </div>

        <div className={"formFlex"}>
          <div className={styles.countryBox}>
            <CustomCountryFC
              type="tel"
              isError={errorData?.contact}
              errorText={errorData?.contact}
              label={"Contact"}
              value={form?.contact}
              onTextChange={(text) => {
                changeTextData(text, "contact");
              }}
            />
          </div>
        </div>
        <CustomTextField
          isError={errorData?.email}
          errorText={errorData?.email}
          value={form?.email}
          onTextChange={(text) => {
            changeTextData(text, "email");
          }}
          onBlur={() => {
            onBlurHandler("email");
          }}
          label={"Email ID"}
        />
        <div className={styles.nameWrapper}>
          <div className={styles.dropdown}>
            <CustomSelectField
              outlinedProps={{
                sx: {
                  borderTopRightRadius: theme.spacing(0),
                  borderBottomRightRadius: theme.spacing(0),
                },
              }}
              isError={errorData?.prefix_type}
              errorText={errorData?.prefix_type}
              label={"Prefix"}
              value={form?.prefix_type}
              handleChange={(value) => {
                changeTextData(value, "prefix_type");
              }}
            >
              <MenuItem value="Mr">Mr</MenuItem>
              <MenuItem value="Mrs">Mrs</MenuItem>
            </CustomSelectField>
          </div>

          <div className={styles.textbox}>
            <CustomTextField
              className={styles.widthfull}
              error={errorData?.full_name}
              value={form?.full_name}
              onChange={(e) => {
                changeTextData(e.target.value, "full_name");
              }}
              onBlur={() => {
                onBlurHandler("full_name");
              }}
              label={"Full Name"}
            />
          </div>
        </div>
      </ShadowBox>
      <ShadowBox
        sx={{ padding: "1rem" }}
        className={showBusiness ? styles.cardWrapper : styles.inactive}
      >
        <Typography variant={"h5"} color={"text.secondary"}>
          Business Information
        </Typography>

        <MultiComplete
          isError={errorData?.company_name_list}
          AutoCompleteList={companylistData ? companylistData : []}
          label="Company"
          value={form?.company_name_list}
          onTextChange={(text) => {
            changeTextData(text, "company_name_list");
          }}
          enableField={["title"]}
        />
        <CustomTextField
          isError={errorData?.job_title}
          errorText={errorData?.job_title}
          value={form?.job_title}
          onTextChange={(text) => {
            changeTextData(text, "job_title");
          }}
          onBlur={() => {
            onBlurHandler("job_title");
          }}
          label={"Job Title"}
        />
        <CustomSelectField
          isError={errorData?.business_type}
          errorText={errorData?.business_type}
          label={"Decision Making Role"}
          value={form?.business_type}
          handleChange={(value) => {
            changeTextData(value, "business_type");
          }}
        >
          <MenuItem value="BUSINESS">BUSINESS</MenuItem>
          <MenuItem value="PERSONAL">PERSONAL</MenuItem>
          <MenuItem value="FAMILY">FAMILY</MenuItem>
          <MenuItem value="HOLIDAY">HOLIDAY</MenuItem>
          <MenuItem value="ETC">ETC</MenuItem>
        </CustomSelectField>
      </ShadowBox>
      <ShadowBox sx={{ padding: "1rem" }} className={styles.cardWrapper}>
        <Typography variant={"h5"} color={"text.secondary"}>
          Service Information
        </Typography>
        <CustomSelectField
          isError={errorData?.interested_in_type}
          errorText={errorData?.interested_in_type}
          label={"Interested In"}
          value={form?.interested_in_type}
          handleChange={(value) => {
            changeTextData(value, "interested_in_type");
          }}
        >
          <MenuItem value="REAL ESTATES">REAL ESTATES</MenuItem>
          <MenuItem value="E COMMERCE">E COMMERCE</MenuItem>
          <MenuItem value="ARTIFICIAL INTELLIGENCE">
            ARTIFICIAL INTELLIGENCE
          </MenuItem>
          <MenuItem value="DATA STORAGE">DATA STORAGE</MenuItem>
          <MenuItem value="ETC">ETC</MenuItem>
        </CustomSelectField>

        <MultiComplete
          isError={errorData?.associate_tags_list}
          multiple
          AutoCompleteList={associateTagsData ? associateTagsData : []}
          label="Associate Tags"
          value={form?.associate_tags_list}
          onTextChange={(text) => {
            changeTextData(text, "associate_tags_list");
          }}
          enableField={["title"]}
        />

        <MultiComplete
          isError={errorData?.source}
          AutoCompleteList={sourceData ? sourceData : []}
          label="Source"
          value={form?.source}
          onTextChange={(text) => {
            changeTextData(text, "source");
          }}
          enableField={["title"]}
        />
      </ShadowBox>
      <ShadowBox sx={{ padding: "1rem" }} className={styles.cardWrapper}>
        <Typography variant={"h5"} color={"text.secondary"}>
          Lead Details
        </Typography>

        <MultiComplete
          isError={errorData?.lead_owner}
          AutoCompleteList={LeadOwnerData ? LeadOwnerData : []}
          label="Lead Owner"
          value={form?.lead_owner}
          onTextChange={(text) => {
            changeTextData(text, "lead_owner");
          }}
          enableField={["title"]}
        />
        <CustomSelectField
          isError={errorData?.lead_stage_type}
          errorText={errorData?.lead_stage_type}
          label={"Lead Stage"}
          value={form?.lead_stage_type}
          handleChange={(value) => {
            changeTextData(value, "lead_stage_type");
          }}
        >
          <MenuItem value="REAL ESTATES">REAL ESTATES </MenuItem>
          <MenuItem value="E COMMERCE">E COMMERCE</MenuItem>
          <MenuItem value="ARTIFICIAL INTELLIGENCE">
            ARTIFICIAL INTELLIGENCE
          </MenuItem>
          <MenuItem value="DATA STORAGE">DATA STORAGE</MenuItem>
          <MenuItem value="ETC">ETC</MenuItem>
        </CustomSelectField>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <CustomCheckbox
            sx={{ width: "1rem" }}
            value={form?.is_initial_task}
            handleChange={() => {
              changeTextData(!form?.is_initial_task, "is_initial_task");
            }}
          />
          <Typography
            component="span"
            variant="subtitle2"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            Add initial task to Lead Owner
          </Typography>
        </div>
      </ShadowBox>
      <div className={styles.buttonBox}>
        <OutlineButton onClick={handleSubmit}>SAVE & ADD INFO</OutlineButton>
        <PrimaryButton>CREATE</PrimaryButton>{" "}
      </div>
    </>
  );
}
export default QuickContactView;
