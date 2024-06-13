import React, { useCallback, useEffect, useReducer } from "react";
import styles from "./Style.module.css";
import { useParams } from "react-router-dom";
import {
  serviceDeleteRole,
  serviceDetailPermissions,
  serviceDetailRole,
} from "../../../services/Role.service";
import StatusPill from "../../../components/Status/StatusPill.component";
import AssociatedUsers from "./AssociatedUsers/AssociatedUsers";
import { ButtonBase, Typography } from "@mui/material";
import { ArrowBackIos, Delete } from "@mui/icons-material";
import { ArrowActionButton } from "../../../components/Buttons/PrimaryButton";
import history from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import ShadowBox from "../../../components/ShadowBox/ShadowBox";
import { useTheme } from "@mui/styles";

const initialState = {
  roleDetail: {},
  permissions: [],
};
const RoleDetail = () => {
  const { id } = useParams();
  const theme = useTheme();
  const reducer = (state, action) => {
    switch (action.type) {
      case "ROLE_DETAIL":
        return { ...state, roleDetail: action.payload };
      case "PERMISSIONS":
        return { ...state, permissions: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const roleDelete = useCallback(async () => {
    const res = await serviceDeleteRole({ id: id });
    if (!res?.error) {
      const roleDetail = await serviceDetailRole({ id: id });
      if (!roleDetail.error) {
        console.log(roleDetail)
        dispatch({ type: "ROLE_DETAIL", payload: roleDetail.data.details });
      }
    }
  }, [id, dispatch]);

  useEffect(() => {
    Promise.all([
      serviceDetailRole({ id: id }),
      serviceDetailPermissions({ id: id }),
    ]).then(([roleDetail, permissions]) => {
      const data = roleDetail?.data?.details;
      if (!roleDetail.error) {
        dispatch({ type: "ROLE_DETAIL", payload: data });
      }
      if (!permissions.error) {
        dispatch({ type: "PERMISSIONS", payload: permissions.data });
      }
    });
   
  }, [id]);

  const { description, status, name, display_name } = state?.roleDetail;

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
            onClick={() => roleDelete()}
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
              <Typography variant="body1">{display_name}</Typography>
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
          <Typography variant="body1">{description || "N/A"}</Typography>
        </ShadowBox>
        <ShadowBox className={styles.leftSection}>
          <div>
            <Typography fontSize={18} fontWeight={600}>
              Permissions Granted
            </Typography>
            <div className={styles.rightContaiiner}>
              <div>
                <Typography
                  variant="subtitle1"
                  margin={theme.spacing(1.5)}
                  fontWeight={600}
                >
                  Roles:
                </Typography>
                <Typography
                  variant="subtitle1"
                  margin={theme.spacing(1.5)}
                  fontWeight={600}
                >
                  Users:
                </Typography>
                <Typography
                  variant="subtitle1"
                  margin={theme.spacing(1.5)}
                  fontWeight={600}
                >
                  Products:
                </Typography>
                <Typography
                  variant="subtitle1"
                  margin={theme.spacing(1.5)}
                  fontWeight={600}
                >
                  Contact:
                </Typography>
              </div>
              <div>
                <Typography variant="body1" margin={theme.spacing(1.5)}>
                  All Data
                </Typography>
                <Typography variant="body1" margin={theme.spacing(1.5)}>
                  Update, Delete
                </Typography>
                <Typography variant="body1" margin={theme.spacing(1.5)}>
                  Read, Write
                </Typography>
                <Typography variant="body1" margin={theme.spacing(1.5)}>
                  All Data
                </Typography>
              </div>
            </div>
          </div>
        </ShadowBox>
      </div>
      <div>
        <section className={styles.bottomSection}>
          <AssociatedUsers id={id ? id : "userObject?.user?.id"} />
        </section>
      </div>
      {/* Table Bottom */}
    </div>
  );
};

export default RoleDetail;
