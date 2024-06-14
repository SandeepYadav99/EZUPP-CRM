import React, { useCallback } from "react";
import styles from "../Style.module.css";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import capitalizeFirstLetter, {
  formatString,
} from "../../../../hooks/CommonFunction";
import { PrimaryButton } from "../../../../components/Buttons/PrimaryButton";
import defaultProile from "../../../../assets/img/profile.png";
import { Typography } from "@mui/material";
import StatusPill from "../../../../components/Status/StatusPill.component";
import { useTheme } from "@mui/styles";

const ProfileSection = ({ profileDetails, handleEdit }) => {
  const theme= useTheme()
const statusUpdate=useCallback(()=>{
  if(profileDetails?.status === "INACTIVE"){
    return "high"
  }else if(profileDetails?.status === "ACTIVE"){
    return "active"
  }
},[])


  return (
    <ShadowBox width={"100%"}>
      <div >
        <div className={styles.profileContainer}>
          <div>
         
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
            <Typography  fontSize={18} fontWeight={600} className={styles.profileTitle} sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              wordSpacing:"0", 
              [theme.breakpoints.down('sm')]: {
                whiteSpace: 'pre-wrap',
              },
            }} >
              {capitalizeFirstLetter(profileDetails?.name)}
            </Typography>
            <Typography variant="h6"  fontWeight={600}  sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              wordSpacing:"0", 
            
              [theme.breakpoints.down('sm')]: {
                whiteSpace: 'pre-wrap',
              },
            }}>
              {profileDetails?.user_name} ({profileDetails?.employee_id})
            </Typography>
            <div className={styles.status}>
            <StatusPill status={profileDetails?.status} color={statusUpdate()} />
             
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
        <Typography fontSize={18}  marginTop={3} fontWeight={600} >Personal Details</Typography>
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
            <Typography variant="h6"   fontWeight={600} >Email:</Typography>
            <Typography variant="h6"   color={theme?.palette.text.subText} fontWeight={600} marginLeft={2} >
              {" "}
              {profileDetails?.email || "N/A"}
            </Typography>
          </div>
          <div className={styles.contactFlex}>
            <Typography variant="h6"  fontWeight={600} >Contact:</Typography>
            <Typography variant="h6" color={theme?.palette.text.subText} fontWeight={600} marginLeft={2}  >
              {" "}
              {profileDetails?.contact || "N/A"}
            </Typography>
          </div>
          <div className={styles.contactFlex}>
            <Typography variant="h6"  fontWeight={600} >Role:</Typography>
            <Typography variant="h6" color={theme?.palette.text.subText} fontWeight={600} marginLeft={2} >
              {" "}
              {profileDetails?.role?.name || "N/A"}
            </Typography>
          </div>
        </div>
        <div className={styles.gaps} />
        <hr className={styles.hrColor} />
        <Typography fontSize={18}  marginTop={3} fontWeight={600} >Work Details</Typography>
        <div className={styles.gaps} />
        <div>
          <div className={styles.activityFlex}>
            <Typography variant="h6"  fontWeight={600} >Department:</Typography>

            <Typography variant="h6" color={theme?.palette.text.subText} fontWeight={600} marginLeft={2}>
              {formatString(profileDetails?.department || "N/A")}
            </Typography>
          </div>
          <div className={styles.activityFlex}>
            <Typography variant="h6"  fontWeight={600} >Designation:</Typography>

            <Typography variant="h6" color={theme?.palette.text.subText} fontWeight={600} marginLeft={2}>
              {formatString(profileDetails?.designation || "N/A")}
            </Typography>
          </div>
          <div className={styles.activityFlex}>
            <Typography variant="h6"  fontWeight={600} >Manager:</Typography>

            <Typography variant="h6" color={theme?.palette.text.subText} fontWeight={600} marginLeft={2} fo sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              wordSpacing:"0", 
              [theme.breakpoints.down('sm')]: {
                whiteSpace: 'pre-wrap',
              },
            }}>
           
              {formatString(profileDetails?.manager?.name) } ({profileDetails?.employee_id })
            </Typography>
          </div>
          <div className={styles.activityFlex}>
            <Typography variant="h6"  fontWeight={600} >Joining Date:</Typography>

            <Typography variant="h6" color={theme?.palette.text.subText} fontWeight={600} marginLeft={2}>
              {profileDetails?.joiningDateText}
            </Typography>
          </div>
          <div className={styles.activityFlex}>
            <Typography variant="h6"  fontWeight={600} >Exit Date:</Typography>

            <Typography variant="h6" color={theme?.palette.text.subText} fontWeight={600} marginLeft={2}>
              {profileDetails?.exitDateText}
            </Typography>
          </div>
          <div className={styles.activityFlex}>
            <Typography variant="h6"  fontWeight={600} >User is a Manager:</Typography>

            <Typography variant="h6" color={theme?.palette.text.subText} fontWeight={600} marginLeft={2}>
              {profileDetails?.is_manager ? "Yes" : "No"}
            </Typography>
          </div>
        </div>
        <div className={styles.gaps} />
        <hr className={styles.hrColor} />
        <Typography fontSize={18}  marginTop={3} fontWeight={600} >Activity Information</Typography>
        <div className={styles.gaps} />
        <div className={styles.activityFlex}>
          <Typography variant="h6"  fontWeight={600} >Created On:</Typography>

          <Typography variant="h6" color={theme?.palette.text.subText} fontWeight={600} marginLeft={2}>
            {profileDetails?.createdAtText}
          </Typography>
        </div>
        <div className={styles.activityFlex}>
          <Typography variant="h6"  fontWeight={600} >Updated On:</Typography>

          <Typography variant="h6" color={theme?.palette.text.subText} fontWeight={600} marginLeft={2}>
            {profileDetails?.updatedAtText}
          </Typography>
        </div>
        <div className={styles.activityFlex}>
          <Typography variant="h6"  fontWeight={600} >Updated By:</Typography>

          <Typography variant="h6" color={theme?.palette.text.subText} fontWeight={600} marginLeft={2}  sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              wordSpacing:"0", 
              [theme.breakpoints.down('sm')]: {
                whiteSpace: 'pre-wrap',
              },
            }}>
            {profileDetails?.updated_by?.name || "N/A"} ({profileDetails?.employee_id})
          </Typography>
        </div>
        <div className={styles.activityFlex}>
          <Typography variant="h6"  fontWeight={600} >Last Login:</Typography>

          <Typography variant="h6" color={theme?.palette.text.subText} fontWeight={600} marginLeft={2}>
            {profileDetails?.lastLoginText}
          </Typography>
        </div>
      </div>
    </ShadowBox>
  );
};

export default ProfileSection;
