import React from "react";
import styles from "../Styles.module.css";
import {  MenuItem, ButtonBase, Typography } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import history from "../../../libs/history.utils";
import PersonalInfo from "./Components/PersonalInfo";
import BusinessInfo from "./Components/BusinessInfo";
import ProfilingLead from "./Components/ProfilingLead";
import AdditionalInfo from "./Components/AdditionalInfo";
import {
  PrimaryButton,
  ActionButton,
} from "../../../components/Buttons/PrimaryButton";
import ContactCreatehook from "./ContactCreatehook";
const ContactCreate = ( {}) => {
  const {
    errorData,
    changeTextData,
    form,
    onBlurHandler,
    source
  } = ContactCreatehook();
  return (
    <>
      <div className={styles.outerFlex1}>
        <div className={styles.iconButton}>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIos fontSize={"small"} />{" "}
          </ButtonBase>
          <Typography variant={"title1"}>Create Contact</Typography>
        </div>
      </div>
      
       
        <PersonalInfo
        errorData={errorData}
        form={form}
        changeTextData={changeTextData}
        />
        <BusinessInfo 
        errorData={errorData}
        form={form}
        changeTextData={changeTextData}
        />
        <ProfilingLead
        errorData={errorData}
        form={form}
        changeTextData={changeTextData}
        source={source}
        />
        <AdditionalInfo
        errorData={errorData}
        form={form}
        changeTextData={changeTextData}
        />
        <div className={styles.buttonContainer}>
        <div className={styles.cancelButton}>
          <ActionButton sx={{ mt: 4 }}>CANCEL</ActionButton>
        </div>

        <div className={styles.saveButton}>
          <PrimaryButton
            color={"primary"}
            sx={{ mt: 4 }}
           // onClick={handleSubmit}
          >
            CREATE
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default ContactCreate;
