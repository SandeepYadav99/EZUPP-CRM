import React from "react";

import styles from "./Style.module.css";

import { useTheme } from "@mui/styles";
import {
  CreateActionComponent,

  HeaderTitleComponet,
} from "../../../components/CustomListHeader/CustomListHeader";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import ShadowBox from "../../../components/ShadowBox/ShadowBox";
import useSourceCreate from "./SourceCreateHook";

const SourceCreate = ({ handleToggleSidePannel, isSidePanel }) => {
  const {
    errorData,
    changeTextData,
    form,
    onBlurHandler,
    handleSubmit,

    id,

    isSubmitting,
  } = useSourceCreate({isSidePanel, handleToggleSidePannel});
  const theme = useTheme();
  return (
    <div className={styles.userContainer}>
      <ShadowBox className={styles.shadowBox}>
        <div className={styles.headeTitle}>

        <HeaderTitleComponet headerTitle={"Source Detail"} />
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.name}
              errorText={errorData?.name}
              label={"Source"}
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
      </ShadowBox>
      <div className={styles.saveButton}>
        <CreateActionComponent
          handleSubmit={handleSubmit}
          isRemove={false}
          isSubmitting={isSubmitting}
          title={id ? "UPDATE" : "SAVE"}
        />
      </div>
    </div>
  );
};

export default SourceCreate;
