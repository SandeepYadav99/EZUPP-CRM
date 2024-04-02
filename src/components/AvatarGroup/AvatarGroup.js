import {
  Avatar,
  AvatarGroup,
  Badge,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { StylesContext, styled } from "@mui/styles";
import styles from "./Styles.module.css";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#72e128",
    color: "",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));
const StyledBadge1 = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));
const StyledBadge2 = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));
export default function UserCountAvatars({ avatars }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <div>
          <Typography gutterBottom variant={"h5"}>
            Defaul
          </Typography>
        </div>
        <div className={styles.avaterAlignment}>
          <AvatarGroup max={4}>
            {avatars.map((avatar, index) => (
              <Avatar key={index} alt={avatar.alt}>
                {avatar}
              </Avatar>
            ))}
          </AvatarGroup>
        </div>
      </CardContent>
    </Card>
  );
}

export function UserCountAvatarsSize({ avatars, title }) {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5">
          Size
        </Typography>
        <div className={styles.flexBox}>
          <Avatar
            src={require("../../assets/img/1.png")}
            alt=""
            sx={{ width: 24, height: 24 }}
          />
          <Avatar
            src={require("../../assets/img/1.png")}
            alt=""
            sx={{ width: 34, height: 34 }}
          />
          <Avatar
            src={require("../../assets/img/1.png")}
            alt=""
            sx={{ width: 44, height: 44 }}
          />
          <Avatar
            src={require("../../assets/img/1.png")}
            alt=""
            sx={{ width: 54, height: 54 }}
          />
          <Avatar
            src={require("../../assets/img/1.png")}
            alt=""
            sx={{ width: 64, height: 64 }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export function UserCountAvatarsInitials({ avatars, title }) {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5">
          Initials
        </Typography>
        <div className={styles.flexBox}>
          <Avatar
            src=""
            alt=""
            sx={{ width: 28, height: 28, bgcolor: "#666cff" }}
          >
            PI
          </Avatar>
          <Avatar
            src=""
            alt=""
            sx={{ width: 34, height: 34, bgcolor: "#636578" }}
          >
            PI
          </Avatar>
          <Avatar
            src=""
            alt=""
            sx={{ width: 44, height: 44, bgcolor: "#2cd548" }}
          >
            PI
          </Avatar>
          <Avatar
            src=""
            alt=""
            sx={{ width: 54, height: 54, bgcolor: "#ff4500" }}
          >
            PI
          </Avatar>
          <Avatar
            src=""
            alt=""
            sx={{ width: 64, height: 64, bgcolor: "#1ab7ea" }}
          >
            PI
          </Avatar>
        </div>
      </CardContent>
    </Card>
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
            src={""}
            alt=""
            sx={{ width: 54, height: 54 }}
            variant="rounded"
          >
            {" "}
            <img
              src={require("../../assets/img/1.png")}
              alt=""
              height={54}
              width={54}
            />
          </Avatar>
          <Avatar
            src={""}
            alt=""
            sx={{ width: 64, height: 64 }}
            variant="square"
          >
            <img
              src={require("../../assets/img/1.png")}
              alt=""
              height={64}
              width={64}
            />
          </Avatar>
        </div>
      </CardContent>
    </Card>
  );
}

export function UserCountAvatarsStatusIndicator({ avatars, title }) {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5">
          Status Indicator
        </Typography>
        <div className={styles.flexBox1}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              src={require("../../assets/img/1.png")}
              alt=""
              sx={{ width: 44, height: 44 }}
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
              src={require("../../assets/img/1.png")}
              alt=""
              sx={{ width: 44, height: 44 }}
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
              src={require("../../assets/img/1.png")}
              alt=""
              sx={{ width: 44, height: 44 }}
            >
              PI
            </Avatar>
          </StyledBadge2>
          {/* <Avatar
            src=""
            alt=""
            sx={{ width: 54, height: 54, bgcolor: "#ff4500" }}
          >
            PI
          </Avatar> */}
        </div>
      </CardContent>
    </Card>
  );
}
