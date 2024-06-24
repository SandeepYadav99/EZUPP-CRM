import React, { memo } from "react";
import {
  Button,
  ButtonBase,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import styles from "./Styles.module.css";
import { makeStyles } from "@mui/styles";
import CustomTextField from "../../../../FormFields/TextField.component";
import { PrimaryButton } from "../../../../components/Buttons/PrimaryButton";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "blue",
    textDecoration: "underline",
  },
  textField: {
    width: "100%",
  },
  closeBtn: {
    position: "absolute",
    right: "10px",
    top: "10px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NotesDilog = ({
  isOpen,
  handleToggle,
  suspendItem,
  empId,
  changeTextData,
  onBlurHandler,
  form,
  handleSubmit,
  errorData,
  isSubmitting,
}) => {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        onBackdropClick={() => {}}
        keepMounted
        fullWidth={true}
        maxWidth={"sm"}
        TransitionComponent={Transition}
        open={isOpen}
        PaperProps={{
          style: {
            borderRadius: "10px",
            maxWidth: "600px",
            width: "calc(100% - 64px)",
          },
        }}
        onClose={handleToggle}
        // aria-labelledby="alert-dialog-title"
        // aria-describedby="alert-dialog-description"
      >
        <div className={styles.notesWrapper}>
          <div className={styles.resetWrapper}>
            <Typography variant="h5" fontWeight={600}>
              Add Notes
            </Typography>
            <ButtonBase onClick={handleToggle}>
              <Close />
            </ButtonBase>
          </div>

          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.descriptions}
                errorText={errorData?.descriptions}
                label={"Note (Max 500 Characters )"}
                value={form?.descriptions}
                onTextChange={(text) => {
                  changeTextData(text, "descriptions");
                }}
                multiline
                rows={4}
              />
            </div>
          </div>

          <div className={styles.printFlex}>
            <PrimaryButton
              onClick={handleSubmit} // handleSubmit
            >
              {isSubmitting ? (
                <CircularProgress color="success" size="20px" />
              ) : (
                "SAVE & EXIT"
              )}
            </PrimaryButton>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default memo(NotesDilog);
