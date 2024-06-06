import React, { useEffect, useState } from "react";
import styles from "./Style.module.css";
import { useParams } from "react-router-dom";
import { serviceDetailRole } from "../../../services/Role.service";
import StatusPill from "../../../components/Status/StatusPill.component";
import AssociatedUsers from "./AssociatedUsers/AssociatedUsers";
import { ButtonBase, Typography } from "@mui/material";
import { ArrowBackIos, Delete } from "@mui/icons-material";
import {
  ArrowActionButton,
 
} from "../../../components/Buttons/PrimaryButton";
import history from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import ShadowBox from "../../../components/ShadowBox/ShadowBox";

const RoleDetail = () => {
  const [roleDetail, setRoleDetail] = useState({});
  const { id } = useParams();

  const { description, status, name, display_name } = roleDetail;
  useEffect(() => {
    if (id) {
      serviceDetailRole({ id: id }).then((res) => {
        if (!res.error) {
          const data = res?.data?.details;
          setRoleDetail(data);
        } else {
        }
      });
    }
  }, [id]);

  return (
    <div>
      <div className={styles.upperFlex}>
        <ButtonBase onClick={() => history.push(RouteName.ROLE)}>
          <ArrowBackIos fontSize={"small"} />{" "}
          <span>
            <b>Role Detail</b>
          </span>
        </ButtonBase>
        <div></div>
        <div className={styles.profileHeading}></div>
        <div>
          <ArrowActionButton
            icon={<Delete fontSize={"small"} />}
            className={styles.addTask}
            onClick={() => {}}
          >
            <div className={styles.innerText}>Delete</div>
          </ArrowActionButton>
        </div>
      </div>
      <div className={styles.detailContainer}>
        <ShadowBox className={styles.rightSection}>
          <div className={styles.boxleft}>
            <div>
              <Typography fontSize={18} fontWeight={600}>
                {name}
              </Typography>
              <Typography variant="subtitle1">{display_name}</Typography>
            </div>
            <div>
              <StatusPill
                status={status}
                color={status === "ACTIVE" && "active"}
              />
            </div>
          </div>
          <hr className={styles.hrLine} />
          <Typography variant="subtitle1">Description</Typography>
          <Typography variant="subtitle1">{description || "N/A"}</Typography>
        </ShadowBox>
        <ShadowBox className={styles.leftSection}>
          <div>
            <Typography fontSize={18} fontWeight={600}>
              Permissions Granted
            </Typography>
            <div className={styles.rightContaiiner}>
              <div>
                <p>Roles:</p>
                <p>Users:</p>
                <p>Products:</p>
                <p>Contact:</p>
              </div>
              <div>
                <p>All Data</p>
                <p>Update, Delete</p>
                <p>Read, Write</p>
                <p>All Data</p>
              </div>
            </div>
          </div>
        </ShadowBox>
      </div>
      <section className={styles.bottomSection}>
        <AssociatedUsers id={id ? id : "userObject?.user?.id"} />
      </section>
      {/* Table Bottom */}
    </div>
  );
};

export default RoleDetail;
