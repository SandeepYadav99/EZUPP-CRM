import React, { useState } from 'react';
import PageBoxComponent from "../../components/PageBox/PageBox.component";
import CustomSelectField from "../../components/FormFields/SelectField/SelectField.component";
import CustomDatePicker from "../../components/FormFields/DatePicker/CustomDatePicker";

import {
    ActionButton, ActionMultiSelectButton, ArrowActionButton,
    ArrowOutlineButton,
    ArrowPrimaryButton,
    OutlineButton,
    PrimaryButton
} from "../../components/Buttons/PrimaryButton";
import styles from './Style.module.css';
import CustomSelectField from '../../components/FormFields/SelectField/SelectField.component';
import CustomDatePicker from '../../components/FormFields/DatePicker/CustomDatePicker';
import {MenuItem, Typography,Autocomplete,TextField, Avatar} from "@mui/material";
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
const avatars = ["A", "B", "C", "2k"];

const AutoCompleteData=[
    {
        id:1,
        title:"test",
        label:"test",
        image:"../../assets/img/1.png",
        email: "user1@example.com",
    },
    {
        id:2,
        title:"Development",
        label:"Development",
        image:"../../assets/img/1.png",
        email: "user2@example.com",
    },
    {
        id:1,
        title:"QA",
        label:"QA",
        image:"../../assets/img/1.png",
        email: "user3@example.com",
    },
]
const StyleGuide = ({}) => {
    const theme = useTheme();
        const [selectedUsers, setSelectedUsers] = useState([]);
    // console.log('theme', theme);
    return (
        <PageBoxComponent>
            <div className={'formFlex'}>
                <div className={styles.sideMargin}>
                    <div>
                        <Typography variant={'h5'}>Normal</Typography></div>
                    <div className={styles.boxCont}>
                        <PrimaryButton>
                            Normal
                        </PrimaryButton>
                    </div>
                    <div className={styles.boxCont}>
                        <PrimaryButton disabled={true}>
                            Normal
                        </PrimaryButton>
                    </div>
                </div>
                <div className={styles.sideMargin}>
                    <div><Typography variant={'h5'}>Outline</Typography></div>
                    <div className={styles.boxCont}>
                        <OutlineButton>
                            Normal
                        </OutlineButton>
                    </div>
                    <div className={styles.boxCont}>
                        <OutlineButton disabled={true}>
                            Normal
                        </OutlineButton>
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

                        <br/>
                        <br/>
                        <CustomTextField label={'Name'} value={'Electrovese'}/>
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
             <br/>
             <br/>
             <CustomSelectField label={"Name"} isError={true}>
               <MenuItem value="Electrovese">Electrovese</MenuItem>
             </CustomSelectField>
           </div>
           </div>
            </div>
            <div className={''}>
                <div className={styles.sideMargin}>
                    <div><Typography variant={'h5'}>Auto Complete</Typography></div>
                    <div className={styles.boxCont}>
                    <div className={styles.boxCont}>
                        <Typography variant={'h6'}>Multipe select</Typography>
                        </div>
                    <Autocomplete
                     multiple
                     id="tags-outlined"
                    options={AutoCompleteData ? AutoCompleteData : []}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Add Guests"
                      />
                    )}
                      />
                       <Autocomplete
                        multiple
                         id="user-autocomplete"
                         options={AutoCompleteData ? AutoCompleteData : []}
                         getOptionLabel={(user) => user.email}
                         onChange={(event, newValue) => {
                           setSelectedUsers(newValue);
                         }}
                         renderInput={(params) => (
                           <TextField
                             {...params}
                             variant="outlined"
                             label="Select Users"
                             placeholder="Select Users"
                           />
                         )}
                         renderOption={(props, option) => (
                           <li {...props} >
                             <Avatar src={require("../../assets/img/1.png")} alt={option.email} />
                             <div className='option_auto_class'>{option.email}</div>
                           </li>
                         )}
                         renderTags={(value, getTagProps) =>
                           value.map((option, index) => (
                          <div className='multipe_auto_options'>
                            <ActionMultiSelectButton>
                             <Avatar
                                {...getTagProps({ index })}
                                src={require("../../assets/img/1.png")}
                                alt={option.email}
                                sx={{ width: 20, height: 20 }}
                             />
                             <span>{option?.email}</span>
                        </ActionMultiSelectButton>

                             </div>
                           ))

                          }
                        />
                      <div className={styles.boxCont}>
                        <Typography variant={'h6'}>single select</Typography>
                        </div>
                        <Autocomplete
                         id="tags-outlined"
                        options={AutoCompleteData ? AutoCompleteData : []}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => (
                        <TextField
                         {...params}
                        variant="outlined"
                        label="Add Guests"
                        />
                        )}
                        />
                         <div className={styles.boxCont}>
                        <Typography variant={'h6'}>Error Field with Disabled</Typography>
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
            <div className={''}>
                <div className={styles.sideMargin}>
                    <div><Typography variant={'h5'}>DatePicker</Typography></div>
                    <div className={styles.boxCont}>
                    <CustomDatePicker
                     clearable
                     label={"Select Date"}
                     maxDate={new Date()}
                    //  isError={errorData?.end_date}
                     />
                    </div>
                    <br/>
                    <CustomDatePicker
                     clearable
                     disabled={true}
                     label={"Select Date"}
                     isError={true}
                     />
                    </div>
                    </div>
                     <div className={''}>
                     <div className={styles.sideMargin}>
                    <br/>

                    <div><Typography variant={'h5'}>Status</Typography></div>
                    <div className={styles.boxCont}>
                        <StatusPill status={'High'} color={'high'}/> &nbsp;
                        <StatusPill status={'Inactive'} color={'high'}/> &nbsp;
                        <StatusPill status={'Medium'} color={'medium'}/> &nbsp;
                        <StatusPill status={'Low'} color={'low'}/>&nbsp;
                        <StatusPill status={'Active'} color={'active'}/>&nbsp;

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

            <div className={''}>
                <div className={styles.sideMargin}>
                    <div><Typography variant={'h5'}>Status</Typography></div>
                    <div className={styles.boxCont}>
                        {
                            ([{name:'h1',font:"38"}, {name:'h2',font:"30"}, {name:'h3',font:"24"}, {name:'h4',font:"20"}, {name:'h5',font:"16"}, {name:'h6',font:"14"}, {name:'caption',font:"12"}, {name:'body1',font:"14"}, {name:'body2',font:"12"}, {name:'subtitle1',font:"14"}, {name:'subtitle2',font:"12"}, {name:'overline',font:"12"},]).map(key => {
                                return (<Typography variant={key?.name}>Here is the text - {key?.name} - {key?.font} px</Typography>)
                            })
                        }


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
      <div>
        <UserCountRadioLables />
      </div>
      <br />
      <div>
        <CustomOptionRadiosWithIcon />
      </div>
      <div className={styles.timeLineComponent}>
        <Typography gutterBottom variant="h5">
          Reusable TimeLine Component
        </Typography>
        <TimeLine />
      </div>
    </PageBoxComponent>
  );
};

export default StyleGuide;
