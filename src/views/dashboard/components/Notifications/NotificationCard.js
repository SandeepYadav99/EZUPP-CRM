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
      <Typography component="div" variant="subtitle1" className="" color="text.secondary">
        {data?.title}
      </Typography>
      <Typography component="div" variant="body2" className="" color="text.secondary">
        {data?.body}
      </Typography>
      <Typography component="div" variant="subtitle3" className=" " color="text.secondary">
        {data?.dateTime}
      </Typography>
    </div>
  );
}
export default NotificationCard;
// style.paymentPending
// style.paymentPendingBody
// style.paymentPending_dateTime
