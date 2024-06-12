import React, { useState, useRef, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import styles from "./Style.module.css";
import csx from "classnames";
import { withStyles } from "@mui/styles";
import {
  MenuItem,
  Button,
  IconButton,
  FormControlLabel,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  Tooltip,
  createMuiTheme,
} from "@mui/material";
import { convertFromRaw } from "draft-js";
import {
  Backup as BackupIcon,
  Info as InfoIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";
import MUIRichTextEditor from "mui-rte";
import useQuestionFormHook from "./QuestionForm.hook";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import CustomSwitch from "../../../../components/FormFields/CustomSwitch";
import NewEditor from "../../../../components/NewEditor/NewEditor.component";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const QuestionsFormView = ({ classes, category, data,handleToggleSidePannel }) => {
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
  } = useQuestionFormHook({ category, data,handleToggleSidePannel});

  const defaultTheme = createMuiTheme();

  const renderDialog = () => {
    if (confirmPopUp) {
      return (
        <Dialog
          keepMounted
          TransitionComponent={Transition}
          open={confirmPopUp}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <b>Are You Sure</b>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to delete the item?
              <br />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Disagree
            </Button>
            <Button onClick={suspendItem} color="primary">
              Agree
            </Button>
          </DialogActions>
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
            <div className={csx("formGroup", styles.editorContainer)}>
              <NewEditor
                editorData={form?.description}
                handleChangeEditor={(html) => {
                  descriptionRef.current(html, "description");
                }}
              />
            </div>
          </div>
        </div>
        <br />
        <div className={styles.bottomFlex}>
          <CustomSwitch
            value={form?.is_active}
            handleChange={() => {
              changeTextData(!form?.is_active, "is_active");
            }}
            label={`${form?.is_active ? "ACTIVE" : "INACTIVE"}`}
          />

          <div>
            {data && (
              <IconButton variant={"contained"} onClick={() => handleDelete()}>
                <DeleteIcon />
              </IconButton>
            )}
          </div>
        </div>
        <br />
        <div className={styles.submitBtn}>
          <Button
            className={"sub"}
            variant={"contained"}
            color={"primary"}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
      {renderDialog()}
    </div>
  );
};

const useStyle = (theme) => ({
  btnSuccess: {
    backgroundColor: theme.palette.success.dark,
    color: "white",
    marginRight: 5,
    marginLeft: 5,
    "&:hover": {
      backgroundColor: theme.palette.success.main,
    },
  },
  btnError: {
    backgroundColor: theme.palette.error.dark,
    color: "white",
    marginLeft: 5,
    marginRight: 5,
    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
  },
  iconBtnError: {
    color: theme.palette.error.dark,
  },
  dialog: {},
});

export default QuestionsFormView;
