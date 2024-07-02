import React from "react";
import styles from "./Style.module.css";
import { Dialog, Typography } from "@mui/material";
import {
  ActionButton,
  PrimaryButton,
} from "../../../../../components/Buttons/PrimaryButton";

function DeleteDialog({ isOpen, handleCLose, handleSubmit }) {
  return (
    <div>
      {" "}
      <Dialog
        open={isOpen}
        onClose={handleCLose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={styles.dialogWrap}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {"Delete Product"}
          </Typography>
          <Typography variant="body1" color={"text.secondary"}>
            {"Are your sure you want to delete this item ?"}
          </Typography>

          <div className={styles.buttonContainer}>
            <div className={styles.cancelButton}>
              <ActionButton sx={{ mt: 4 }} onClick={handleCLose}>
                CANCEL
              </ActionButton>
            </div>

            <div className={styles.savebutton}>
              <PrimaryButton
                color={"primary"}
                sx={{ mt: 4, ml: 4 }}
                onClick={handleSubmit}
              >
                CONFIRM
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default DeleteDialog;
