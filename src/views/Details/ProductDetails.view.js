import React, { useState } from "react";
import styles from "./Styles.module.css";
import ResetPasswordDialog from "../ForgotPassword/ResetPassword.view";
import useMyProfileHook from "./ProductDetailsHook";
import WaitingComponent from "../../components/Waiting.component";
import StatusPill from "../../components/Status/StatusPill.component";
//import TaskListItem from "./TaskListView";
import history from "../../libs/history.utils";
import {
  ArrowOutlineButton,
  ArrowPrimaryButton,
  ActionButton,
  PrimaryButton,
} from "../../components/Buttons/PrimaryButton";
import {
  ButtonBase,
  FormControl,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import { Add, ArrowBackIos,  Lock } from "@mui/icons-material";
import removeTask from "../../assets/Assets/ic_delete@2x.png";
import ShadowBox from "../../components/ShadowBox/ShadowBox";
import data from "./Data";
import capitalizeFirstLetter, {
  formatString,
} from "../../hooks/CommonFunction";

const ProductDetailview = () => {
  const [open, setOpen] = useState(false);
  const {
    profileDetails,
    handleEdit,
    isLoading,
    handleSideToggle,
    handleDetailPage,
    taskLists,
    filterValue,
    markAsCompleted,
    completedHandler,
    filterCompltedTask,
  } = useMyProfileHook();

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <div>
      {isLoading ? (
        <WaitingComponent />
      ) : (
        <div>
          <div className={styles.upperFlex}>
            <ButtonBase onClick={() => history.push("/products")}>
              <ArrowBackIos fontSize={"small"} />{" "}
              <span>
              <Typography variant={"h4"}>Product Detail</Typography>
              </span>
            </ButtonBase>
            <div></div>
            <div className={styles.profileHeading}></div>
            <div>
            <ActionButton >DELETE<img src={removeTask} alt="task" width={20} height={15} /></ActionButton>
              {/* <ArrowOutlineButton
                className={styles.resetButton}
                onClick={handleClose}
                icon={<Lock fontSize="normal" />}
              >
                <div className={styles.innerText}>Reset Password</div>
              </ArrowOutlineButton>
              <ArrowPrimaryButton
                icon={<Add fontSize={"small"} />}
                className={styles.addTask}
                onClick={handleSideToggle}
              >
                <div className={styles.innerText}>Add Task</div>
              </ArrowPrimaryButton> */}
            </div>
          </div>
          {data.Data.map((item, index) => (
          <div className={styles.gridContainer}>
            <ShadowBox className={styles.product}>
            <div className={styles.title} >
            <div className={styles.row}>
                <img src={item.image} alt="Image" className={styles.image} />
                <div className={styles.textContainer}>
                <div className={styles.row1}>
                <Typography variant={"title"} color={"text.primary"}> {item.name}</Typography>
                <div  className={styles.right}>
                <StatusPill status={item.status} color={item.status === 'Active' ? 'active' : 'high'}/></div>
                </div>
                <Typography variant={"body1"} color={"text.secondary"} >{item.code}</Typography>
                <Typography variant={"body1"} color={"text.secondary"}>{item.type}</Typography>        
                <Typography variant={"body1"} className={styles.link}>{item.link}</Typography>
                </div>
            </div>       
                <div className={styles.line} />       
                <Typography variant={"subtitle1"} className={styles.title}>Associated Tags</Typography>
                <div className={styles.row}>
                <Typography variant={"body1"} className={styles.tags}>{item.tags}</Typography>
                <Typography variant={"body1"} className={styles.tags}>{item.tags}</Typography>
                </div>
               
                <Typography variant={"subtitle1"} className={styles.title}>Description</Typography>         
                <Typography variant={"body1"} color={"text.secondary"}>{item.description}</Typography>   
                </div>
            </ShadowBox>
             <div className={styles.profileFlex}>
              <div className={styles.leftSection}>
                <>
                  <ShadowBox width={'23rem'}>
                  <div className={styles.profileContainer}>
                </div> 
                <div className={styles.title} >
                <Typography variant={"title"} color={"text.primary"}>Product Commercials</Typography>
                </div>

                    <div>
                      <div className={styles.contactFlex}>
                        <Typography variant={"subtitle1"}>Measure Unit:</Typography>
                        <Typography variant={"body1"} color={"text.secondary"} className={styles.email}>
                          {" "}
                          {item.measureUnit || "N/A"}
                        </Typography>
                      </div>
                      <div className={styles.contactFlex}>
                      <Typography variant={"subtitle1"}>Ballpark Cost:</Typography>
                        <Typography variant={"body1"} color={"text.secondary"} className={styles.email}>
                          {" "}
                          {item.ballparkCost || "N/A"}
                        </Typography>
                      </div>
                      <div className={styles.contactFlex}>
                      <Typography variant={"subtitle1"}>Ballpark Price:</Typography>
                        <Typography variant={"body1"} color={"text.secondary"} className={styles.email}>
                          {" "}
                          {item.ballparkPrice || "N/A"}
                        </Typography>
                      </div>
                      <div className={styles.contactFlex}>
                      <Typography variant={"subtitle1"}>Discount Percent:</Typography>
                        <Typography variant={"body1"} color={"text.secondary"} className={styles.email}>
                          {" "}
                          {item.discountPercent || "N/A"}
                        </Typography>
                      </div>
                      <div className={styles.contactFlex}>
                      <Typography variant={"subtitle1"}>Discount Value:</Typography>
                        <Typography variant={"body1"} color={"text.secondary"} className={styles.email}>
                          {" "}
                          {item.discountValue || "N/A"}
                        </Typography>
                      </div>
                    </div>

                    <div className={styles.line} />
                 
                    <div>
                    <div className={styles.title} >
                    <Typography variant={"title"}  color={"text.primary"}>Activity Information</Typography>
                    </div>
                      <div className={styles.activityFlex}>
                      <Typography variant={"subtitle1"}>Created By:</Typography>
                      
                        <Typography variant={"body1"} color={"text.secondary"} className={styles.activity}>
                          {item.createdBy || "N/A"}
                        </Typography>
                      </div>
                      <div className={styles.activityFlex}>
                      <Typography variant={"subtitle1"}>Created At:</Typography>

                      <Typography variant={"body1"} color={"text.secondary"} className={styles.activity}>
                          {item.createdAt || "N/A"}
                        </Typography>
                      </div>
                      <div className={styles.activityFlex}>
                      <Typography variant={"subtitle1"}>Updated By:</Typography>

                      <Typography variant={"body1"} color={"text.secondary"} className={styles.activity}>
                          {item.createdBy || "N/A"}
                        </Typography>
                      </div>
                      <div className={styles.activityFlex}>
                      <Typography variant={"subtitle1"}>Updated At:</Typography>

                      <Typography variant={"body1"} color={"text.secondary"} className={styles.activity}>
                          {item.createdAt || "N/A"}
                        </Typography>
                      </div>

                      {/* <div className={styles.activityFlex}>
                        <div className={styles.sideTitle}>
                          User is a Manager:
                        </div>

                        <span className={styles.activity}>
                          {profileDetails?.is_manager ? "Yes" : "No"}
                        </span>
                      </div> */}
                    </div>

                    <div className={styles.line} />
                    <div className={styles.title} >
                    <Typography variant={"title"} color={"text.primary"}>Settings</Typography>
                    </div>
                    <div className={styles.activityFlex}>
                    <Typography variant={"subtitle1"}>Show Public:</Typography>

                    <Typography variant={"body1"} color={"text.secondary"} className={styles.activity}>
                          {item.showPublic || "N/A"}
                        </Typography>
                    </div>
                    <div className={styles.activityFlex}>
                    <Typography variant={"subtitle1"}>Value Add:</Typography>

                    <Typography variant={"body1"} color={"text.secondary"} className={styles.activity}>
                          {item.valueAdd || "N/A"}
                        </Typography>
                    </div>
                  </ShadowBox>
                </>
              </div>

              
               
            </div> 
       
          </div>
          ))}
          
        
          
        </div>
      )}
    </div>
  );
};

export default ProductDetailview;
