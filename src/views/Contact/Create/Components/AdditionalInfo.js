import React from "react";
import styles from "../../Styles.module.css";
import { Tooltip, MenuItem, Typography } from "@mui/material";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import CustomTextField from "../../../../components/FormFields/TextField/TextField.component";
import CustomSelectField from "../../../../components/FormFields/SelectField/SelectField.component";
import RadioButtonWithText from "../../../../components/RadioButtons/RadioButtonWithText";
import { InfoOutlined as InfoIcon } from "@mui/icons-material";
import { allTimeZone } from "../../../../helper/TimeZoneCountries";
const AdditionalInfo = ({ errorData, changeTextData, onBlurHandler, form }) => {
  return (
    <ShadowBox className={styles.contact}>
      <div className={"headerFlex"}>
        <h4 className={"infoTitle"}>
          <Typography variant={"title"} className={"heading"}>
            Additional Information
          </Typography>
          <Tooltip title="Info" aria-label="info" placement="right">
            <InfoIcon fontSize={"small"} />
          </Tooltip>
        </h4>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomSelectField
            isError={errorData?.time_zone}
            errorText={errorData?.time_zone}
            label={"Time Zone"}
            value={form?.time_zone}
            handleChange={(value) => {
              changeTextData(value, "time_zone");
            }}
          >  
            {allTimeZone?.map((item, index) => (
              <MenuItem value={`${item?.MobileCode}_${item?.UTC}`} key={`timezone_${index}`}>
                {`${item?.Name} ( ${item?.MobileCode} , ${item?.UTC})`}
              </MenuItem>
            ))}
          </CustomSelectField>
        </div>  
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.linkedin_url}
            errorText={errorData?.linkedin_url}
            label={"LinkedIn URL"}
            onTextChange={(text) => {
              changeTextData(text, "linkedin_url");
            }}
            className={styles.desc}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.instagram_url}
            errorText={errorData?.instagram_url}
            label={"Instagram URL"}
            onTextChange={(text) => {
              changeTextData(text, "instagram_url");
            }}
            className={styles.desc}
          />
        </div>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.twitter_url}
            errorText={errorData?.twitter_url}
            label={"Twitter URL"}
            onTextChange={(text) => {
              changeTextData(text, "twitter_url");
            }}
            className={styles.desc}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.facebook_url}
            errorText={errorData?.facebook_url}
            label={"Facebook URL"}
            onTextChange={(text) => {
              changeTextData(text, "facebook_url");
            }}
            className={styles.desc}
          />
        </div>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.youtube_url}
            errorText={errorData?.youtube_url}
            label={"Youtube URL"}
            onTextChange={(text) => {
              changeTextData(text, "youtube_url");
            }}
            className={styles.desc}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.wa_broadcast_channel}
            errorText={errorData?.wa_broadcast_channel}
            label={"WhatsApp Broadcast Channel"}
            onTextChange={(text) => {
              changeTextData(text, "wa_broadcast_channel");
            }}
            className={styles.desc}
          />
        </div>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.utm}
            errorText={errorData?.utm}
            label={"UTM"}
            onTextChange={(text) => {
              changeTextData(text, "utm");
            }}
            className={styles.desc}
          />
        </div>
      </div>
      <div className={"formFlex"}>
        <div className={"formGroup"}>
          <div className={`${styles.radio} ${styles.gap}`}>
            <RadioButtonWithText
              title="I want to access Newsletter"
              description="Yes!, I would love the updates."
              checked={form?.is_newsletter_subscribed === "NEWS"}
              handleChange={(val) =>
                changeTextData(val, "is_newsletter_subscribed")
              }
              value="NEWS"
              inputType="radio"
            ></RadioButtonWithText>
            <RadioButtonWithText
              title="I don't want access to Newsletter"
              description="I have no interest in staying updated."
              checked={form?.is_newsletter_subscribed === "NO_NEWS"}
              handleChange={(val) =>
                changeTextData(val, "is_newsletter_subscribed")
              }
              value="NO_NEWS"
              inputType="radio"
            ></RadioButtonWithText>
          </div>
        </div>
        <div className="formGroup"></div>
      </div>
    </ShadowBox>
  );
};

export default AdditionalInfo;
