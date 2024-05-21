import React, { useEffect, useState } from "react";
import styles from "./Style.module.css";
import { useParams } from "react-router-dom";
import { serviceDetailRole } from "../../../services/Role.service";
import StatusPill from "../../../components/Status/StatusPill.component";
import AssociatedUsers from "./AssociatedUsers/AssociatedUsers";
import { ButtonBase } from "@mui/material";
import { ArrowBackIos, Delete } from "@mui/icons-material";
import {
  ArrowActionButton,
  ArrowOutlineButton,
  ArrowPrimaryButton,
} from "../../../components/Buttons/PrimaryButton";
import history from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
const RoleDetail = () => {
  const [roleDetail, setRoleDetail] = useState({});
  const { id } = useParams();
  console.log(roleDetail);
  const { description , status
  } = roleDetail;
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
        <section className={"plainPaper"} style={{ width: "70%" }}>
          <div className={styles.boxleft}>
            <div>
              <p>
                <span className={styles.title}>Sales Executive </span> <br />{" "}
                <span className={styles.subTitle}>Sales Head</span>
              </p>
            </div>
            <div>
              <StatusPill status={status} color={status === "ACTIVE" && "active"} />
            </div>
          </div>
          <hr className={styles.hrLine} />
          <h3>Description</h3>
          <p>{description}</p>
        </section>
        <section className={"plainPaper"} style={{ width: "30%" }}>
          <div>
            <p>
              <span className={styles.title}>Permissions Granted</span>{" "}
            </p>
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
        </section>
      </div>
      <section className={styles.plainPaper}>
        <div className={styles.headingWrap}>
          <div className={styles.newLineWrap}>
            <span className={styles.title}>
              <b>Associated Users</b>
            </span>
            <div className={styles.newLine2} />
          </div>
        </div>
        <AssociatedUsers id={id ? id : "userObject?.user?.id"} />
      </section>
      {/* Table Bottom */}
    </div>
  );
};

export default RoleDetail;
