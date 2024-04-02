import React from "react";

import styles from "./Style.module.css";
import { ButtonBase, Typography } from "@mui/material";

import { PrimaryButton } from "../../../components/Buttons/PrimaryButton";
import WorkInfoView from "./Component/WorkInfoView";
import PersonalInformation from "./Component/PersonalInformation";
import { ArrowBackIos } from "@mui/icons-material";
import history from "../../../libs/history.utils";

const UserCreate = ({
  handleToggleSidePannel,
  errorData,
  changeTextData,
  form,
  onBlurHandler,
  handleSubmit,
  image,
  setPhoneContact,
  setTypeOf,
  setCountry,
  id,
  handleSaveClick,
}) => {
  return (
    <>
      <div className={styles.outerFlex1}>
        <div className={styles.iconButton}>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIos fontSize={"small"} />{" "}
            <Typography variant={"h4"}>
              {id === "true" ? "Update" : "Add"} User
            </Typography>
          </ButtonBase>
        </div>
      </div>
      <PersonalInformation
        errorData={errorData}
        form={form}
        image={image}
        changeTextData={changeTextData}
        handleSubmit={handleSubmit}
        onBlurHandler={onBlurHandler}
      />

      <WorkInfoView
        errorData={errorData}
        form={form}
        image={image}
        changeTextData={changeTextData}
        handleSubmit={handleSubmit}
        onBlurHandler={onBlurHandler}
      />

      <div className={styles.saveButton}>
        <PrimaryButton color={"primary"} onClick={handleSaveClick}>
          {/* {isSubmitting ? ( */}
          {/* <CircularProgress color="success" size="20px" />
              ) : (  */}
          Save
          {/* )} */}
        </PrimaryButton>
      </div>
    </>
  );
};

export default UserCreate;
