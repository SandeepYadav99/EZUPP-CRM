import React from "react";
import styles from "../Styles.module.css";
import { ArrowBackIos } from "@mui/icons-material";
import history from "../../../libs/history.utils";
import PersonalInfo from "./Components/PersonalInfo";
import ProfilingLead from "./Components/ProfilingLead";
import {
  PrimaryButton,
  ActionButton,
} from "../../../components/Buttons/PrimaryButton";
import {
  Dialog,
  ButtonBase,
  Typography,
  Button,
} from "@mui/material";
import ContactCreatehook from "./CustomerCreatehook";
import LogUtils from "../../../libs/LogUtils";

const CustomerCreate = ({}) => {
  const {
    errorData,
    form,
    onBlurHandler,
    source,
    changeTextData,
    handleSubmit,
    handleCancel,
    listData,
    confirmPopUp,
    handleDialogClose,
    suspendItem,
  } = ContactCreatehook();
  const RenderDialog = () => {
    if (confirmPopUp) {
      return (
        <Dialog
          keepMounted
          open={confirmPopUp}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            sx: { borderRadius: '9px' } 
          }}
        >
          <div className={styles.dialogWrap}>
            <Typography variant="subtitle1" sx={{mb:1}}>
              {"Contact Already Existing!"}
            </Typography>
            <Typography variant="body1">
              Contact with same phone number and email already exist in the
              system. You can check the contact details for confirmation.
              <br />
            </Typography>
            <div className={styles.buttonContainer}>
              <div className={styles.cancelButton}>
                <ActionButton sx={{ mt: 2 }} onClick={handleDialogClose}>
                 <Typography variant="subtitle1" > CANCEL </Typography>
                </ActionButton>
              </div>

              <div className={styles.saveButton}>
                <PrimaryButton
                  color={"primary"}
                  sx={{ mt: 2 }}
                //   onClick={handleSubmit}
                >
                 <Typography variant="subtitle1" > VIEW CONTACT</Typography> 
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
    <>
      {confirmPopUp && <RenderDialog />}
      <div className={styles.outerFlex1}>
        <div className={styles.iconButton}>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIos fontSize={"small"} />{" "}
          </ButtonBase>
          <Typography variant={"title1"}>Create Customer</Typography>
        </div>
      </div>
      <PersonalInfo
        errorData={errorData}
        form={form}
        changeTextData={changeTextData}
      />
      {/* <BusinessInfo
        errorData={errorData}
        form={form}
        changeTextData={changeTextData}
      /> */}
      <ProfilingLead
        errorData={errorData}
        form={form}
        changeTextData={changeTextData}
        source={source}
        listData={listData}
      />
      {/* <AdditionalInfo
        errorData={errorData}
        form={form}
        changeTextData={changeTextData}
      /> */}
      <div className={styles.buttonContainer}>
        <div className={styles.cancelButton}>
          <ActionButton sx={{ mt: 4 }} onClick={handleCancel}>
            CANCEL
          </ActionButton>
        </div>

        <div className={styles.saveButton}>
          <PrimaryButton
            color={"primary"}
            sx={{ mt: 4 }}
            onClick={handleSubmit}
          >
            CREATE
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default CustomerCreate;
