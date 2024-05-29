import React from "react";

import styles from "./Style.module.css";
import { ButtonBase, CircularProgress, Typography } from "@mui/material";

import { PrimaryButton } from "../../../components/Buttons/PrimaryButton";
import WorkInfoView from "./Component/WorkInfoView";
import PersonalInformation from "./Component/PersonalInformation";
import { ArrowBackIos } from "@mui/icons-material";
import history from "../../../libs/history.utils";
import useUserCreateHook from "./UserCreateHook";

const UserCreate = ({}) => {

  const {
    errorData,
    changeTextData,
    form,
    onBlurHandler,
    handleSubmit,
userId,
    id,
    images,
    manager,
    department,
    listData,
    isSubmitting,
  } = useUserCreateHook();

  return (
    <>
      <div className={styles.outerFlex1}>
        <div className={styles.iconButton}>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIos fontSize={"small"} />{" "}
          </ButtonBase>
          <Typography variant={"h4"}>{id ? "Update" : "Add"} User</Typography>
        </div>
      </div>
      <PersonalInformation
        errorData={errorData}
        form={form}
        image={images}
        changeTextData={changeTextData}
        onBlurHandler={onBlurHandler}
        listData={listData}
        userId={userId}
        id={id}
      />
      {/* Work flow  */}
      {userId !== id && (
        <WorkInfoView
          errorData={errorData}
          form={form}
          changeTextData={changeTextData}
          onBlurHandler={onBlurHandler}
          manager={manager}
          department={department}
        />
      )}
      <div className={styles.saveButton}>
        <PrimaryButton color={"primary"} onClick={handleSubmit}>
          {isSubmitting ? (
            <CircularProgress color="success" size="20px" />
          ) : (
            "Save"
          )}
        </PrimaryButton>
      </div>
    </>
  );
};

export default UserCreate;
