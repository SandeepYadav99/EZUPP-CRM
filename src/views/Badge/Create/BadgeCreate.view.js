import React from "react";

import {Button, CircularProgress, IconButton, MenuItem } from "@material-ui/core";
import {

  Delete as DeleteIcon,

} from "@material-ui/icons";

import styles from "../Style.module.css";

import CustomRadioLabel from "../../../components/CustomRadioLabel/CustomRadioLabel.component";
import Tooltip from "@material-ui/core/Tooltip";
import InfoIcon from "@material-ui/icons/Info";

import { makeStyles } from "@material-ui/styles";

import useBadgeCreateHook from "./BadgeCreateHook";
import File from "../../../components/FileComponent/FileComponent.component";
import CustomTextField from "../../../FormFields/TextField.component";

import CustomSelectField from "../../../FormFields/SelectField/SelectField.component";


const useStyles = makeStyles((theme) => ({
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  deleteBtn: {
    color: "red",
    // borderBottom: '1px solid red'
  },
}));

const BadgeView = ({ handleToggleSidePannel, isSidePanel, empId }) => {
  const {
    form,
    errorData,
    selectedValues,
    handleSubmit,
    onBlurHandler,
    changeTextData,
    logos,
    data,
    handleDelete,
    listData,
    isSubmitting
  } = useBadgeCreateHook({ handleToggleSidePannel, isSidePanel, empId });
  const classes = useStyles();

  return (
    <div>
      <div className={styles.headerFlex}>
        <h4 className={styles.infoTitle}>
          <div className={styles.heading}>Badge</div>
          <Tooltip title="Info" aria-label="info" placement="right">
            <InfoIcon fontSize={"small"} />
          </Tooltip>
        </h4>
        {data && (
          <IconButton
            variant={"contained"}
            className={classes.iconBtnError}
            onClick={handleDelete}
            type="button"
          >
            <DeleteIcon />
          </IconButton>
        )}
      </div>

      <div>
        <div className={"formFlex"} style={{ alignItems: "center" }}>
          <div className={""} style={{ margin: "0px 20px" }}>
            <File
              // imageClass={styles.inputFileUploader}
              max_size={2 * 1024 * 1024}
              type={["jpg", "png", "pdf", "jpeg"]}
              fullWidth={true}
              name="logo"
              accept={"image/*"}
              label="Please Upload Image"
              show_image={true}
              error={errorData?.logo}
              value={form?.logo}
              default_image={logos ? logos : ""}
              onChange={(file) => {
                if (file) {
                  changeTextData(file, "logo");
                }
              }}
            />
          </div>

          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.name}
                errorText={errorData?.name}
                label={" Badge Name"}
                value={form?.name}
                onTextChange={(text) => {
                  changeTextData(text, "name");
                }}
                onBlur={() => {
                  onBlurHandler("name");
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <label>Applies To : </label>
          <div>
            <CustomRadioLabel
              name={"apply_to"}
              firstValue="Marketer"
              secondValue="Vendor"
              thirdValue={"Both"}
              handleChange={changeTextData}
              defaultValue={form?.apply_to}
            />
          </div>
        </div>

        <div>
          <label>Logic :</label>
          <div>
            <CustomRadioLabel
              name={"logic"}
              firstValue="Automatic"
              secondValue="Manual"
              handleChange={changeTextData}
              defaultValue={form?.logic}
            />
          </div>
        </div>
        <div>
          <label>Industry Specific :</label>
          <div>
            <CustomRadioLabel
              name={"Industry_Specific"}
              firstValue="Yes"
              secondValue="No"
              handleChange={changeTextData}
            />
          </div>
        </div>

        {selectedValues === "Yes" ? (
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.industry_id}
                errorText={errorData?.industry_id}
                label={"Manager"}
                value={form?.industry_id}
                handleChange={(value) => {
                  changeTextData(value, "industry_id");
                }}
              >
                {listData?.map((item) => {
                  return <MenuItem value={item?.id}>{item?.name}</MenuItem>;
                })}
              </CustomSelectField>
            </div>
          </div>
        ) : null}

        <div style={{ float: "right" }}>
          <Button
            variant={"contained"}
            color={"primary"}
            type={"submit"}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <CircularProgress color="success" size="20px" />
            ) : empId ? (
              "UPDATE"
            ) : (
              "Submit"
            )}
          
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BadgeView;
