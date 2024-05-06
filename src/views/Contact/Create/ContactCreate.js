import React from 'react'
import styles from "../Styles.module.css";
import {ButtonBase, Typography } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import history from "../../../libs/history.utils";
import ShadowBox from '../../../components/ShadowBox/ShadowBox';
const ContactCreate = () => {
  return (
    <div className={styles.outerFlex1}>
        <div className={styles.iconButton}>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIos fontSize={"small"} />{" "}
          </ButtonBase>
          <Typography variant={"title1"}>
             Create Contact
          </Typography>
        </div>
    </div>
  
     
  )
}

export default ContactCreate