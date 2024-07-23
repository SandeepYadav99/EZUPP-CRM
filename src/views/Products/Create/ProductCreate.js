import React from "react";
import styles from "./Style.module.css";
import {
  PrimaryButton,
  ActionButton,
} from "../../../components/Buttons/PrimaryButton";
import { ArrowBackIos } from "@mui/icons-material";
import history from "../../../libs/history.utils";
import useProductCreateHook from "./ProductCreateHook";
import CircularProgress from "@mui/material/CircularProgress";
import {
  MenuItem,
  Typography,
  ButtonBase,
  InputAdornment,
} from "@mui/material";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import ShadowBox from "../../../components/ShadowBox/ShadowBox";
import CustomMultiComplete from "../../../components/FormFields/AutoCompleteText/MultiComplete";
import CustomIosSwitch from "../../../components/FormFields/CustomIosSwitch";

const ProductCreate = ({}) => {
  const {
    errorData,
    changeTextData,
    form,
    onBlurHandler,
    handleSubmit,
    handleCancel,
    id,
    isSubmitting,
  } = useProductCreateHook();
  const AutoCompleteData = [
    {
      id: 1,
      title: "Ardeen Batisse",
      label: "Ardeen Batisse",
    },
    {
      id: 2,
      title: "Justinian Hattersley",
      label: "Justinian Hattersley",
    },
    {
      id: 4,
      title: "Graeme Yellowley",
      label: "Graeme Yellowley",
    },
  ];
  console.log("form", form);
  return (
    <>
      <div className={styles.outerFlex1}>
        <div className={styles.iconButton}>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIos fontSize={"small"} />{" "}
          </ButtonBase>
          <Typography variant={"h5"}>
            {id ? "Update" : "Create"} Product
          </Typography>
        </div>
      </div>
      <ShadowBox className={styles.product}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <Typography variant={"h5"}>Product Details</Typography>
          </h4>
        </div>
        <div className={styles.outerFlex}>
          <div className={styles.lowerWrap}>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.name}
                  errorText={errorData?.name}
                  label={"Product Name*"}
                  value={form?.name}
                  onTextChange={(text) => {
                    changeTextData(text, "name");
                  }}
                  onBlur={() => {
                    onBlurHandler("name");
                  }}
                />
              </div>
              <div className={"formGroup"}>
                <CustomTextField
                  type="number"
                  isError={errorData?.duration}
                  errorText={errorData?.duration}
                  label={"Duration*"}
                  value={form?.duration}
                  onTextChange={(text) => {
                    changeTextData(text, "duration");
                  }}
                  onBlur={() => {
                    onBlurHandler("duration");
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Mins</InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomMultiComplete
                  multiple
                  // showImage
                  AutoCompleteList={AutoCompleteData}
                  label="Tag Staff"
                  value={form?.staff_ids}
                  onTextChange={(text) => {
                    changeTextData(text, "staff_ids");
                  }}
                  enableField={["title"]}
                  getOptionLabel={(option) => option.title}
                />
              </div>

              <div className={"formGroup"}>
                <CustomTextField
                  type="number"
                  isError={errorData?.tax_slab}
                  errorText={errorData?.tax_slab}
                  label={"Tax Slab"}
                  value={form?.tax_slab}
                  onTextChange={(text) => {
                    changeTextData(text, "tax_slab");
                  }}
                  onBlur={() => {
                    onBlurHandler("tax_slab");
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  isError={errorData?.hsn_code}
                  errorText={errorData?.hsn_code}
                  label={"HSN Code"}
                  value={form?.hsn_code}
                  onTextChange={(text) => {
                    changeTextData(text, "hsn_code");
                  }}
                  onBlur={() => {
                    onBlurHandler("hsn_code");
                  }}
                />
              </div>

              <div className={"formGroup"}>
                <CustomSelectField
                  isError={errorData?.type}
                  errorText={errorData?.type}
                  label={"Type"}
                  value={form?.type}
                  handleChange={(value) => {
                    changeTextData(value, "type");
                  }}
                >
                  <MenuItem value={"SERVICE"}>SERVICE</MenuItem>
                  <MenuItem value={"PRODUCT"}>PRODUCT</MenuItem>
                  <MenuItem value={"OTHER"}>OTHER</MenuItem>
                </CustomSelectField>
              </div>
            </div>
            <div className={"formFlex"}>
              <div className={"formGroup"}>
                <CustomTextField
                  type="number"
                  isError={errorData?.reminder_days}
                  errorText={errorData?.reminder_days}
                  label={"Reminder After"}
                  value={form?.reminder_days}
                  onTextChange={(text) => {
                    changeTextData(text, "reminder_days");
                  }}
                  onBlur={() => {
                    onBlurHandler("reminder_days");
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">Days</InputAdornment>
                    ),
                  }}
                />
              </div>

              <div className={`formGroup ${styles.fieldcont}`}>
                <Typography variant="subtitle1">Status</Typography>
                <CustomIosSwitch
                  value={form?.status}
                  checked={form?.status ? true : false}
                  handleChange={() => {
                    changeTextData(!form?.status, "status");
                  }}
                  //label={`Active ?`}
                  label={form?.status ? "Active" : "Inactive"}
                />
              </div>
            </div>
          </div>
        </div>
      </ShadowBox>
      <ShadowBox className={styles.product}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <Typography variant={"h5"}>Price Details</Typography>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomSelectField
              isError={errorData?.currency}
              errorText={errorData?.currency}
              label={"Currency"}
              value={form?.currency}
              handleChange={(value) => {
                changeTextData(value, "currency");
              }}
            >
              <MenuItem value={"INR"}>INR</MenuItem>
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EURO"}>EURO</MenuItem>
            </CustomSelectField>
          </div>

          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.full_price}
              errorText={errorData?.full_price}
              label={"Full Price*"}
              value={form?.full_price}
              onTextChange={(text) => {
                changeTextData(text, "full_price");
              }}
              onBlur={() => {
                onBlurHandler("full_price");
              }}
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              type="number"
              isError={errorData?.discounted_price}
              errorText={errorData?.discounted_price}
              label={"Discounted Price*"}
              value={form?.discounted_price}
              onTextChange={(text) => {
                changeTextData(text, "discounted_price");
              }}
              onBlur={() => {
                onBlurHandler("discounted_price");
              }}
            />
          </div>
          <div className={"formGroup"}></div>
        </div>
      </ShadowBox>
      <ShadowBox className={styles.product}>
        <div className={"headerFlex"}>
          <h4 className={"infoTitle"}>
            <Typography variant={"h5"}>Booking Widget Description</Typography>
          </h4>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.description}
              errorText={errorData?.description}
              label={"Description"}
              value={form?.description}
              onTextChange={(text) => {
                changeTextData(text, "description");
              }}
              onBlur={() => {
                onBlurHandler("description");
              }}
              multiline
              rows={3}
            />
          </div>
        </div>
      </ShadowBox>
      <div className={styles.buttonContainer}>
        <div className={styles.cancelButton}>
          <ActionButton sx={{ mt: 4 }} onClick={handleCancel}>
            CANCEL
          </ActionButton>
        </div>

        <div className={styles.saveButton}>
          <PrimaryButton
            color={"primary"}
            sx={{ mt: 4 }}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={24} />
            ) : id ? (
              "UPDATE"
            ) : (
              "CREATE"
            )}
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default ProductCreate;
