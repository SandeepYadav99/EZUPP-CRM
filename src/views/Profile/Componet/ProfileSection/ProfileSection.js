import React from "react";
import styles from "../Style.module.css";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import capitalizeFirstLetter, {
  formatString,
} from "../../../../hooks/CommonFunction";
import { PrimaryButton } from "../../../../components/Buttons/PrimaryButton";
import defaultProile from "../../../../assets/img/profile.png";
import { Typography } from "@mui/material";
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
            <div className={styles.name}>
              {capitalizeFirstLetter(profileDetails?.name)}
            </div>
            <div className={styles.position}>
              Emp. ID : {profileDetails?.employee_id || "N/A"}
            </div>
            <div className={styles.status}>
              {profileDetails?.status || "N/A"}
            </div>
            <div className={styles.saveButton}>
              <PrimaryButton onClick={() => handleEdit(profileDetails)} className={styles.editAction}>
                <Typography  variant={"subtitle1"}>EDIT</Typography>
              </PrimaryButton>
            </div>
          </div>
        </div>
        <div className={styles.heading}>Personal Details</div>
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
            <div className={styles.sideTitle}>Email</div>
            <span className={styles.email}>
              {" "}
              {profileDetails?.email || "N/A"}
            </span>
          </div>
          <div className={styles.contactFlex}>
            <div className={styles.sideTitle}>Contact</div>
            <span className={styles.email}>
              {" "}
              {profileDetails?.contact || "N/A"}
            </span>
          </div>
          <div className={styles.contactFlex}>
            <div className={styles.sideTitle}>Role</div>
            <span className={styles.email}>
              {" "}
              {profileDetails?.role?.name || "N/A"}
            </span>
          </div>
        </div>
        <div className={styles.gaps} />
        <hr className={styles.hrColor} />
        <div className={styles.heading}>Work Details</div>
        <div className={styles.gaps} />
        <div>
          <div className={styles.activityFlex}>
            <div className={styles.sideTitle}>Department:</div>

            <span className={styles.activity}>
              {formatString(profileDetails?.department || "N/A")}
            </span>
          </div>
          <div className={styles.activityFlex}>
            <div className={styles.sideTitle}>Designation:</div>

            <span className={styles.activity}>
              {formatString(profileDetails?.designation || "N/A")}
            </span>
          </div>
          <div className={styles.activityFlex}>
            <div className={styles.sideTitle}>Manager:</div>

            <span className={styles.activity}>
              {formatString(profileDetails?.manager?.name || "N/A")}
            </span>
          </div>
          <div className={styles.activityFlex}>
            <div className={styles.sideTitle}>Joining Date:</div>

            <span className={styles.activity}>
              {profileDetails?.joiningDateText}
            </span>
          </div>
          <div className={styles.activityFlex}>
            <div className={styles.sideTitle}>Exit Date:</div>

            <span className={styles.activity}>
              {profileDetails?.exitDateText}
            </span>
          </div>
          <div className={styles.activityFlex}>
            <div className={styles.sideTitle}>User is a Manager:</div>

            <span className={styles.activity}>
              {profileDetails?.is_manager ? "Yes" : "No"}
            </span>
          </div>
        </div>
        <div className={styles.gaps} />
        <hr className={styles.hrColor} />
        <div className={styles.heading}>Activity Information</div>
        <div className={styles.gaps} />
        <div className={styles.activityFlex}>
          <div className={styles.sideTitle}>Created On:</div>

          <span className={styles.activity}>
            {profileDetails?.createdAtText}
          </span>
        </div>
        <div className={styles.activityFlex}>
          <div className={styles.sideTitle}>Updated On:</div>

          <span className={styles.activity}>
            {profileDetails?.updatedAtText}
          </span>
        </div>
        <div className={styles.activityFlex}>
          <div className={styles.sideTitle}>Updated By:</div>

          <span className={styles.activity}>{profileDetails?.updated_by?.name || "N/A"}</span>
        </div>
        <div className={styles.activityFlex}>
          <div className={styles.sideTitle}>Last Login:</div>

          <span className={styles.activity}>
            {profileDetails?.lastLoginText}
          </span>
        </div>
      </div>
    </ShadowBox>
  );
};

export default ProfileSection;
