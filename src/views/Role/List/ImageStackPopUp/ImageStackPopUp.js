import { Avatar, ButtonBase, Dialog, Slide, Typography } from "@mui/material";
import React from "react";
import styles from "./Styles.module.css";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import { Close } from "@mui/icons-material";
import { resolveTimeViewsResponse } from "@mui/x-date-pickers/internals";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const ImageStackPopUp = ({ open, handleClose, industryData }) => {
  return (
    <div className={styles.mainImg}>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        fullWidth={true}
        PaperProps={{
          style: {
            borderRadius: "10px",
            maxWidth: "400px",
            width: "calc(100% - 64px)",
          },
        }}
      >
        <ShadowBox width={"100%"}>
          <div className={styles.imgContainer}>
            <div className={styles.imageHeader}>
              <Typography variant="h4">Users</Typography>

              <ButtonBase onClick={handleClose}>
                <Close fontSize="small" />
              </ButtonBase>
            </div>
            <div>
              { industryData?.map((res) => {
                return (
                  <>
                  <div className={styles.imageRow}>
                    <Avatar className={styles.avatar}>
                      <img
                        src={res?.image}
                        alt={""}
                        width={50}
                        height={50}
                        crossOrigin="anonymous"
                      />
                    </Avatar>
                    <Typography>{res.name}</Typography>
                  </div>
                  <hr className={styles.hrlines}/>
                  </>
                );
              })}
            </div>
          </div>
        </ShadowBox>
      </Dialog>
    </div>
  );
};

export default ImageStackPopUp;
