import React, { useState } from "react";
import styles from "./Style.module.css";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Container,
  Grid,
  Box,
  InputLabel,
  FormControl,
  IconButton,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import ShadowBox from "../../../components/ShadowBox/ShadowBox";
import Image from "../../../assets/img/whatsappImageezupp.png";
import useInvoiceCreate from "./InvoiceCreate.hook";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import { Popover, List, ListItem, ListItemText } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import PhoneIcon from "@mui/icons-material/Phone";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const InvoiceCreate = () => {
  const {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    isSubmitting,
    errorData,
    handleClick,
    handleClose,
    open,
    id,
    anchorEl,
  } = useInvoiceCreate({});

  const theme = useTheme();

  return (
    <ShadowBox className={styles.boxWrapper}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: theme.palette.text.primary,
        }}
      >
        Create Template
      </Typography>
      <Divider style={{ marginTop: "20px", marginBottom: "20px" }} />
      <div className={styles.formWrap}>
        <div className={styles.left}>
          <div className={styles.scroll}>
            <div className={styles.formWrp}>
              <div className={styles.formGroup}>
                <CustomSelectField
                  isError={errorData?.type}
                  errorText={errorData?.type}
                  label={"Notification Type"}
                  value={form?.type}
                  handleChange={(value) => {
                    changeTextData(value, "type");
                  }}
                >
                  <MenuItem value="email">Email</MenuItem>
                  <MenuItem value="sms">SMS</MenuItem>
                </CustomSelectField>
              </div>
              <div className={styles.formGroup}>
                <CustomSelectField
                  isError={errorData?.phone_no}
                  errorText={errorData?.phone_no}
                  label={"Choose Phone Number"}
                  value={form?.phone_no}
                  handleChange={(value) => {
                    changeTextData(value, "phone_no");
                  }}
                >
                  <MenuItem value="CXO">CXO</MenuItem>
                </CustomSelectField>
              </div>
              <div className={styles.formGroup}></div>
              <div className={styles.formGroup}></div>
            </div>
            <div className={styles.formWrp}>
              <div className={styles.formGroup}>
                <CustomTextField
                  isError={errorData?.name}
                  errorText={errorData?.name}
                  label={"Template name *"}
                  value={form?.name}
                  onTextChange={(text) => {
                    changeTextData(text, "name");
                  }}
                />
              </div>
              <div className={styles.formGroup}>
                <CustomSelectField
                  isError={errorData?.category}
                  errorText={errorData?.category}
                  label={"Category"}
                  value={form?.category}
                  handleChange={(value) => {
                    changeTextData(value, "category");
                  }}
                >
                  <MenuItem value="CXO">CXO</MenuItem>
                </CustomSelectField>
              </div>
              <div className={styles.formGroup}>
                <CustomSelectField
                  isError={errorData?.language}
                  errorText={errorData?.language}
                  label={"Language *"}
                  value={form?.language}
                  handleChange={(value) => {
                    changeTextData(value, "language");
                  }}
                >
                  <MenuItem value="CXO">CXO</MenuItem>
                </CustomSelectField>
              </div>
              <div className={styles.formGroup}></div>
            </div>
            <div className={styles.TypWrap}>
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.text.primary,
                }}
              >
                Header
              </Typography>
              <Typography variant="body1">
                Use text, image or video to convey the message
              </Typography>
            </div>
            <div className={styles.formWrp}>
              <div className={styles.formGroup2}>
                <CustomSelectField
                  isError={errorData?.header_type}
                  errorText={errorData?.header_type}
                  label={"Header Type *"}
                  value={form?.header_type}
                  handleChange={(value) => {
                    changeTextData(value, "header_type");
                  }}
                >
                  <MenuItem value="text">Text</MenuItem>
                  <MenuItem value="image">Image</MenuItem>
                  <MenuItem value="video">Video</MenuItem>
                </CustomSelectField>
              </div>
              <div className={styles.formGroup2}></div>
            </div>
            <div className={styles.formWrp}>
              <div className={styles.formGroup}>
                <CustomTextField
                  isError={errorData?.header_title}
                  errorText={errorData?.header_title}
                  label={"Header Title *"}
                  value={form?.header_title}
                  onTextChange={(text) => {
                    changeTextData(text, "header_title");
                  }}
                />
              </div>
            </div>
            <div className={styles.TypWrap}>
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.text.primary,
                }}
              >
                Body *
              </Typography>
              <Typography variant="body1">
                Include all relevant details in the messages to keep clients
                well-informed and updated
              </Typography>
            </div>
            <div className={styles.formWrp}>
              <div className={styles.formGroup}>
                <CustomTextField
                  isError={errorData?.body}
                  errorText={errorData?.body}
                  label={"Body"}
                  value={form?.body}
                  onTextChange={(text) => {
                    changeTextData(text, "body");
                  }}
                  onBlur={() => {
                    onBlurHandler("body");
                  }}
                  multiline
                  rows={4}
                />
              </div>
            </div>
            <div className={styles.TypWrap}>
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.text.primary,
                }}
              >
                Footer
              </Typography>
              <Typography variant="body1">
                Include any closing remarks, contact details, or additional
                information at the end of the content
              </Typography>
            </div>
            <div className={styles.formWrp}>
              <div className={styles.formGroup}>
                <CustomTextField
                  isError={errorData?.footer}
                  errorText={errorData?.footer}
                  label={"Footer Text"}
                  value={form?.footer}
                  onTextChange={(text) => {
                    changeTextData(text, "footer");
                  }}
                  onBlur={() => {
                    onBlurHandler("footer");
                  }}
                />
              </div>
            </div>
            <div className={styles.TypWrap}>
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.text.primary,
                }}
              >
                Button
              </Typography>
              <Typography variant="body1">
                Allow users to take specific actions, such as opening a link,
                rating or triggering predefined responses
              </Typography>
            </div>
            <div>
              <div className={styles.TypWrap}>
                <Grid item xs={12}>
                  <Button
                    aria-describedby={id}
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                  >
                    Add Button
                  </Button>
                </Grid>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Link"
                        secondary="2 buttons maximum"
                        onClick={() => handleClose()}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Phone Number"
                        secondary="1 button maximum"
                      />
                    </ListItem>
                  </List>
                </Popover>
              </div>
            </div>
          </div>
          <div className={styles.btnWrap}>
            <Button variant="contained" color="primary" type="submit">
              Save & Submit
            </Button>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.rightWrap}>
            <img src={Image} className={styles.Image} />
            <div className={styles.imageCont}>
              <div className={styles.bottomFix}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: theme.palette.text.primary,
                  }}
                >
                  {form?.header_title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.primary,
                    marginTop:"10px"
                  }}
                >
                  {form?.body}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    marginTop:"10px"
                  }}
                >
                  {form?.footer}
                </Typography>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 2,
                  }}
                >
                  <IconButton color="primary">
                    <PhoneIcon />
                  </IconButton>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ShadowBox>
  );
};

export default InvoiceCreate;
