import { Dialog, Slide, Typography } from "@mui/material";
import React from "react";
import styles from "./Styles.module.css";
import {
  ActionButton,
  PrimaryButton,
} from "../../../components/Buttons/PrimaryButton";
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const DeletePopUp = ({ open, handleClose, closeDialog, handleDelete, id }) => {
  return (
    <div>
      {" "}
      <div className={styles.mainLoginViewDelete}>
        <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          fullWidth={true}
          PaperProps={{
            style: {
              borderRadius: "4px",
              maxWidth: "350px",
              width: "calc(100% - 64px)",
              padding:"10px 0px"
            },
          }}
        >
            <div className={styles.formContainer}>
              <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                {" Are your sure you want to delete the role ?"}
              </Typography>
              <div className={styles.buttonContainer}>
                <ActionButton sx={{ mt: 4 }} onClick={handleClose}>
                  CANCEL
                </ActionButton>
                <PrimaryButton
                  color={"primary"}
                  sx={{ mt: 4, ml: 4 }}
                  onClick={() => handleDelete(id)}
                >
                  CONFIRM
                </PrimaryButton>
              </div>
              </div>
        </Dialog>
      </div>
    </div>
  );
};

export default DeletePopUp;
