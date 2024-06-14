import React, { useCallback, useEffect, useReducer, useState } from "react";
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
import { useDispatch } from "react-redux";
import PermissionsGranted from "../Component/PermissionsGranted";
import { actionFetchRole } from "../../../actions/Role.action";
import DeletePopUp from "../Component/DeletePopUp";

const initialState = {
  roleDetail: {},
  permissions: [],
};
const RoleDetail = () => {
  const { id } = useParams();
const theme= useTheme()
  const [open, setOpen] = useState(false);
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
  const [state, dispatchDetail] = useReducer(reducer, initialState);
  const dispatch = useDispatch();

  const roleDelete = useCallback(async () => {
    setOpen((e) => !e);
  }, [open]);

  useEffect(() => {
    Promise.all([
      serviceDetailRole({ id: id }),
      serviceDetailPermissions({ id: id }),
    ]).then(([roleDetail, permissions]) => {
      const data = roleDetail?.data?.details;
      if (!roleDetail.error) {
        dispatchDetail({ type: "ROLE_DETAIL", payload: data });
      }
      if (!permissions.error) {
        dispatchDetail({ type: "PERMISSIONS", payload: permissions.data });
      }
    });
  }, [id]);

  const { description, status, name, display_name } = state?.roleDetail;

  const handleClose = useCallback(() => {
    setOpen((e) => !e);
  }, [open]);

  const handleDelete = useCallback(async () => {
    const res = await serviceDeleteRole({ id: id });
    if (!res?.error) {
      history.push(RouteName.ROLE);
      dispatch(actionFetchRole(1, {}, {}));
    }
  }, [id, dispatchDetail]);

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
              <Typography variant="h4" fontSize={18} fontWeight={600} color={theme.palette.text.subText1}>
                {name}
              </Typography>
              <Typography variant="body1" fontSize={14}  color={theme.palette.text.subText}>{display_name}</Typography>
            </div>
            <div>
              <StatusPill
                status={status}
                color={status === "ACTIVE" && "active"}
              />
            </div>
          </div>
          <hr className={styles.hrLine} />
          <Typography variant="h5" fontSize={14} fontWeight={600} color={theme.palette.text.subText1} sx={{mt:2}}>Description</Typography>
          <Typography fontSize={14}  color={theme.palette.text.subText}>{description || "N/A"}</Typography>
        </ShadowBox>
        <ShadowBox className={styles.leftSection}>
          <div>
            <Typography variant="h4" sx={{mb:2}} fontSize={18} fontWeight={600} color={theme.palette.text.subText1}>
              Permissions Granted
            </Typography>
            <PermissionsGranted state={state} styles={styles} />
          </div>
        </ShadowBox>
      </div>
      <div>
        <section className={styles.bottomSection}>
          <AssociatedUsers id={id ? id : "userObject?.user?.id"} />
        </section>
      </div>
      <DeletePopUp
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
        id={id}
      />
      {/* Table Bottom */}
    </div>
  );
};

export default RoleDetail;
