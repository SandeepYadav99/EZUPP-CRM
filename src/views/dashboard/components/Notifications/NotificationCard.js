import style from "./Style.module.css";
import { Typography } from "@mui/material";

function NotificationCard({ data, index }) {
  console.log(data, index);
  return (
    <div
      component="div"
      key={`Notification_card${index}`}
      className={style.parentWrapper}
    >
      <Typography component="div" variant="subtitle1" className="">
        {data?.title}
      </Typography>
      <Typography component="div" variant="body2" className="">
        {data?.body}
      </Typography>
      <Typography component="div" variant="subtitle2" className=" ">
        {data?.dateTime}
      </Typography>
    </div>
  );
}
export default NotificationCard;
// style.paymentPending
// style.paymentPendingBody
// style.paymentPending_dateTime
