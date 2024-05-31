import ShadowBox from "../../../../../components/ShadowBox/ShadowBox";
import CustomCountryFC from "../../../../../components/CountryFC/CustomCountryFC";
import { RadioGroup, Typography } from "@mui/material";
import CustomTextField from "../../../../../components/FormFields/TextField/TextField.component";
import CustomCheckbox from "../../../../../components/FormFields/CustomCheckbox";
import CardType from "./../CardType";
import { OutlineButton } from "../../../../../components/Buttons/PrimaryButton";
import { PrimaryButton } from "../../../../../components/Buttons/PrimaryButton";
import styles from "./../Style.module.css";
import useContactList from "./ContactList.hook";
import { MenuItem, TextField } from "@mui/material";
import CustomSelectField from "../../../../../components/FormFields/SelectField/SelectField.component";
import MultiComplete from "../../../../../components/FormFields/AutoCompleteText/MultiComplete";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DomainSharpIcon from "@mui/icons-material/DomainSharp";
import { useTheme } from "@mui/styles";
import { useState } from "react";

function QuickContactView({ isOpen, handleToggle }) {
  const {
    showBusiness,
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
    listData,
  } = useContactList({ isOpen, handleToggle });
  const theme = useTheme();
  const [selectedValue, setSelectedValue] = useState("");

  const options = [
    {
      key: 1,
      title: "Business",
      avatar: <DomainSharpIcon fontSize="small" />,
      value: "BUSINESS",
    },
    {
      key: 2,
      title: "Individual",
      avatar: <PersonOutlineOutlinedIcon fontSize="small" />,
      value: "INDIVIDUAL",
    },
  ];

  return (
    <>
      <ShadowBox sx={{ padding: "1rem" }} className={styles.cardWrapper}>
        <Typography variant={"h5"} color={"text.secondary"}>
          Personal Information
        </Typography>
        <div className={styles.cardGrid1}>
          <CardType
            options={options}
            handleBusinessToggle={(text) => {
              changeTextData(text, "contact_type");
            }}
            value={form?.contact_type}
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
              <MenuItem value="Mrs">Miss. </MenuItem>
              <MenuItem value="Mrs">Dr. </MenuItem>
            </CustomSelectField>
          </div>

          <div className={styles.textbox}>
            <CustomTextField
              className={styles.widthfull}
              error={errorData?.full_name}
              value={form?.full_name}
              onTextChange={(text) => {
                changeTextData(text, "full_name");
              }}
              onBlur={() => {
                onBlurHandler("full_name");
              }}
              label={"Full Name"}
            />
          </div>
        </div>
      </ShadowBox>
      {form?.contact_type === "BUSINESS" && (
        <ShadowBox
          sx={{ padding: "1rem" }}
          className={showBusiness ? styles.cardWrapper : styles.inactive}
        >
          <Typography variant={"h5"} color={"text.secondary"}>
            Business Information
          </Typography>

          <MultiComplete
            isError={errorData?.company}
            AutoCompleteList={companylistData ? companylistData : []}
            label="Company"
            value={form?.company}
            onTextChange={(text) => {
              changeTextData(text, "company");
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
            isError={errorData?.buying_role}
            errorText={errorData?.buying_role}
            label={"Decision Making Role"}
            value={form?.buying_role}
            handleChange={(value) => {
              changeTextData(value, "buying_role");
            }}
          >
            <MenuItem value="BUSINESS">BUSINESS</MenuItem>
            <MenuItem value="PERSONAL">PERSONAL</MenuItem>
            <MenuItem value="FAMILY">FAMILY</MenuItem>
            <MenuItem value="HOLIDAY">HOLIDAY</MenuItem>
            <MenuItem value="ETC">ETC</MenuItem>
          </CustomSelectField>
        </ShadowBox>
      )}

      <ShadowBox sx={{ padding: "1rem" }} className={styles.cardWrapper}>
        <Typography variant={"h5"} color={"text.secondary"}>
          Service Information
        </Typography>
        <MultiComplete
          isError={errorData?.service_product}
          multiple
          AutoCompleteList={listData?.PRODUCTS ? listData?.PRODUCTS : []}
          label={"Interested In"}
          value={form?.service_product}
          onTextChange={(text) => {
            changeTextData(text, "service_product");
          }}
          enableField={["label"]}
        />
        <MultiComplete
          isError={errorData?.tags}
          multiple
          isArray
          AutoCompleteList={associateTagsData ? associateTagsData : []}
          label="Associate Tags"
          value={form?.tags}
          onTextChange={(text) => {
            changeTextData(text, "tags");
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
          isError={errorData?.contact_owner}
          AutoCompleteList={LeadOwnerData ? LeadOwnerData : []}
          label="Lead Owner"
          value={form?.contact_owner}
          onTextChange={(text) => {
            changeTextData(text, "contact_owner");
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
            value={form?.is_lead_owner_task}
            handleChange={() => {
              changeTextData(!form?.is_lead_owner_task, "is_lead_owner_task");
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
