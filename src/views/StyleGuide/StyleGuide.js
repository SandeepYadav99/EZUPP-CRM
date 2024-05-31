import React, { useCallback, useState } from "react";
import PageBoxComponent from "../../components/PageBox/PageBox.component";
import CustomSelectField from "../../components/FormFields/SelectField/SelectField.component";
import CustomDatePicker from "../../components/FormFields/DatePicker/CustomDatePicker";
import RadioButtons from "../../components/RadioButtons/RadioButtons";
import RadioButtonWithText from "../../components/RadioButtons/RadioButtonWithText";
import BasicButtonGroup from "../../components/BasicButtonGroup/BasicButtonGroup";
import {
  ActionButton,
  ArrowActionButton,
  ArrowOutlineButton,
  ArrowPrimaryButton,
  OutlineButton,
  PrimaryButton,
} from "../../components/Buttons/PrimaryButton";
import styles from "./Style.module.css";
import {
  MenuItem,
  Typography,
  Autocomplete,
  TextField,
  Avatar,
} from "@mui/material";
import CustomTextField from "../../components/FormFields/TextField/TextField.component";
import StatusPill from "../../components/Status/StatusPill.component";
// import CustomTextField from '../../FormFields/TextField.component';
import ShadowBox from "../../components/ShadowBox/ShadowBox";
import UserCountAvatars, {
  UserCountAvatarsAnimation,
  UserCountAvatarsInitials,
  UserCountAvatarsLabelInitials,
  UserCountAvatarsLableAvatarGroup,
  UserCountAvatarsLableAvatarStatusIndicator,
  UserCountAvatarsShapes,
  UserCountAvatarsSize,
  UserCountAvatarsStatusIndicator,
} from "../../components/AvatarGroup/AvatarGroup";
import { UserCountRadioLables } from "../../components/BasicAndCustomRadio/RadioLables";
import { CustomOptionRadiosWithIcon } from "../../components/BasicAndCustomRadio/CustomOptionRadiosWithIcon";
import TimeLine from "../../components/TimeLine/TimeLine.component";
import { useTheme } from "@mui/styles";
import CustomMultiComplete from "../../components/FormFields/AutoCompleteText/MultiComplete";
import img from "../../assets/img/1.png";
import home from "../../assets/Assets/ic_dashboard_grey.png";
import business from "../../assets/Assets/ic_business (1).png";
import individual from "../../assets/Assets/ic_individual (1).png";
import ColorPicker from "../../components/ColorPicker/ColorPicker";
import CheckboxWithText from "../../components/RadioButtons/CheckboxWithText";
import useStyleGuide from "./StyleGuide.hook";
import Constants from "../../config/constants";

