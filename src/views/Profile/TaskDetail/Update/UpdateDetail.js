import {
  Avatar,
  Button,
  Chip,
  CircularProgress,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import CustomTextField from "../../../../FormFields/TextField.component";
import styles from "./Style.module.css";

import InfoIcon from "@mui/icons-material/Info";
import { Autocomplete } from "@mui/lab";
import { Clear, Search } from "@mui/icons-material";
import CustomSelectField from "../../../../FormFields/SelectField/SelectField.component";
import CustomDateTimePicker from "../../../../FormFields/DatePicker/CustomDateTimePicker";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import {
  ActionButton,
  PrimaryButton,
} from "../../../../components/Buttons/PrimaryButton";
import CustomDatePicker from "../../../../components/FormFields/DatePicker/CustomDatePicker";
import useAddTaskUpdate from "./UpdateDetailHook";
import CustomMultiComplete from "../../../../components/FormFields/AutoCompleteText/MultiComplete";

const AddTaskUpdate = ({
  handleSideToggle,
  isSidePanel,
  handleCreatedTask,
  profileDetails,
}) => {
  const {
    form,
    errorData,
    handleSubmit,
    onBlurHandler,
    changeTextData,
    isSubmitting,
    categoryLists,
    filteredUsers,
    filteredTask,
    filteredAssignedTo,
    fetchedAssignedUser,
    helperText,
  } = useAddTaskUpdate({
    handleSideToggle,
    isSidePanel,
    handleCreatedTask,
    profileDetails,
  });

  return (
    <div className={styles.mainContainer}>
      <ShadowBox width={"100%"}>
        <div className={styles.headerFlex}>
          <h4 className={styles.infoTitle}>
            <div className={styles.heading}>Task Details</div>
            {/* <Tooltip title="Info" aria-label="info" placement="right">
              <InfoIcon fontSize={"small"} />
            </Tooltip> */}
          </h4>
        </div>

        <div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              {/* <Autocomplete
                id="tags-outlined"
                onChange={(e, value) => {
                  changeTextData(value, "assigned_to");
                }}
                value={form.assigned_to || fetchedAssignedUser || []}
                options={filteredAssignedTo || []}
                defaultValue={form?.assigned_to || []}
                getOptionLabel={(option) =>
                  `${option?.name} (${option?.email})`
                }
                renderOption={(option) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar src={option?.image} style={{ marginRight: 8 }} />
                    <div>{`${option?.name} (${option?.email})`}</div>
                  </div>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Assigned To"
                    error={errorData?.assigned_to}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          <Search
                            style={{ marginRight: -20, cursor: "pointer" }}
                          />
                        </>
                      ),
                      startAdornment: (
                        <>
                          <Avatar
                            src={
                              form?.assigned_to?.image ||
                              fetchedAssignedUser?.image
                            }
                            style={{ marginRight: 8, cursor: "pointer" }}
                          />
                        </>
                      ),
                    }}
                  />
                )}
                disableClearable
              /> */}
               <CustomMultiComplete
              // multiple
              showImage
              AutoCompleteList={filteredAssignedTo || form.assigned_to || []}
              label="Assigned To"
              error={errorData?.assigned_to}
              getOptionLabel={(option) => option.email }
              value={form.assigned_to || fetchedAssignedUser || []}
              onTextChange={(text) => {
                changeTextData(text, "assigned_to");
              }}
              enableField={["name", "email"]}
             
            />
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.title}
                errorText={errorData?.title}
                label={"Task Title"}
                value={form?.title}
                onTextChange={(text) => {
                  changeTextData(text, "title");
                }}
                onBlur={() => {
                  onBlurHandler("title");
                }}
              />
            </div>
          </div>

          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.description}
                errorText={errorData?.description}
                label={"Description"}
                value={form?.description}
                onTextChange={(text) => {
                  changeTextData(text, "description");
                }}
                onBlur={() => {
                  onBlurHandler("description");
                }}
                multiline
                rows={3}
              />
            </div>
          </div>
         
          <div className={"formFlex"}>
            <div className={"formGroup"}>
            <CustomDatePicker
              clearable
              label={"Due Date"}
               errorText={errorData?.due_date}
              onChange={(date) => {
                 changeTextData(date, "due_date");
               
              }}
            
              className={styles.dateContainer}
              value={form?.due_date}
              isError={errorData?.due_date}
              //  helperText={helperText}
            />  
            </div>
          </div>

          <div className="formFlex">
            <div className={"formGroup"}>
              <Autocomplete
                multiple
                id="tags-outlined"
                onChange={(e, value) => {
                  changeTextData(value, "category");
                }}
                options={categoryLists || []}
                value={form?.category}
                freeSolo
                selectOnFocus={false}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    /> // disabled={option.length < 2}
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Task Category"
                    error={errorData?.category}
                  />
                )}
              />
              <label className={styles.paragraph}>
                Please press enter to add a category if not found in the search
                results.
              </label>
            </div>
          </div>

          <div className="formFlex">
            <div className={"formGroup"}></div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.type}
                errorText={errorData?.type}
                label={"Task Type"}
                value={form?.type}
                handleChange={(value) => {
                  changeTextData(value, "type");
                }}
              >
                <MenuItem value="DISCUSS">Discuss</MenuItem>
              </CustomSelectField>
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.priority}
                errorText={errorData?.priority}
                label={"Category "}
                value={form?.priority}
                handleChange={(value) => {
                  changeTextData(value, "priority");
                }}
              >
                <MenuItem value="HIGH">High</MenuItem>
                <MenuItem value="MEDIUM">Medium</MenuItem>
                <MenuItem value="LOW">Low</MenuItem>
              </CustomSelectField>
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <Autocomplete
                id="tags-outlined"
                onChange={(e, value) => {
                  changeTextData(value, "associated_user");
                }}
                value={form?.associated_user || []}
                options={filteredUsers || []}
                getOptionLabel={(option) =>
                  `${option?.name || ""} ${
                    option?.email ? `(${option?.email})` : ""
                  }`
                }
                renderOption={(option) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Avatar src={option?.image} style={{ marginRight: 8 }} />
                    <div>{`${option?.name} (${option?.email})`}</div>
                  </div>
                )}
                defaultValue={form?.associated_user || []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Associated User (Optional)"
                    error={errorData?.associated_user}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {form?.associated_user ? (
                            <Clear
                              onClick={() =>
                                changeTextData(null, "associated_user")
                              }
                              style={{ cursor: "pointer" }}
                            />
                          ) : null}
                          <Search
                            style={{ marginRight: -20, cursor: "pointer" }}
                          />
                        </>
                      ),
                      startAdornment: (
                        <Avatar
                          src={form?.associated_user?.image || ""}
                          style={{ marginRight: 8, cursor: "pointer" }}
                        />
                      ),
                    }}
                  />
                )}
                disableClearable
              />
            </div>
          </div>
          <div className={"formFlex"}>
            <div className={"formGroup"}>
              <Autocomplete
                id="tags-outlined"
                onChange={(e, value) => {
                  changeTextData(value, "associated_task");
                }}
                value={form.associated_task || []}
                options={filteredTask || []} // listData ||
                getOptionLabel={(option) => option?.title}
                defaultValue={form?.associated_task || []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Associated Task (Optional)"
                    error={errorData?.associated_task}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {form?.associated_task ? (
                            <Clear
                              onClick={() =>
                                changeTextData(null, "associated_task")
                              }
                              style={{ cursor: "pointer" }}
                            />
                          ) : null}
                          <Search
                            style={{ marginRight: -20, cursor: "pointer" }}
                          />
                        </>
                      ),
                    }}
                  />
                )}
                disableClearable
              />
            </div>
          </div>
        </div>
      </ShadowBox>
      <div style={{ float: "right", marginTop: "15px" }}>
        <PrimaryButton
          onClick={() => {
            handleSubmit();
          }}
        >
          {isSubmitting ? (
            <CircularProgress color="success" size="20px" />
          ) : (
            "ADD"
          )}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default AddTaskUpdate;
