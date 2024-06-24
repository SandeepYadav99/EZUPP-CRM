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
  const theme = useTheme();
  const statusUpdate = useCallback(() => {
    if (profileDetails?.status === "INACTIVE") {
      return "high";
    } else if (profileDetails?.status === "ACTIVE") {
      return "active";
    }
  }, []);

  return (
    <ShadowBox width={"100%"}>
      <div>
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
            <Typography
              variant="h5"
              color={theme.palette.text.primary}
              fontWeight={600}
              className={styles.profileTitle}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                wordSpacing: "0",

                [theme.breakpoints.down("md")]: {
                  whiteSpace: "pre-wrap",
                },
              }}
            >
              {capitalizeFirstLetter(profileDetails?.name)}
            </Typography>
            <Typography
              variant="body1"
              color={theme?.palette.text.secondary}
              fontWeight={600}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                wordSpacing: "0",
                [theme.breakpoints.down("md")]: {
                  whiteSpace: "pre-wrap",
                },
              }}
            >
              {profileDetails?.user_name}{" "}
              {profileDetails?.employee_id
                ? `(${profileDetails?.employee_id})`
                : " "}
            </Typography>
            <div className={styles.status}>
              <StatusPill
                status={profileDetails?.status}
                color={statusUpdate()}
              />
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
        <Typography
          marginTop={3}
          fontWeight={600}
          variant="h5"
          color={theme.palette.text.primary}
        >
          Personal Details
        </Typography>
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
            <Typography
              variant="h6"
              color={theme?.palette.text.primary}
              fontWeight={600}
            >
              Email:
            </Typography>
            <Typography
              variant="h6"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                wordSpacing: "0",

                [theme.breakpoints.down("md")]: {
                  whiteSpace: "pre-wrap",
                  width: "250px",
                },
                [theme.breakpoints.down("sm")]: {
                  whiteSpace: "pre-wrap",
                  width: "100px",
                },
              }}
              color={theme?.palette.text.secondary}
              fontWeight={600}
            >
              {" "}
              {profileDetails?.email || "N/A"}
            </Typography>
          </div>
          <div className={styles.contactFlex}>
            <Typography
              variant="h5"
              color={theme?.palette.text.primary}
              fontWeight={600}
            >
              Contact:
            </Typography>
            <Typography
              variant="h6"
              color={theme?.palette.text.secondary}
              fontWeight={600}
            >
              {" "}
              {profileDetails?.contact || "N/A"}
            </Typography>
          </div>
          <div className={styles.contactFlex}>
            <Typography
              variant="h5"
              color={theme?.palette.text.primary}
              fontWeight={600}
            >
              Role:
            </Typography>
            <Typography
              variant="h6"
              color={theme?.palette.text.secondary}
              fontWeight={600}
            >
              {" "}
              {profileDetails?.role?.name || "N/A"}
            </Typography>
          </div>
        </div>
        <div className={styles.gaps} />
        <hr className={styles.hrColor} />
        <Typography
          marginTop={3}
          fontWeight={600}
          variant="h4"
          color={theme.palette.text.primary}
        >
          Work Details
        </Typography>
        <div className={styles.gaps} />
        <div>
          <div className={styles.activityFlex}>
            <Typography
              variant="h5"
              color={theme?.palette.text.primary}
              fontWeight={600}
            >
              Department:
            </Typography>

            <Typography
              variant="h6"
              color={theme?.palette.text.secondary}
              fontWeight={600}
            >
              {formatString(profileDetails?.department || "N/A")}
            </Typography>
          </div>
          <div className={styles.activityFlex}>
            <Typography
              variant="h5"
              color={theme?.palette.text.primary}
              fontWeight={600}
            >
              Designation:
            </Typography>

            <Typography
              variant="h6"
              color={theme?.palette.text.secondary}
              fontWeight={600}
            >
              {formatString(profileDetails?.designation || "N/A")}
            </Typography>
          </div>
          <div className={styles.activityFlex}>
            <Typography
              variant="h5"
              color={theme?.palette.text.primary}
              fontWeight={600}
            >
              Manager:
            </Typography>

            <Typography
              variant="h6"
              color={theme?.palette.text.secondary}
              fontWeight={600}
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                wordSpacing: "0",
                [theme.breakpoints.down("sm")]: {
                  whiteSpace: "pre-wrap",
                },
              }}
            >
              {formatString(profileDetails?.manager?.name || "N/A")}
              {profileDetails?.employee_id
                ? `(${profileDetails?.employee_id})`
                : " "}
            </Typography>
          </div>
          <div className={styles.activityFlex}>
            <Typography
              variant="h5"
              color={theme?.palette.text.primary}
              fontWeight={600}
            >
              Joining Date:
            </Typography>

            <Typography
              variant="h6"
              color={theme?.palette.text.secondary}
              fontWeight={600}
            >
              {profileDetails?.joiningDateText}
            </Typography>
          </div>
          <div className={styles.activityFlex}>
            <Typography
              variant="h5"
              color={theme?.palette.text.primary}
              fontWeight={600}
            >
              Exit Date:
            </Typography>

            <Typography
              variant="h6"
              color={theme?.palette.text.secondary}
              fontWeight={600}
            >
              {profileDetails?.exitDateText}
            </Typography>
          </div>
          <div className={styles.activityFlex}>
            <Typography
              variant="h5"
              color={theme?.palette.text.primary}
              fontWeight={600}
            >
              User is a Manager:
            </Typography>

            <Typography
              variant="h6"
              color={theme?.palette.text.secondary}
              fontWeight={600}
            >
              {profileDetails?.is_manager ? "Yes" : "No"}
            </Typography>
          </div>
        </div>
        <div className={styles.gaps} />
        <hr className={styles.hrColor} />
        <Typography
          marginTop={3}
          fontWeight={600}
          variant="h4"
          color={theme.palette.text.primary}
        >
          Activity Information
        </Typography>
        <div className={styles.gaps} />
        <div className={styles.activityFlex}>
          <Typography
            variant="h5"
            color={theme?.palette.text.primary}
            fontWeight={600}
          >
            Created On:
          </Typography>

          <Typography
            variant="h6"
            color={theme?.palette.text.secondary}
            fontWeight={600}
          >
            {profileDetails?.createdAtText}
          </Typography>
        </div>
        <div className={styles.activityFlex}>
          <Typography
            variant="h5"
            color={theme?.palette.text.primary}
            fontWeight={600}
          >
            Updated On:
          </Typography>

          <Typography
            variant="h6"
            color={theme?.palette.text.secondary}
            fontWeight={600}
          >
            {profileDetails?.updatedAtText}
          </Typography>
        </div>
        <div className={styles.activityFlex}>
          <Typography
            variant="h5"
            color={theme?.palette.text.primary}
            fontWeight={600}
          >
            Updated By:
          </Typography>

          <Typography
            variant="h6"
            color={theme?.palette.text.secondary}
            fontWeight={600}
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              wordSpacing: "0",
              [theme.breakpoints.down("sm")]: {
                whiteSpace: "pre-wrap",
              },
            }}
          >
            {profileDetails?.updated_by?.name || "N/A"}
            {profileDetails?.employee_id
              ? `(${profileDetails?.employee_id})`
              : " "}
          </Typography>
        </div>
        <div className={styles.activityFlex}>
          <Typography
            variant="h5"
            color={theme?.palette.text.primary}
            fontWeight={600}
          >
            Last Login:
          </Typography>

          <Typography
            variant="h6"
            color={theme?.palette.text.secondary}
            fontWeight={600}
          >
            {profileDetails?.lastLoginText}
          </Typography>
        </div>
      </div>
    </ShadowBox>
  );
};

export default ProfileSection;
