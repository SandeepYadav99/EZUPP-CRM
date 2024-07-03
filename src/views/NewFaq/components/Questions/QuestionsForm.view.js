import React, { useMemo } from "react";
import csx from "classnames";
import {
  IconButton,
  Dialog,
  Slide,
  Tooltip,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  Backup as BackupIcon,
  Info as InfoIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import useQuestionFormHook from "./QuestionForm.hook";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import NewEditor from "../../../../components/NewEditor/NewEditor.component";
import {
  ActionButton,
  PrimaryButton,
} from "../../../../components/Buttons/PrimaryButton";
import CustomIosSwitch from "../../../../components/FormFields/CustomIosSwitch";
import removeTask from "../../../../assets/Assets/ic_delete@2x.png";
import styles from "./Style.module.css";

const QuestionsFormView = ({
  category,
  isOpen,
  data,
  handleToggleSidePannel,
  listLength = 0,
}) => {
  const {
    form,
    errorData,
    changeTextData,
    handleSubmit,
    handleDelete,
    confirmPopUp,
    suspendItem,
    handleDialogClose,
    descriptionRef,
    isSubmitting
  } = useQuestionFormHook({
    category,
    data,
    isOpen,
    handleToggleSidePannel,
    listLength,
  });
  const editorStyle = useMemo(() => {
    return {
      border: errorData?.description ? "1px solid red" : "none",
    };
  }, [errorData?.description, form?.description]);

  const renderDialog = () => {
    if (confirmPopUp) {
      return (
        <Dialog
          keepMounted
          open={confirmPopUp}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className={styles.dialogWrap}>
            <Typography variant="subtitle1">
              {"Are your sure you want to Delete ?"}
            </Typography>

            <div className={styles.buttonContainer}>
              <div className={styles.cancelButton}>
                <ActionButton sx={{ mt: 4 }} onClick={handleDialogClose}>
                  CANCEL
                </ActionButton>
              </div>

              <div className={styles.saveButton}>
                <PrimaryButton
                  color={"primary"}
                  sx={{ mt: 4, ml: 4 }}
                  onClick={() => suspendItem()}
                >
                  CONFIRM
                </PrimaryButton>
              </div>
            </div>
          </div>
        </Dialog>
      );
    }
    return null;
  };

  return (
    <div>
      <div className={styles.headerFlex}>
        <h4 className={styles.infoTitle}>
          <div className={styles.heading}>Questions</div>
          <Tooltip title="Info" aria-label="info" placement="right">
            <InfoIcon fontSize={"small"} />
          </Tooltip>
        </h4>
      </div>
      <div>
        <div className={styles.category}>
          <b>Title</b> - {category.title}
        </div>
        <div className={styles.category}>
          <b>Applies To</b> - {category.visible_to}
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <CustomTextField
              isError={errorData?.question}
              errorText={errorData?.question}
              label={"Question Name"}
              value={form?.question}
              onTextChange={(text) => {
                changeTextData(text, "question");
              }}
            />
          </div>
        </div>
        <div>
          <div className={styles.lblTxt}>Answer</div>
          <div className={"formFlex"}>
            <div
              className={csx("formGroup", styles.editorContainer)}
              style={editorStyle}
            >
              <NewEditor
                editorData={form?.description}
                handleChangeEditor={(html) => {
                  descriptionRef.current(html, "description");
                }}
                height={"300px"}
              />
            </div>
          </div>
        </div>
        <br />
        <div className={styles.bottomFlex}>
          <CustomIosSwitch
            value={form?.status}
            handleChange={() => {
              changeTextData(!form?.status, "status");
            }}
            checked={form?.status}
            label={form?.status ? "ACTIVE" : "INACTIVE"}
          />
          <div>
            {data && (
              <IconButton onClick={() => handleDelete()}>
                <img src={removeTask} alt="task" width={20} />
              </IconButton>
            )}
          </div>
        </div>
        <br />
        <div className={styles.submitBtn}>
          <PrimaryButton onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
              <CircularProgress color="success" size="20px" />
            ) : data ? (
              "Update"
            ) : (
              "Save"
            )}
          </PrimaryButton>
        </div>
      </div>
      {renderDialog()}
    </div>
  );
};

export default QuestionsFormView;