const avatars = ["A", "B", "C", "2k"];
const AutoCompleteData = [
  {
    id: 1,
    title: "Ardeen Batisse",
    label: "Ardeen Batisse",
    image: img,
    email: "user1@example.com",
  },
  {
    id: 2,
    title: "Justinian Hattersley",
    label: "Justinian Hattersley",
    image: img,
    email: "user2@example.com",
  },
  {
    id: 1,
    title: "Graeme Yellowley",
    label: "Graeme Yellowley",
    image: img,
    email: "user3@example.com",
  },
];
const StyleGuide = ({}) => {
  const theme = useTheme();
  const { checkboxValue, handleCheckboxChange } = useStyleGuide({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUsersSingle, setSelectedUsersSingle] = useState("");
  const changeTextData = useCallback(
    (text, fieldName) => {
      if (fieldName === "user_list") {
        setSelectedUsers([...text]);
      } else {
        setSelectedUsersSingle(text);
      }
      console.log("changeTextData", text, fieldName);
    },
    [selectedUsers, selectedUsersSingle]
  );
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = (value) => {
    setSelectedValue(value);
    // if (selectedValue === value) {
    //   setSelectedValue("");
    // } else {
    //   setSelectedValue(value);
    // }
  };

  return (
    <PageBoxComponent>
      <div className={"formFlex"}>
        <div className={styles.sideMargin}>
          <div>
            <Typography variant={"h5"}>Normal</Typography>
          </div>
          <div className={styles.boxCont}>
            <PrimaryButton>Normal</PrimaryButton>
          </div>
          <div className={styles.boxCont}>
            <PrimaryButton disabled={true}>Normal</PrimaryButton>
          </div>
        </div>
        <div className={styles.sideMargin}>
          <div>
            <Typography variant={"h5"}>Outline</Typography>
          </div>
          <div className={styles.boxCont}>
            <OutlineButton>Normal</OutlineButton>
          </div>
          <div className={styles.boxCont}>
            <OutlineButton disabled={true}>Normal</OutlineButton>
          </div>
        </div>

        <div className={styles.sideMargin}>
          <div>
            <Typography variant={"h5"}>Action</Typography>
          </div>
          <div className={styles.boxCont}>
            <ActionButton>Normal</ActionButton>
          </div>
          <div className={styles.boxCont}>
            <ActionButton disabled={true}>Normal</ActionButton>
          </div>
        </div>
        <div className={styles.sideMargin}>
          <div>
            <Typography variant={"h5"}>Small</Typography>
          </div>
          <div className={styles.boxCont}>
            <PrimaryButton size={"small"}>Normal</PrimaryButton>
          </div>
          <div className={styles.boxCont}>
            <PrimaryButton disabled={true} size={"small"}>
              Normal
            </PrimaryButton>
          </div>
        </div>
      </div>

      <br />
      <br />
      <div className={"formFlex"}>
        <div className={styles.sideMargin}>
          <div>
            <Typography variant={"h5"}>Arrow Normal</Typography>
          </div>
          <div className={styles.boxCont}>
            <ArrowPrimaryButton>Normal</ArrowPrimaryButton>
          </div>
          <div className={styles.boxCont}>
            <ArrowPrimaryButton disabled={true}>Normal</ArrowPrimaryButton>
          </div>
        </div>
        <div className={styles.sideMargin}>
          <div>
            <Typography variant={"h5"}>Outline</Typography>
          </div>
          <div className={styles.boxCont}>
            <ArrowOutlineButton>Normal</ArrowOutlineButton>
          </div>
          <div className={styles.boxCont}>
            <ArrowOutlineButton disabled={true}>Normal</ArrowOutlineButton>
          </div>
        </div>

        <div className={styles.sideMargin}>
          <div>
            <Typography variant={"h5"}>Action</Typography>
          </div>
          <div className={styles.boxCont}>
            <ArrowActionButton>Normal</ArrowActionButton>
          </div>
          <div className={styles.boxCont}>
            <ArrowActionButton disabled={true}>Normal</ArrowActionButton>
          </div>
        </div>
      </div>

      <br />
      <br />
      <div className={""}>
        <div className={styles.sideMargin}>
          <div>
            <Typography variant={"h5"}>Text</Typography>
          </div>
          <div className={styles.boxCont}>
            <CustomTextField label={"Name"} />
            <br />
            <br />
            <CustomTextField label={"Name"} isError={true} />

            <br />
            <br />
            <CustomTextField label={"Name"} value={"Electrovese"} />
          </div>
        </div>
      </div>
      <div className={""}>
        <div className={styles.sideMargin}>
          <Typography variant={"h5"}>Select Field</Typography>
          <div className={styles.boxCont}>
            <CustomSelectField label={"Name"}>
              <MenuItem value="Electrovese">Electrovese</MenuItem>
            </CustomSelectField>
            <br />
            <br />
            <CustomSelectField label={"Name"} value="Electrovese">
              <MenuItem value="Electrovese">Electrovese</MenuItem>
            </CustomSelectField>
            <br />
            <br />
            <CustomSelectField label={"Name"} isError={true}>
              <MenuItem value="Electrovese">Electrovese</MenuItem>
            </CustomSelectField>
          </div>
        </div>
      </div>
      <div className={""}>
        <div className={styles.sideMargin}>
          <div>
            <Typography variant={"h5"}>Auto Complete</Typography>
          </div>
          <div className={styles.boxCont}>
            <div className={styles.boxCont}>
              <Typography variant={"h6"}>Multipe select</Typography>
            </div>
            <Autocomplete
              size={"small"}
              multiple
              id="tags-outlined"
              options={AutoCompleteData ? AutoCompleteData : []}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Add Guests" />
              )}
            />
            <br />
            <CustomMultiComplete
              multiple
              showImage
              AutoCompleteList={AutoCompleteData}
              label="User Lists"
              value={selectedUsers}
              onTextChange={(text) => {
                changeTextData(text, "user_list");
              }}
              enableField={["title", "email"]}
              getOptionLabel={(option) => option.email}
            />
            <br />
            <CustomMultiComplete
              AutoCompleteList={AutoCompleteData}
              label="User Lists Single"
              value={selectedUsersSingle}
              onTextChange={(text) => {
                changeTextData(text, "user_list_single");
              }}
              getOptionLabel={(option) => option.email}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Add Guests" />
              )}
              isError={true}
            />
            <div className={styles.boxCont}>
              <Typography variant={"h6"}>single select</Typography>
            </div>
            {/* <Autocomplete
                            id="tags-outlined"
                            options={AutoCompleteData ? AutoCompleteData : []}
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" label="Add Guests"/>
                            )}
                        /> */}
            <div className={styles.boxCont}>
              <Typography variant={"h6"}>Error Field with Disabled</Typography>
            </div>
            <Autocomplete
              disabled={true}
              id="tags-outlined"
              options={AutoCompleteData ? AutoCompleteData : []}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Add Guests"
                  error={true}
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className={""}>
        <div className={styles.sideMargin}>
          <div>
            <Typography variant={"h5"}>DatePicker</Typography>
          </div>
          <div className={styles.boxCont}>
            <CustomDatePicker
              clearable
              label={"Select Date"}
              maxDate={new Date()}
              //  isError={errorData?.end_date}
            />
          </div>
          <br />
          <CustomDatePicker
            clearable
            disabled={true}
            label={"Select Date"}
            isError={true}
          />
        </div>
      </div>
      <div className={""}>
        <div className={styles.sideMargin}>
          <br />

          <div>
            <Typography variant={"h5"}>Status</Typography>
          </div>
          <div className={styles.boxCont}>
            <StatusPill status={"High"} color={"high"} /> &nbsp;
            <StatusPill status={"Inactive"} color={"high"} /> &nbsp;
            <StatusPill status={"Medium"} color={"medium"} /> &nbsp;
            <StatusPill status={"Low"} color={"low"} />
            &nbsp;
            <StatusPill status={"Active"} color={"active"} />
            &nbsp;
            <StatusPill status={"Service"} color={"service"} /> &nbsp;
            <StatusPill status={"Warm"} color={"warm"} /> &nbsp;
          </div>
        </div>
      </div>

      <div className={""}>
        <div className={styles.sideMargin}>
          <div>
            <Typography variant={"h5"}>Status</Typography>
          </div>
          <div className={styles.boxCont}>
            <ShadowBox>
              <Typography
                variant={"h5"}
                color={"text.secondary"}
                sx={{ mb: 1.5 }}
              >
                Sales Overview
              </Typography>
              <Typography variant={"h4"} color={"secondary"}>
                42.5K
              </Typography>
              <Typography variant={"body2"} color={"text.secondary"}>
                Total Sales
              </Typography>
            </ShadowBox>
          </div>
        </div>
      </div>

      <div className={""}>
        <div className={styles.sideMargin}>
          <div>
            <Typography variant={"h5"}>Status</Typography>
          </div>
          <div className={styles.boxCont}>
            {[
              { name: "h1", font: "38" },
              { name: "h2", font: "30" },
              { name: "h3", font: "24" },
              { name: "h4", font: "20" },
              { name: "h5", font: "16" },
              { name: "h6", font: "14" },
              { name: "caption", font: "12" },
              { name: "body1", font: "14" },
              { name: "body2", font: "12" },
              { name: "subtitle1", font: "14" },
              { name: "subtitle2", font: "12" },
              { name: "overline", font: "12" },
            ].map((key) => {
              return (
                <Typography variant={key?.name}>
                  Here is the text - {key?.name} - {key?.font} px
                </Typography>
              );
            })}

            <h5>Color Property</h5>
            {[
              "h1",
              "h2",
              "h3",
              "h4",
              "h5",
              "h6",
              "caption",
              "body1",
              "body2",
              "subtitle1",
              "subtitle2",
              "overline",
              "subtitle3",
            ].map((key) => {
              return (
                <Typography color={"text.secondary"} variant={key}>
                  Here is the text - {key}
                </Typography>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.boxContFlex}>
        <UserCountAvatarsSize />
        <UserCountAvatarsInitials />
        <UserCountAvatarsLabelInitials />
        <UserCountAvatarsShapes />
        <UserCountAvatarsStatusIndicator />
        <UserCountAvatarsLableAvatarStatusIndicator />
      </div>
      <br />
      <div>
        <div>
          <UserCountAvatarsLableAvatarGroup avatars={avatars} />
        </div>
      </div>
      <br />
      {/* <div>
        <UserCountRadioLables />
      </div>
      <br />
      <div>
        <CustomOptionRadiosWithIcon />
      </div>
      <br /> */}
      <div>
        <Typography variant={"h5"}>Custom Radio options with icons</Typography>
      </div>
      <br></br>
      <div className={styles.radio}>
        <RadioButtons
          iconComp={<img src={business} />}
          title="Business"
          checked={selectedValue === Constants.PROFILE_TYPE.BUSINESS}
          handleChange={handleChange}
          value={Constants.PROFILE_TYPE.BUSINESS}
        />
        <RadioButtons
          iconComp={<img src={individual} />}
          title="Individual"
          checked={selectedValue === Constants.PROFILE_TYPE.INDIVIDUAL}
          handleChange={handleChange}
          value={Constants.PROFILE_TYPE.INDIVIDUAL}
        />
      </div>
      <br></br>
      {selectedValue === Constants.PROFILE_TYPE.BUSINESS ? (
        <div>business</div>
      ) : (
        <div>Individual profile</div>
      )}
      <div>
        <Typography variant={"h5"}>Basic Radio Option</Typography>
      </div>
      <br></br>
      <div className={styles.radio}>
        <RadioButtonWithText
          title="I want to access Newsletter"
          description="Yes!, I would love the updates."
          checked={selectedValue === "news"}
          handleChange={handleChange}
          value="news"
          //type="checkbox"
          inputType="radio"
        ></RadioButtonWithText>
        <RadioButtonWithText
          title="I don't want access to Newsletter"
          description="I have no interest in staying updated."
          checked={selectedValue === "Nonews"}
          handleChange={handleChange}
          value="Nonews"
          inputType="radio"
          //type="checkbox"
        ></RadioButtonWithText>
      </div>
      <br></br>
      <div>
        <Typography variant={"h5"}>Basic Checkbox Option</Typography>
      </div>
      <br></br>
      <div className={styles.radio}>
        <CheckboxWithText
          title="Show Public"
          description="Make the product visible to public"
          checked={checkboxValue.indexOf("one") >= 0}
          handleChange={handleCheckboxChange}
          value="one"
        ></CheckboxWithText>
        <CheckboxWithText
          title="Value Add"
          description="Value add help text to be shown here"
          checked={checkboxValue.indexOf("ne") >= 0}
          handleChange={handleCheckboxChange}
          value="ne"
        ></CheckboxWithText>
      </div>
      <br></br>
      <div>
        <Typography variant={"h5"}>Basic Button Group</Typography>
      </div>
      <br></br>
      <BasicButtonGroup
        buttonText={[
          "Pending",
          "In Progress",
          "Proposal Sent",
          "Archived",
          "Customers",
          "All",
        ]}
        selectedIndex={0}
    onButtonClick={(index) => console.log(`Button ${index} clicked`)}
      />
      <div className={styles.timeLineComponent}>
        <Typography gutterBottom variant="h5">
          Reusable TimeLine Component
        </Typography>
        <TimeLine />
      </div>
      <br />
      <div>
        <ColorPicker />
      </div>
    </PageBoxComponent>
  );
};

export default StyleGuide;
