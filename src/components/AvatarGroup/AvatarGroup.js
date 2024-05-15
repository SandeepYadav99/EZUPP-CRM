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
  )}
  
export function UserCountAvatarsSize({ avatars, title }) {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5">
          Size
        </Typography>
        <div className={styles.flexBox}>
          <Avatar
            className={styles.avatar_size}
            src={require("../../assets/img/1.png")}
            alt=""
            sx={{ width: 24, height: 24 }}
            variant="circular"
          />
          <Avatar
            className={styles.avatar_size}
            src={require("../../assets/img/1.png")}
            alt=""
            sx={{ width: 34, height: 34 }}
            variant="circular"
          />
          <Avatar
            className={styles.avatar_size}
            src={require("../../assets/img/1.png")}
            alt=""
            sx={{ width: 44, height: 44 }}
            variant="circular"
          />
          <Avatar
            className={styles.avatar_size}
            src={require("../../assets/img/1.png")}
            alt=""
            sx={{ width: 54, height: 54 }}
            variant="circular"
          />
          <Avatar
            className={styles.avatar_size}
            src={require("../../assets/img/1.png")}
            alt=""
            sx={{ width: 64, height: 64 }}
            variant="circular"
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
            className={styles.avatar}
            src=""
            alt=""
            sx={{ width: 28, height: 28, bgcolor: "#666cff", fontSize: "12px" }}
          >
            PI
          </Avatar>
          <Avatar
            className={styles.avatar}
            src=""
            alt=""
            sx={{ width: 34, height: 34, bgcolor: "#636578", fontSize: "16px" }}
          >
            PI
          </Avatar>
          <Avatar
            className={styles.avatar}
            src=""
            alt=""
            sx={{ width: 44, height: 44, bgcolor: "#2cd548", fontSize: "20px" }}
          >
            PI
          </Avatar>
          <Avatar
            className={styles.avatar}
            src=""
            alt=""
            sx={{ width: 54, height: 54, bgcolor: "#ff4500", fontSize: "24px" }}
          >
            PI
          </Avatar>
          <Avatar
            className={styles.avatar}
            src=""
            alt=""
            sx={{ width: 64, height: 64, bgcolor: "#1ab7ea", fontSize: "26px" }}
          >
            PI
          </Avatar>
        </div>
      </CardContent>
    </Card>
  );
}

// export function UserCountAvatarsLabelInitials({ avatars, title }) {
//   return (
//     <Card>
//       <CardContent>
//         <Typography gutterBottom variant="h5">
//           Label Initials
//         </Typography>
//         <div className={styles.flexBox}>
//           <Avatar
//             src=""
//             alt=""
//             sx={{
//               width: 28,
//               height: 28,
//               bgcolor: "#e8e9ff",
//               fontSize: "12px",
//               color: "#666cff",
//             }}
//             className={styles.avatar}
//           >
//             PI
//           </Avatar>
//           <Avatar
//             src=""
//             alt=""
//             sx={{
//               width: 34,
//               height: 34,
//               bgcolor: "#e9ebee",
//               fontSize: "16px",
//               color: "#6d788d",
//             }}
//             className={styles.avatar}
//           >
//             PI
//           </Avatar>
//           <Avatar
//             className={styles.avatar}
//             src=""
//             alt=""
//             sx={{
//               width: 44,
//               height: 44,
//               bgcolor: "#eafbdf",
//               fontSize: "20px",
//               color: "#72e128",
//             }}
//           >
//             PI
//           </Avatar>
//           <Avatar
//             className={styles.avatar}
//             src=""
//             alt=""
//             sx={{
//               width: 54,
//               height: 54,
//               bgcolor: "#ffe4e4",
//               fontSize: "24px",
//               color: "#ff4d49",
//             }}
//           >
//             PI
//           </Avatar>
//           <Avatar
//             className={styles.avatar}
//             src=""
//             alt=""
//             sx={{
//               width: 64,
//               height: 64,
//               bgcolor: "#fff4df",
//               fontSize: "26px",
//               color: "#fdb528",
//             }}
//           >
//             PI
//           </Avatar>
//           <Avatar
//             className={styles.avatar}
//             src=""
//             alt=""
//             sx={{
//               width: 74,
//               height: 74,
//               bgcolor: "#def6fe",
//               fontSize: "26px",
//               color: "#26c6f9",
//             }}
//           >
//             PI
//           </Avatar>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

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

// export function UserCountAvatarsLableAvatarGroup({
//   width,
//   height,
//   bgcolor,
//   fontSize,
//   color,
//   title,
//   imgUrl,
//   maxAvator,
// }) {
//   return (
//     <Card mt={2}>
//       <Typography gutterBottom variant="h5">
//         Avatar Group
//       </Typography>
//       <div className={styles.flexGrid}>
     

//         <CardContent>
//           <Typography gutterBottom variant="h5">
//             Pull Up with Tooltip
//           </Typography>
//           <div className={styles.avaterAlignment}>
//           <AvatarGroup max={4} className={styles.avatar_group2}>
//               {componentData?.components[5]?.props?.avatars6?.map((avator) => {
//                 return (
//                   <>
//                     <Tooltip title={avator?.title} placement="top">
//                       <Avatar className={styles.avatar}>
//                         <img
//                           src={avator?.imageUrl}
//                           alt={""}
//                           className={styles.pull_up}
//                         />
//                       </Avatar>
//                     </Tooltip>
//                   </>
//                 );
//               })}
//             </AvatarGroup>
//           </div>
//         </CardContent>

//         <CardContent>
//           <Typography gutterBottom variant="h5">
//             Avatar with count
//           </Typography>
//           <div className={styles.avaterAlignment}>
//             <AvatarGroup max={4} className={styles.avatar_group2}>
//               <Avatar className={styles.avatar}>
//                 <img
//                   src={require("../../assets/img/1.png")}
//                   alt={""}
//                   className={styles.pull_up}
//                 />
//               </Avatar>

//               <Avatar className={styles.avatar}>
//                 <img src={require("../../assets/img/4.png")} alt={""} />
//               </Avatar>

//               <Avatar className={styles.avatar}>
//                 <img src={require("../../assets/img/5.png")} alt={""} />
//               </Avatar>

//               <Tooltip title="+3 More" placement="bottom">
//                 <Avatar className={styles.avatar}>+3</Avatar>
//               </Tooltip>
//             </AvatarGroup>
//           </div>
//         </CardContent>
//       </div>
//     </div>
//   );
// }

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