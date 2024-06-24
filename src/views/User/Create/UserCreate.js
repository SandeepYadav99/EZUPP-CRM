import React from "react";

import styles from "./Style.module.css";
import { ButtonBase, CircularProgress, Typography } from "@mui/material";

import { PrimaryButton } from "../../../components/Buttons/PrimaryButton";
import WorkInfoView from "./Component/WorkInfoView";
import PersonalInformation from "./Component/PersonalInformation";
import { ArrowBackIos } from "@mui/icons-material";
import history from "../../../libs/history.utils";
import useUserCreateHook from "./UserCreateHook";
import { useTheme } from "@mui/styles";
import {
  CreateActionComponent,
  CreateHeadaerComponent,
} from "../../../components/CustomListHeader/CustomListHeader";

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
    designation,
  } = useUserCreateHook();
  const theme = useTheme();
  return (
    <div className={styles.userContainer}>
      <div className={styles.outerFlex1}>
        <CreateHeadaerComponent title={id ? "Update User" : "Add User"} />
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
          designation={designation}
          id={id}
        />
      )}
      <div className={styles.saveButton}>
        <CreateActionComponent
          handleSubmit={handleSubmit}
          isRemove={false}
          isSubmitting={isSubmitting}
          title={id ? "Update" : "Save"}
        />
      </div>
    </div>
  );
};

export default UserCreate;
