import React, { useState, useCallback } from "react";
import styles from "./Styles.module.css";
import { Dialog, ButtonBase, Typography } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import history from "../../../libs/history.utils";
import {
  OutlineButton,
  ActionButton,
  PrimaryButton,
} from "../../../components/Buttons/PrimaryButton";
import removeTask from "../../../assets/Assets/ic_delete@2x.png";
import editTask from "../../../assets/Assets/ic_edit_blue@2x.png";
import noshow from "../../../assets/Assets/ic_no_show@2x.png";
import revenue from "../../../assets/Assets/ic_revenue@2x.png";
import time from "../../../assets/Assets/ic_time@2x.png";
import appointment from "../../../assets/Assets/ic_appointment@2x.png";
import close from "../../../assets/Assets/ic_close@2x.png"
import ShadowBox from "../../../components/ShadowBox/ShadowBox";
import StatusPill from "../../../components/Status/StatusPill.component";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import data from "./Data";
import { useTheme } from "@mui/styles";
import CustomerDetailHook from "./CustomerDetailHook";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import MultiComplete from "../../../components/FormFields/AutoCompleteText/MultiComplete";
import Pipeline from "../../../components/PipelineStages/Pipeline";
import { it } from "date-fns/locale";
const CustomerDetail = () => {
  const theme = useTheme();
  const { openDialog, closeDialog, handleSubmit, isDialogOpen,  listData,
    tagList,
    associateTagsData, form,
    changeTextData,   openViewDetailDialog,
    closeViewDetailDialog,
    isViewDetailDialogOpen, openCancelAppointmentDialog,
    closeCancelAppointmentDialog,
    isCancelAppointmentDialogOpen,
    handleCancelAppointmentClick,
    handleGoBackClick, id,  customerDetails,  handleEdit} =
    CustomerDetailHook();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedAppointmentTab, setSelectedAppointmentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleAppointmentTabChange = (event, newValue) => {
    setSelectedAppointmentTab(newValue);
  };
  const renderStatus = useCallback((type) => {
    if (type === "New") {
      return <StatusPill status={"New"} color={"new"} />;
    } else if (type === "Started") {
      return <StatusPill status={"Started"} color={"active"} />;
    } else if (type === "Arrived") {
      return <StatusPill status={"Arrived"} color={"warm"} />;
    } else if (type === "No_show") {
      return <StatusPill status={"No Show"} color={"high"} />;
    } else if (type === "Cancelled") {
      return <StatusPill status={"Cancelled"} color={"high"} />;
    } else if (type === "Completed") {
      return <StatusPill status={"Completed"} color={"business"} />;
    }
  }, []);
  return (
    <div>
      <div>
        <div className={styles.upperFlex}>
          <ButtonBase onClick={() => history.push("/customer")}>
            <ArrowBackIos fontSize={"small"} />{" "}
            <span>
              <Typography variant={"h4"}>Customer Profile</Typography>
            </span>
          </ButtonBase>
          <div></div>
          <div className={styles.profileHeading}></div>
        </div>

        <>
          <div className={styles.gridContainer}>
            <ShadowBox className={styles.product}>
              <div className={styles.edit}>
                <Typography variant="h5">{customerDetails?.full_name}</Typography>
                <OutlineButton onClick={() => {
                
                handleEdit();
              }}>EDIT</OutlineButton>
              </div>
              <Typography
                variant="h6"
                color={"text.secondary"}
                style={{ marginTop: -8 }}
              >
                {customerDetails?.contact}
              </Typography>
              <Typography variant="h6" color={"text.secondary"} sx={{ mb: 1 }}>
                {customerDetails?.email}
              </Typography>
              {/* <StatusPill status={"In Progress"} color={"active"} /> */}
              <div className={styles.line}></div>
              <Typography
                variant="h6"
                color={"text.secondary"}
                sx={{ mt: 1.5 }}
              >
                Gender: {customerDetails?.gender}
              </Typography>
              <Typography variant="h6" color={"text.secondary"}>
                D.O.B: {customerDetails?.dobText ? customerDetails.dobText : 'N/A'}
              </Typography>
              <Typography variant="h6" color={"text.secondary"}>
                Anniversary: {customerDetails?.doaText ? customerDetails.doaText : 'N/A'}
              </Typography>
            </ShadowBox>

            <div className={styles.gridColumn}>
              <ShadowBox className={styles.product1}>
                <Typography variant="h5" sx={{ mb: 4 }}>
                  {" "}
                  Overview
                </Typography>
                <div className={styles.row21}>
                  <div className={styles.overview}>
                    <img
                      src={appointment}
                      alt="app"
                      className={styles.overImg}
                    ></img>
                    <div className={styles.overviewComp}>
                      <Typography variant="h3">3</Typography>
                      <Typography variant="body1">Appointments</Typography>
                    </div>
                  </div>
                  <div className={styles.overview}>
                    <img
                      src={noshow}
                      alt="app"
                      className={styles.overImg}
                    ></img>
                    <div className={styles.overviewComp}>
                      <Typography variant="h3">0</Typography>
                      <Typography variant="body1">No Show</Typography>
                    </div>
                  </div>
                  <div className={styles.overview}>
                    <img
                      src={revenue}
                      alt="app"
                      className={styles.overImg}
                    ></img>
                    <div className={styles.overviewComp}>
                      <Typography variant="h3">0</Typography>
                      <Typography variant="body1">Total Revenue</Typography>
                    </div>
                  </div>
                </div>
              </ShadowBox>
            </div>
          </div>

          <div className={styles.gridContainer}>
            <ShadowBox className={styles.productQuery}>
              <div className={styles.row}>
                <Typography variant="h5">Query</Typography>
                <PrimaryButton  onClick={() => openDialog()}>ADD QUERY</PrimaryButton>
              </div>
              {data.Data.map((item, index) => (
                <>
                  <div className={styles.tagRow}>
                    {item.tags.split(",").map((tag, index) => (
                      <Typography
                        variant={"body1"}
                        className={styles.tags}
                        sx={{ mt: 1 }}
                        color={"text.primary"}
                      >
                        {tag.trim()}
                      </Typography>
                    ))}
                  </div>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    {item.desc}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {item.date}
                  </Typography>

                  {index < data.Data.length - 1 && (
                    <div className={styles.line}></div>
                  )}
                </>
              ))}
            </ShadowBox>

            <ShadowBox className={styles.tab}>
              <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab label="Appointment List" />
                <Tab label="Sale List" />
              </Tabs>
              {selectedTab === 0 && (
                <div>
                  <Tabs
                    value={selectedAppointmentTab}
                    onChange={handleAppointmentTabChange}
                  >
                    <Tab label="Upcoming Appointments" />
                    <Tab label="Missed Appointments" />
                    <Tab label="Cancelled Appointments" />
                    <Tab label="Completed Appointments" />
                  </Tabs>
                  {selectedAppointmentTab === 0 && (
                    <>
                      {data.upcoming.map((appointment, index) => (
                        <div className={styles.box}>
                          <div className={styles.row}>
                            <Typography variant="subtitle1">
                              {appointment.appointment}
                            </Typography>
                            <div>{renderStatus(appointment.type)}</div>
                          </div>
                          <div className={`${styles.row} ${styles.spaceTop}`}>
                            <div className={styles.oneRow}>
                              <img
                                src={time}
                                alt="time"
                                className={styles.time}
                              ></img>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {appointment.time}
                              </Typography>
                            </div>
                            <Typography
                              variant="body2"
                              style={{ color: theme.palette.primary.main }}
                              className={styles.detail}
                              onClick={() => openViewDetailDialog(appointment)}
                            >
                              View Details
                            </Typography>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  {selectedAppointmentTab === 1 && (
                     <>
                     {data.missed.map((appointment, index) => (
                       <div className={styles.box}>
                         <div className={styles.row}>
                           <Typography variant="subtitle1">
                             {appointment.appointment}
                           </Typography>
                           <div>{renderStatus(appointment.type)}</div>
                         </div>
                         <div className={`${styles.row} ${styles.spaceTop}`}>
                           <div className={styles.oneRow}>
                             <img
                               src={time}
                               alt="time"
                               className={styles.time}
                             ></img>
                             <Typography
                               variant="body2"
                               color="text.secondary"
                             >
                               {appointment.time}
                             </Typography>
                           </div>
                           <Typography
                             variant="body2"
                             style={{ color: theme.palette.primary.main }}
                             className={styles.detail}
                             onClick={() => openViewDetailDialog(appointment)}
                           >
                             View Details
                           </Typography>
                         </div>
                       </div>
                     ))}
                   </>
                  )}
                  {selectedAppointmentTab === 2 && (
                    <>
                    {data.cancelled.map((appointment, index) => (
                      <div className={styles.box}>
                        <div className={styles.row}>
                          <Typography variant="subtitle1">
                            {appointment.appointment}
                          </Typography>
                          <div>{renderStatus(appointment.type)}</div>
                        </div>
                        <div className={`${styles.row} ${styles.spaceTop}`}>
                          <div className={styles.oneRow}>
                            <img
                              src={time}
                              alt="time"
                              className={styles.time}
                            ></img>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              {appointment.time}
                            </Typography>
                          </div>
                          <Typography
                            variant="body2"
                            style={{ color: theme.palette.primary.main }}
                            className={styles.detail}
                            onClick={() => openViewDetailDialog(appointment)}
                          >
                            View Details
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </>
                  )}
                  {selectedAppointmentTab === 3 && (
                    <>
                    {data.completed.map((appointment, index) => (
                      <div className={styles.box}>
                        <div className={styles.row}>
                          <Typography variant="subtitle1">
                            {appointment.appointment}
                          </Typography>
                          <div>{renderStatus(appointment.type)}</div>
                        </div>
                        <div className={`${styles.row} ${styles.spaceTop}`}>
                          <div className={styles.oneRow}>
                            <img
                              src={time}
                              alt="time"
                              className={styles.time}
                            ></img>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              {appointment.time}
                            </Typography>
                          </div>
                          <Typography
                            variant="body2"
                            style={{ color: theme.palette.primary.main }}
                            className={styles.detail}
                            onClick={() => openViewDetailDialog(appointment)}
                          >
                            View Details
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </>
                  )}
                </div>
              )}
              {selectedTab === 1 && (
                <>
                  <div>
                    <div
                      className={styles.rowHeader}
                      style={{
                        backgroundColor: theme.palette.tableHeadColor,
                        padding: "10px 10px",
                        borderRadius: "5px",
                        marginTop: "15px",
                      }}
                    >
                      <Typography variant="subtitle1" className={styles.cell}>
                        Invoice No.
                      </Typography>
                      <Typography variant="subtitle1" className={styles.cell}>
                        Date
                      </Typography>
                      <Typography variant="subtitle1" className={styles.cell}>
                        Staff
                      </Typography>
                      <Typography variant="subtitle1" className={styles.cell}>
                        Remarks
                      </Typography>
                      <Typography variant="subtitle1" className={styles.cell}>
                        Amount
                      </Typography>
                    </div>
                    {data.sales.map((sale, index) => (
                      <>
                        <div className={`${styles.rowSub} ${styles.paddingLR}`}>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            className={styles.cell}
                          >
                            {sale.invoiceNo}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            className={styles.cell}
                          >
                            {sale.date}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            className={styles.cell}
                          >
                            {sale.staff}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            className={styles.cell}
                          >
                            {sale.remarks}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            className={styles.cell}
                          >
                            {sale.amount}
                          </Typography>
                        </div>
                        {index < data.Data.length - 1 && (
                          <div
                            className={`${styles.line} ${styles.marginTop}`}
                          ></div>
                        )}
                      </>
                    ))}
                  </div>
                </>
              )}
              {selectedTab === 2 && (
                <div>
                  <Typography></Typography>
                </div>
              )}
            </ShadowBox>
          </div>
        </>
        <Dialog
          open={isDialogOpen}
          onClose={closeDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          //maxWidth={false}
          fullWidth={true}
          PaperProps={{
            sx: { borderRadius: '9px' } 
          }}
          sx={{
            width: "700px",
            maxWidth: "100%",
            margin: "auto",
           
          }}
        >
          <div className={`${styles.dialogWrap} `}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              {"Add Query"}
            </Typography>
            <MultiComplete
              size={"small"}
              multiple
              id="tags-outlined"
              // options={AutoCompleteData ? AutoCompleteData : []}
              AutoCompleteList={listData?.PRODUCTS ? listData?.PRODUCTS : []}
               label={"Interested In"}
              value={form?.interested_products}
              
              onTextChange={(selectedItems) => {
                changeTextData(selectedItems, "interested_products");
              }}
             
              enableField={["label"]}
           
            />
           
            <CustomTextField
              label={"Add Comments"}
              multiline
              rows="5"
              sx={{ mt: 2 }}
              className={styles.desc}
            />

            <div className={styles.buttonContainer}>
              <div className={styles.cancelButton}>
                <ActionButton sx={{ mt: 4 }} onClick={closeDialog}>
                GO BACK
                </ActionButton>
              </div>

              <div className={styles.saveButton}>
                <PrimaryButton color={"primary"} sx={{ mt: 4, ml: 4 }}>
                CONFIRM & ADD
                </PrimaryButton>
              </div>
            </div>
          </div>
        </Dialog>
        <Dialog
          open={isViewDetailDialogOpen}
          onClose={closeViewDetailDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          //maxWidth={false}
          fullWidth={true}
          PaperProps={{
            sx: { borderRadius: '9px' } 
          }}
          sx={{
            width: "700px",
            maxWidth: "100%",
            margin: "auto",
           
          }}
        >
          <div className={`${styles.dialogWrap} `}>
            <div className={styles.row}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              {"Appointment Details"}
            </Typography>
            <img src={close} alt="close" className={styles.close} onClick={closeViewDetailDialog}></img>
            </div>
            <div className={styles.row}>
           <Typography variant="subtitle1" sx={{mb:0.5}}>Appointment ID: <span style={{ color: theme.palette.text.secondary}}>D56SRSYE</span></Typography>
           <StatusPill status={"New"} color={"new"}></StatusPill>
           </div>
           <Typography variant="subtitle1" sx={{mb:0.5}}>Booking Type: <span style={{ color: theme.palette.text.secondary}}>Walk In</span></Typography>
           <Typography variant="subtitle1" sx={{mb:0.5}}>Payment Status: <span style={{ color: theme.palette.text.secondary}}>Not Paid</span></Typography>
           <Typography variant="subtitle1" sx={{mb:0.5}}>Created Date: <span style={{ color: theme.palette.text.secondary}}>22/07/2024</span></Typography>
           <Typography variant="subtitle1" sx={{mb:2}}>Note: <span style={{ color: theme.palette.text.secondary}}>The party is an evening event, so I am looking for a glamorous and long-lasting makeup look.</span></Typography>

           <Pipeline
        buttonText={[
         'New',
         'Archived',
          'Started',
          'No Show',
          'Completed',
    
        ]}
        value={form?.lead_stage}
        // onButtonClick={(buttonText, index) => {
        //   form.lead_stage = buttonText[index];
        // }}
        onButtonClick={(selectedValue) => {
          form.lead_stage = selectedValue;
        }}
        className={styles.stages}
        />
        <div className={styles.boxDialog}>
          <Typography variant="h5" sx={{color: theme.palette.primary.main}}>Hair Cut</Typography>
          <Typography variant="body1" >₹350</Typography>
          <div className={styles.row}>
          <Typography variant="body1" >Naman Gupta</Typography>
          <div className={styles.oneRow}>
                              <img
                                src={time}
                                alt="time"
                                className={`${styles.time}  ${styles.spaceTop}`}
                              ></img>
          <Typography variant="body1" >28/07/2024 | 12:00 PM - 12:30 PM</Typography>
          </div>
          </div>
        </div>

            <div className={styles.buttonContainer}>
              <div className={styles.cancelButton}>
                <ActionButton sx={{ mt: 4 }}  onClick={() => handleCancelAppointmentClick()}>
                CANCEL APPOINTMENT
                </ActionButton>
              </div>

              <div className={styles.saveButton}>
                <OutlineButton color={"primary"} sx={{ mt: 4, ml: 4 }}>
                EDIT
                </OutlineButton>
              </div>
            </div>
          </div>
        </Dialog>
        <Dialog
          open={ isCancelAppointmentDialogOpen}
          onClose={closeCancelAppointmentDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          //maxWidth={false}
          fullWidth={true}
          PaperProps={{
            sx: { borderRadius: '9px' } 
          }}
          sx={{
            width: "700px",
            maxWidth: "100%",
            margin: "auto",
           
          }}
        >
          <div className={`${styles.dialogWrap} `}>
            <div className={styles.row}>
            <Typography variant="h5" sx={{ mb: 3 }}>
              {"Cancel Appointment"}
            </Typography>
            <img src={close} alt="close" className={styles.close} onClick={closeCancelAppointmentDialog}></img>
            </div>
          
           <Typography variant="subtitle1" sx={{mb:1}} color="text.secondary">Add a reason to cancel the below mentioned appointment. If required you can also reschedule this appointment by updating the time and services.</Typography>
           
           
        <div className={styles.boxDialog}>
          <Typography variant="h5" sx={{color: theme.palette.primary.main}}>Hair Cut</Typography>
          <Typography variant="body1" >₹350</Typography>
          <div className={styles.row}>
          <Typography variant="body1" >Naman Gupta</Typography>
          <div className={styles.oneRow}>
                              <img
                                src={time}
                                alt="time"
                                className={`${styles.time}  ${styles.spaceTop}`}
                              ></img>
          <Typography variant="body1" >28/07/2024 | 12:00 PM - 12:30 PM</Typography>
          </div>
          </div>
        </div>
        <CustomTextField
             // isError={errorData?.notes}
             // errorText={errorData?.notes}
             label={
              <>
              Reason
              <span style={{ color: theme.palette.error.main }}>*</span>
            </>}
              multiline
              rows="4"
              onTextChange={(text) => {
                changeTextData(text, "reason");
              }}
              sx={{mt:2}}
              className={styles.desc}
            />
            <div className={styles.buttonContainer}>
              <div className={styles.cancelButton}>
                <ActionButton sx={{ mt: 4 }}  onClick={() => handleGoBackClick()}>
                GO BACK
                </ActionButton>
              </div>

              <div className={styles.saveButton}>
                <PrimaryButton color={"primary"} sx={{ mt: 4, ml: 4 }}>
                CANCEL THIS APPOINTMENT
                </PrimaryButton>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default CustomerDetail;
