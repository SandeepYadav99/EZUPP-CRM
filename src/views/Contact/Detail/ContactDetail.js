import React from "react";
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
import editTask from "../../../assets/Assets/ic_edit_white.png";
import ShadowBox from "../../../components/ShadowBox/ShadowBox";
import StatusPill from "../../../components/Status/StatusPill.component";
import LeadTimeLine from "../../../components/TimeLine/LeadTimeLine.component";
import data from "./Data";
import { it } from "date-fns/locale";
const ContactDetail = () => {
  const getStatusPillColor = () => {
    if (data?.status === "ACTIVE") {
      return "active";
    } else if (data?.status === "DELETED") {
      return "high";
    } else if (data?.status === "In Progress") {
      return "active";
    } else if (data?.status === "DRAFT") {
      return "draft";
    }
  };
  return (
    <div>
      <div>
        <div className={styles.upperFlex}>
          <ButtonBase onClick={() => history.push("/contact")}>
            <ArrowBackIos fontSize={"small"} />{" "}
            <span>
              <Typography variant={"h4"}>Contact Detail</Typography>
            </span>
          </ButtonBase>
          <div></div>
          <div className={styles.profileHeading}></div>
          <div className={styles.buttonRow}>
            <ActionButton>
              DELETE
              <span className={styles.imageContainer}>
                <img
                  src={removeTask}
                  alt="task"
                  width={20}
                  height={17}
                  className={styles.binImage}
                />
              </span>
            </ActionButton>
            <PrimaryButton
              onClick={() => {
                // handleEdit();
              }}
            >
              UPDATE STATUS
              <span className={styles.imageContainer}>
                <img
                  src={editTask}
                  alt="task"
                  width={20}
                  height={20}
                  className={styles.binImage}
                />
              </span>
            </PrimaryButton>
          </div>
        </div>
        {data.Data.map((item, index) => (
          <>
            <div className={styles.gridContainer}>
              <ShadowBox className={styles.product}>
                <div className={styles.row}>
                  <Typography variant="h5">{item.name}</Typography>
                  <OutlineButton>EDIT</OutlineButton>
                </div>
                <Typography
                  variant="h6"
                  color={"text.secondary"}
                  style={{ marginTop: -8 }}
                >
                  {item.phone}
                </Typography>
                <Typography
                  variant="h6"
                  color={"text.secondary"}
                  sx={{ mb: 1 }}
                >
                  {item.email}
                </Typography>
                <StatusPill status={"In Progress"} color={"active"} />
                <div className={styles.line}></div>
                <Typography
                  variant="h6"
                  color={"text.secondary"}
                  sx={{ mt: 1.5 }}
                >
                  Gender: {item.gender}
                </Typography>
                <Typography variant="h6" color={"text.secondary"}>
                  D.O.B: {item.dob}
                </Typography>
                <Typography variant="h6" color={"text.secondary"}>
                  Anniversary: {item.dob}
                </Typography>
              </ShadowBox>
              <ShadowBox className={styles.product1}>
                <Typography variant="h5">Status</Typography>
                <LeadTimeLine
                  data={[
                    {
                      id: 1,
                      status: "IN_PROGRESS",
                      title: "In Progress",
                      description:
                        "Phone call follow up done regarding any more queries and offers explained",
                      date: "10 Mins Ago",
                    },
                    {
                      id: 2,
                      status: "PENDING",
                      title: "Pending",
                      description:
                        "Lead has been created for the Hair and nail related services",
                      date: "2 Days Ago",
                    },
                  ]}
                />
              </ShadowBox>
            </div>
            <div className={styles.gridColumn}>
              <ShadowBox className={styles.product}>
                <Typography variant="h5">Lead Details</Typography>

                <Typography
                  variant="h6"
                  color={"text.secondary"}
                  sx={{ mt: 2 }}
                >
                  Source: {item.source}
                </Typography>
                <Typography variant="h6" color={"text.secondary"}>
                  Interested In: {item.interested_in}
                </Typography>
                <Typography variant="h6" color={"text.secondary"}>
                  Lead Owner: {item.lead_owner}
                </Typography>
                <div className={styles.line}></div>
                <Typography variant="h5" sx={{ mt: 1.5 }}>
                  Associated Tags
                </Typography>
                <div className={styles.row21}>
                  <Typography
                    variant={"body1"}
                    className={styles.tags}
                    sx={{ mt: 1 }}
                    color={"text.primary"}
                  >
                    {item.tags}
                  </Typography>
                </div>
              </ShadowBox>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ContactDetail;
