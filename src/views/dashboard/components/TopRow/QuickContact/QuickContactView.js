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
import {useTheme} from "@mui/styles";

function QuickContactView({ isOpen, handleToggle }) {
  // debugger;
  const {
    showBusiness,
    setShowBusiness,

    setCountryFlagOnly,
    handleCountryFlagToggle,
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
  console.log(showBusiness);
  console.log(errorData);
  // const countryCode = useMemo(() => {
  //   return countries?.filter((item) => item.label === form?.country)?.[0]
  //     ?.phone;
  // }, [form?.country]);
 const options=[
  {id:1,title: "Business", avatar:<DomainSharpIcon fontSize="small"/>} ,
  { id:2,title: "Individual", avatar:<PersonOutlineOutlinedIcon fontSize="small"/>},
]
  console.log(options)

  return (
    <>
      <ShadowBox style={{ padding: "1rem" }} className={styles.cardWrapper}>
        <Typography variant={"h5"} color={"text.secondary"}>
          Personal Information
        </Typography>
        <CardType
           options={options}
          handleBusinessToggle={handleBusinessToggle}
        />
        <div className={"formFlex"}>
          <div className={styles.countryBox}>
            {/* <CustomSelectField
              isError={errorData?.country}
              errorText={errorData?.country}
              label={"Country"}
              value={form?.country}
              handleChange={(value) => {
                changeTextData(value, "country");
              }}
              countryFlagOnly={countryFlagOnly}
              handleCountryFlagToggle={handleCountryFlagToggle}
            >
              {countries.map((item) => (
                <MenuItem value={item.label}>
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      srcSet={`https://flagcdn.com/w40/${item.code.toLowerCase()}.png 2x`}
                      src={`https://flagcdn.com/w20/${item.code.toLowerCase()}.png`}
                      alt=""
                    />
                    {item.label} ({item.code}) +{item.phone}
                  </Box>
                </MenuItem>
              ))}
            </CustomSelectField> */}
            {/* <Select
              isError={errorData?.country}
              errorText={errorData?.country}
              label={"Country"}
              value={form?.country}
              onClick={() => handleCountryFlagToggle()}
              onChange={(e) => {
                changeTextData(e.target.value, "country");
                handleCountryFlagToggle();

              }}
            >
              {countries.map((item) => (
                <MenuItem value={item.label}>
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      srcSet={`https://flagcdn.com/w40/${item.code.toLowerCase()}.png 2x`}
                      src={`https://flagcdn.com/w20/${item.code.toLowerCase()}.png`}
                      alt=""
                    />
                    {countryFlagOnly ? "" : item.label} (
                    {countryFlagOnly ? "" : item.code}) +
                    {countryFlagOnly ? "" : item.phone}
                  </Box>
                </MenuItem>
              ))}
            </Select> */}
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
          {/* <div className={styles.countryCodeBox}>
            {" "}
            <TextField
              className={styles.widthfull}
              isError={errorData?.userPhone}
              errorText={errorData?.userPhone}
              value={`+${countryCode} ${form?.userPhone}`}
              onChange={(text) => {
                const start = text.target.value?.indexOf(" ");
                const newText = text.target.value?.slice(start + 1);
                if (text.target.value?.includes(" ")) {
                  changeTextData(newText, "userPhone");
                } else changeTextData("", "userPhone");
              }}
              onBlur={() => {
                onBlurHandler("email");
              }}
              // label={"Phone Number"}
            />
          </div> */}
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
                  sx: { borderTopRightRadius: theme.spacing(0), borderBottomRightRadius: theme.spacing(0) }
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
          {/* <CustomTextField
          isError={errorData?.fullName}
          errorText={errorData?.fullName}
          value={form?.fullName}
          onTextChange={(text) => {
            changeTextData(text, "fullName");
          }}
          onBlur={() => {
            onBlurHandler("fullName");
          }}
          label={"Full Name"}
        /> */}
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
            {/* {errorData?.full_name && (
              <div style={{ textAlign: "right", color: "red" }}>
                {errorData?.full_name}
              </div>
            )} */}
          </div>
        </div>
      </ShadowBox>
      <ShadowBox
        style={{ padding: "1rem" }}
        className={showBusiness ? styles.cardWrapper : styles.inactive}
      >
        <Typography variant={"h5"} color={"text.secondary"}>
          Business Information
        </Typography>
        {/* <Autocomplete
          id="tags-outlined"
          onChange={(e, value) => {
            changeTextData(value, "company_name_list");
          }}
          value={form?.company_name_list}
          // id="tags-standard"
          options={companylistData ? companylistData : []}
          getOptionLabel={(option) => option.title}
          defaultValue={form?.company_name_list}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Company"
              error={errorData?.company_name_list}
            />
          )}
        /> */}
        <CustomAutoComplete
          autoCompleteProps={{
            freeSolo: false,
            getOptionLabel: (option) => option?.label,
          }}
          dataset={companylistData ? companylistData : []}
          datasetKey={"label"}
          onTextChange={(text) => {
            changeTextData(text, "company_name_list");
          }}
          variant={"outlined"}
          label={"Company"}
          name={"Company"}
          isError={errorData?.company_name_list}
          value={form?.company_name_list}
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
      <ShadowBox style={{ padding: "1rem" }} className={styles.cardWrapper}>
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
        {/* <Autocomplete
          id="tags-outlined"
          multiple
          onChange={(e, value) => {
            changeTextData(value, "Associate_tags_list");
          }}
          value={form?.Associate_tags_list}
          // id="tags-standard"
          options={associateTagsData ? associateTagsData : []}
          getOptionLabel={(option) => option.title}
          defaultValue={form?.Associate_tags_list}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Associate Tags"
              error={errorData?.Associate_tags_list}
            />
          )}
        /> */}
        <MultiComplete
          nopic
          AutoCompleteList={associateTagsData ? associateTagsData : []}
          label="Associate Tags"
          value={form?.associate_tags_list}
          onTextChange={(text) => {
            changeTextData(text, "associate_tags_list");
          }}
          enableField={["title", "email"]}
        />
        {/* <Autocomplete
          id="tags-outlined"
          onChange={(e, value) => {
            changeTextData(value, "source");
          }}
          value={form?.source}
          // id="tags-standard"
          options={sourceData ? sourceData : []}
          getOptionLabel={(option) => option.title}
          defaultValue={form?.source}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Source"
              error={errorData?.source}
            />
          )}
        /> */}
        <CustomAutoComplete
          autoCompleteProps={{
            freeSolo: false,
            getOptionLabel: (option) => option?.label,
          }}
          dataset={sourceData ? sourceData : []}
          datasetKey={"label"}
          onTextChange={(text) => {
            changeTextData(text, "source");
          }}
          variant={"outlined"}
          label={"Source"}
          name={"Source"}
          isError={errorData?.source}
          value={form?.source}
        />
      </ShadowBox>
      <ShadowBox style={{ padding: "1rem" }} className={styles.cardWrapper}>
        <Typography variant={"h5"} color={"text.secondary"}>
          Lead Details
        </Typography>
        {/* <Autocomplete
          id="tags-outlined"
          onChange={(e, value) => {
            changeTextData(value, "leadOwner");
          }}
          value={form?.leadOwner}
          // id="tags-standard"
          options={LeadOwnerData ? LeadOwnerData : []}
          getOptionLabel={(option) => option.title}
          defaultValue={form?.leadOwner}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Lead Owner"
              error={errorData?.leadOwner}
            />
          )}
        /> */}

        <CustomAutoComplete
          autoCompleteProps={{
            freeSolo: false,
            getOptionLabel: (option) => option?.label,
          }}
          dataset={LeadOwnerData ? LeadOwnerData : []}
          datasetKey={"label"}
          onTextChange={(text) => {
            changeTextData(text, "lead_owner");
          }}
          variant={"outlined"}
          label={"Lead Owner"}
          name={"Lead Owner"}
          isError={errorData?.lead_owner}
          value={form?.lead_owner}
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
