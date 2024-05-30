import React from "react";
import styles from "../Style.module.css";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import capitalizeFirstLetter, {
  formatString,
} from "../../../../hooks/CommonFunction";
import { PrimaryButton } from "../../../../components/Buttons/PrimaryButton";
import defaultProile from "../../../../assets/img/profile.png";
import { Typography } from "@mui/material";
import StatusPill from "../../../../components/Status/StatusPill.component";
const ProfileSection = ({ profileDetails, handleEdit }) => {
  return (
    <ShadowBox width={"100%"}>
      <div className={styles.plain}>
        <div className={styles.profileContainer}>
          <div>
            {/* {profileDetails?.image && ( */}
            <img
              src={
                profileDetails?.image ? profileDetails?.image : defaultProile
              }
              alt=""
              className={styles.proImage}
              crossOrigin="anonymous"
            />
            {/* )} */}
          </div>
          <div>
            <Typography fontSize={18} color={"#636578"} fontWeight={600}  >
              {capitalizeFirstLetter(profileDetails?.name)}
            </Typography>
            <Typography variant="h6" color={"#888888"} fontWeight={600}  >
              {profileDetails?.name} ({profileDetails?.employee_id})
            </Typography>
            <div className={styles.status}>
            <StatusPill status={profileDetails?.status} color={profileDetails?.status.toLowerCase()} />
             
            </div>
            <div className={styles.saveButton}>
              <PrimaryButton
                onClick={() => handleEdit(profileDetails)}
                paddingLR={2}
                borderRadius={4}
               
               
              >
                <Typography variant={"subtitle1"}>EDIT</Typography>
              </PrimaryButton>
            </div>
          </div>
        </div>
        <Typography fontSize={18} color={"#636578"} marginTop={3} fontWeight={600} >Personal Details</Typography>
        <div className={styles.gaps} />
        <div>
          {/* <div className={styles.contactFlex}>
            <div className={styles.sideTitle}>Username:</div>
            <span className={styles.email}>
              {" "}
              {profileDetails?.user_name || "N/A"}
            </span>
          </div> */}
          <div className={styles.contactFlex}>
            <Typography variant="h6" color={"#636578"}  fontWeight={600} >Email:</Typography>
            <Typography variant="h6" color={"#888888"} fontWeight={600} marginLeft={2} >
              {" "}
              {profileDetails?.email || "N/A"}
            </Typography>
          </div>
          <div className={styles.contactFlex}>
            <Typography variant="h6" color={"#636578"} fontWeight={600} >Contact:</Typography>
            <Typography variant="h6" color={"#888888"} fontWeight={600} marginLeft={2}  >
              {" "}
              {profileDetails?.contact || "N/A"}
            </Typography>
          </div>
          <div className={styles.contactFlex}>
            <Typography variant="h6" color={"#636578"} fontWeight={600} >Role:</Typography>
            <Typography variant="h6" color={"#888888"} fontWeight={600} marginLeft={2} >
              {" "}
              {profileDetails?.role?.name || "N/A"}
            </Typography>
          </div>
        </div>
        <div className={styles.gaps} />
        <hr className={styles.hrColor} />
        <Typography fontSize={18} color={"#636578"} marginTop={3} fontWeight={600} >Work Details</Typography>
        <div className={styles.gaps} />
        <div>
          <div className={styles.activityFlex}>
            <Typography variant="h6" color={"#636578"} fontWeight={600} >Department:</Typography>

            <Typography variant="h6" color={"#888888"} fontWeight={600} marginLeft={2}>
              {formatString(profileDetails?.department || "N/A")}
            </Typography>
          </div>
          <div className={styles.activityFlex}>
            <Typography variant="h6" color={"#636578"} fontWeight={600} >Designation:</Typography>

            <Typography variant="h6" color={"#888888"} fontWeight={600} marginLeft={2}>
              {formatString(profileDetails?.designation || "N/A")}
            </Typography>
          </div>
          <div className={styles.activityFlex}>
            <Typography variant="h6" color={"#636578"} fontWeight={600} >Manager:</Typography>

            <Typography variant="h6" color={"#888888"} fontWeight={600} marginLeft={2}>
              {formatString(profileDetails?.manager?.name || "N/A")}
            </Typography>
          </div>
          <div className={styles.activityFlex}>
            <Typography variant="h6" color={"#636578"} fontWeight={600} >Joining Date:</Typography>

            <Typography variant="h6" color={"#888888"} fontWeight={600} marginLeft={2}>
              {profileDetails?.joiningDateText}
            </Typography>
          </div>
          <div className={styles.activityFlex}>
            <Typography variant="h6" color={"#636578"} fontWeight={600} >Exit Date:</Typography>

            <Typography variant="h6" color={"#888888"} fontWeight={600} marginLeft={2}>
              {profileDetails?.exitDateText}
            </Typography>
          </div>
          <div className={styles.activityFlex}>
            <Typography variant="h6" color={"#636578"} fontWeight={600} >User is a Manager:</Typography>

            <Typography variant="h6" color={"#888888"} fontWeight={600} marginLeft={2}>
              {profileDetails?.is_manager ? "Yes" : "No"}
            </Typography>
          </div>
        </div>
        <div className={styles.gaps} />
        <hr className={styles.hrColor} />
        <Typography fontSize={18} color={"#636578"} marginTop={3} fontWeight={600} >Activity Information</Typography>
        <div className={styles.gaps} />
        <div className={styles.activityFlex}>
          <Typography variant="h6" color={"#636578"} fontWeight={600} >Created On:</Typography>

          <Typography variant="h6" color={"#888888"} fontWeight={600} marginLeft={2}>
            {profileDetails?.createdAtText}
          </Typography>
        </div>
        <div className={styles.activityFlex}>
          <Typography variant="h6" color={"#636578"} fontWeight={600} >Updated On:</Typography>

          <Typography variant="h6" color={"#888888"} fontWeight={600} marginLeft={2}>
            {profileDetails?.updatedAtText}
          </Typography>
        </div>
        <div className={styles.activityFlex}>
          <Typography variant="h6" color={"#636578"} fontWeight={600} >Updated By:</Typography>

          <Typography variant="h6" color={"#888888"} fontWeight={600} marginLeft={2}>
            {profileDetails?.updated_by?.name || "N/A"}
          </Typography>
        </div>
        <div className={styles.activityFlex}>
          <Typography variant="h6" color={"#636578"} fontWeight={600} >Last Login:</Typography>

          <Typography variant="h6" color={"#888888"} fontWeight={600} marginLeft={2}>
            {profileDetails?.lastLoginText}
          </Typography>
        </div>
      </div>
    </ShadowBox>
  );
};

export default ProfileSection;
