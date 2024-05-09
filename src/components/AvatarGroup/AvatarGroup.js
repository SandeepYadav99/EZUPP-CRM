import {
  Avatar,
  AvatarGroup,
  Badge,
  Card,
  CardContent,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/styles";
import styles from "./Styles.module.css";
import componentData from "../JSONDATA/Data";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme.palette.badgeColor.color,
    color: "",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));
const StyledBadge1 = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme.palette.badgeColor.color1,
    color: "",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));
const StyledBadge2 = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme.palette.badgeColor.color2, //
    color: "",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));
const StyledBadge3 = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: theme.palette.badgeColor.color1, //
    color: "",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

export function UserCountAvatarsLabelInitials({
  width,
  height,
  bgcolor,
  fontSize,
  color,
  title,
}) {
  return (
    <div className={styles.flexBox}>
      <Avatar
        src=""
        alt=""
        sx={{
          width: width,
          height: height,
          bgcolor: bgcolor,
          fontSize: fontSize,
          color: color,
        }}
        className={styles.avatar}
      >
        {title}
      </Avatar>
    </div>
  );
}

export function UserCountAvatarsShapes({ avatars, title }) {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5">
          Shapes
        </Typography>
        <div className={styles.flexBox1}>
          <Avatar
            className={styles.avatar}
            src={""}
            alt=""
            sx={{ width: 44, height: 44 }}
            variant="circular"
          >
            {" "}
            <img
              src={require("../../assets/img/1.png")}
              alt=""
              height={44}
              width={44}
            />
          </Avatar>
          <Avatar
            className={styles.avatar}
            src={""}
            alt=""
            sx={{ width: 54, height: 54 }}
            variant="rounded"
          >
            {" "}
            <img
              src={require("../../assets/img/1.png")}
              alt=""
              className={styles.image}
            />
          </Avatar>
          <Avatar
            className={styles.avatar}
            src={""}
            alt=""
            sx={{ width: 64, height: 64 }}
            variant="square"
          >
            <img
              src={require("../../assets/img/1.png")}
              alt=""
              // width={70}
              // height={70}
              className={styles.image}
            />
          </Avatar>
        </div>
      </CardContent>
    </Card>
  );
}

export function UserCountAvatarsStatusIndicator({
  width,
  height,
  bgcolor,
  fontSize,
  color,
  title,
  imgUrl,
}) {
  return (
    <>
      <div className={styles.flexBox1}>
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            src={imgUrl}
            alt={title}
            sx={{ width: width, height: width }}
            className={styles.avatar1}
          >
            {title}
          </Avatar>
        </StyledBadge>
        {/* <StyledBadge1
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              src={require("../../assets/img/5.png")}
              alt=""
              sx={{ width: 44, height: 44 }}
              className={styles.avatar1}
            >
              PI
            </Avatar>
          </StyledBadge1>

          <StyledBadge2
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              src={require("../../assets/img/4.png")}
              alt=""
              sx={{ width: 44, height: 44 }}
              className={styles.avatar1}
            >
              PI
            </Avatar>
          </StyledBadge2>
          <StyledBadge3
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              src={require("../../assets/img/8.png")}
              alt=""
              sx={{ width: 44, height: 44 }}
              className={styles.avatar1}
            >
              PI
            </Avatar>
          </StyledBadge3> */}
      </div>
    </>
  );
}

export function UserCountAvatarsLableAvatarStatusIndicator({ avatars, title }) {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5">
          Lable Avatar Status Indicator
        </Typography>
        <div className={styles.flexBox}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              src=""
              alt=""
              sx={{
                width: 28,
                height: 28,
                bgcolor: "#e8e9ff",
                fontSize: "12px",
                color: "#666cff",
              }}
              className={styles.avatar1}
            >
              PI
            </Avatar>
          </StyledBadge>
          <StyledBadge1
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              src=""
              alt=""
              sx={{
                width: 34,
                height: 34,
                bgcolor: "#e9ebee",
                fontSize: "16px",
                color: "#6d788d",
              }}
              className={styles.avatar1}
            >
              PI
            </Avatar>
          </StyledBadge1>
          <StyledBadge2
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              src=""
              alt=""
              sx={{
                width: 44,
                height: 44,
                bgcolor: "#eafbdf",
                fontSize: "20px",
                color: "#72e128",
              }}
              className={styles.avatar1}
            >
              PI
            </Avatar>
          </StyledBadge2>
          <StyledBadge3
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              src=""
              alt=""
              sx={{
                width: 54,
                height: 54,
                bgcolor: "#ffe4e4",
                fontSize: "24px",
                color: "#ff4d49",
              }}
              className={styles.avatar1}
            >
              PI
            </Avatar>
          </StyledBadge3>
          <StyledBadge1
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              className={styles.avatar1}
              src=""
              alt=""
              sx={{
                width: 64,
                height: 64,
                bgcolor: "#fff4df",
                fontSize: "26px",
                color: "#fdb528",
              }}
            >
              PI
            </Avatar>
          </StyledBadge1>
          <StyledBadge2
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              className={styles.avatar1}
              src=""
              alt=""
              sx={{
                width: 74,
                height: 74,
                bgcolor: "#def6fe",
                fontSize: "26px",
                color: "#26c6f9",
              }}
            >
              PI
            </Avatar>
          </StyledBadge2>
        </div>
      </CardContent>
    </Card>
  );
}

export function UserCountAvatarsLableAvatarGroup({
  width,
  height,
  bgcolor,
  fontSize,
  color,
  title,
  imgUrl,
  maxAvator,
}) {
  return (
    <div className={styles.flexGrid}>
      <div className={styles.avaterAlignment}>
        <AvatarGroup max={maxAvator} className={styles.avatar_group2}>
          <Tooltip title={title} placement="top">
            <Avatar className={styles.avatar}>
              <img src={imgUrl} alt={title} className={styles.pull_up} />
            </Avatar>
          </Tooltip>
        </AvatarGroup>
      </div>
    </div>
  );
}
