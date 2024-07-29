import React, { useEffect } from "react";
import ShiftDetailView from "../Componet/ShiftDetailView";
import historyUtils from "../../../libs/history.utils";
import styles from "./Style.module.css";
import AssociatedEmployees from "../AssociatedEmployees/AssociatedEmployees";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionDetailShifts } from "../../../actions/ShiftsLists.action";
import WaitingComponent from "../../../components/Waiting.component";
import { ArrowBackIos } from "@mui/icons-material";
import { ButtonBase } from "@mui/material";
import ShadowBox from "../../../components/ShadowBox/ShadowBox";

const ShiftDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { shiftDetail } = useSelector((state) => state?.Shifts);

  useEffect(() => {
    dispatch(actionDetailShifts(id));
  }, [id]);

  if (!shiftDetail) {
    return <WaitingComponent />;
  }
  
  return (
    <ShadowBox className={styles.Wrapper}>
      <div className={styles.container}>
        <ButtonBase onClick={() => historyUtils.goBack()}>
          <ArrowBackIos fontSize={"small"} />{" "}
          <span className={"capitalize"}>
            <b> {shiftDetail?.details?.name}</b>
          </span>
        </ButtonBase>
        <div className={styles.newLine} />
      </div>
      <ShiftDetailView shiftDays={shiftDetail?.details?.shiftDays} />
      <div className={styles.employe}>
        <AssociatedEmployees />
      </div>
    </ShadowBox>
  );
};

export default ShiftDetail;
