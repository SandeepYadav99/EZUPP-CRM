import style from "./Style.module.css";
import NotificationCard from "./NotificationCard";
import { Typography } from "@mui/material";
import datavalue from "./data.json";
import { useCallback, useMemo, useState } from "react";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
// import { WidthFull } from "@mui/icons-material";
function Notifications() {
  const [viewAll, setViewall] = useState(false);
  const handleViewClick = useCallback(() => {
    setViewall((prev) => !prev);
  }, [viewAll, setViewall]);
  const dataValueStore = useMemo(() => {
    return viewAll
      ? datavalue?.Payment?.map((item, index) => (
          <NotificationCard data={item} index={index} />
        ))
      : datavalue?.Payment?.slice(0, 3).map((item, index) => (
          <NotificationCard data={item} index={index} />
        ));
  }, [viewAll]);

  return (
    <ShadowBox   className={style.containerWidth}>
      <div className={style.header}>
        <Typography component="span" variant="h5">
          Notifications
        </Typography>
        <Typography
          component="span"
          variant="subtitle1"
          className={style.anchor}
          onClick={handleViewClick}
        >
          {viewAll ? "View Less" : "View All"}
        </Typography>
      </div>
      {dataValueStore}
    </ShadowBox>
  );
}
export default Notifications;
