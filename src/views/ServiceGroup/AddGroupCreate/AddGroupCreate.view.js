import React from "react";
import styles from "./Style.module.css";
import { Button, ButtonBase, CircularProgress } from "@mui/material";
import useAddGroupCreateHook from "./AddGroupCreate.hook";
import CustomTextField from "../../../FormFields/TextField.component";

const AddGroupCreate = ({ isOpen, handleToggle, editData, renderList }) => {
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    isSubmitted,
    isSubmitting,
    handleDelete,
  } = useAddGroupCreateHook({ isOpen, handleToggle, editData, renderList });

  return (
    <div>
      <div className={styles.resetPasswordWrapper}>
        <div className={styles.fieldWrapper}>
          <CustomTextField
            isError={errorData?.title}
            errorText={errorData?.title}
            label={"Group Name*"}
            value={form?.title}
            onTextChange={(text) => {
              changeTextData(text, "title");
            }}
            onBlur={() => {
              onBlurHandler("title");
            }}
          />
        </div>
        <div className={styles.printFlex}>
          {editData?.id ? (
            <ButtonBase
              className={styles.edit}
              onClick={() => handleDelete(editData?.id)}
            >
              Delete
            </ButtonBase>
          ) : (
            <div></div>
          )}
          <Button
            className={styles.createBtn}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress color="success" size="20px" />
            ) : (
              "ADD"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddGroupCreate;
