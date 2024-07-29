import React from "react";
import {
  ButtonBase,
  CircularProgress,
  MenuItem,
  Typography,
} from "@mui/material";
import styles from "./Style.module.css";
import ShiftDetailsIncludeForm from "./component/ShiftDetailsincludes/ShiftDetailsIncludes.component";
import useShiftsCreateHook from "./ShiftsCreateHook";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import { useTheme } from "@mui/styles";

const ShiftsCreate = ({ handleToggleSidePannel, isSidePanel, editData }) => {
  const {
    form,
    errorData,
    changeTextData,
    onBlurHandler,
    handleSubmit,
    isSubmitting,
    shiftRef,
  } = useShiftsCreateHook({ handleToggleSidePannel, isSidePanel, editData });
  const theme = useTheme();

  return (
    <div className={styles.container}>
      <div className={"formFlex"} style={{ alignItems: "center" }}>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.name}
            errorText={errorData?.name}
            label={"Shift Name*"}
            value={form?.name}
            onTextChange={(text) => {
              changeTextData(text, "name");
            }}
            onBlur={() => {
              onBlurHandler("name");
            }}
          />
        </div>
      </div>
      <div className={styles.shiftcontainer}>
        <div className={styles.shiftHeader} style={{background:theme?.palette?.background?.paper}}>
          <div className={styles.divHead}>
            <Typography variant="body1" color={theme.palette.text.primary}>
              DAY
            </Typography>
          </div>
          <div className={styles.divHead1}>
            <Typography variant="body1" color={theme.palette.text.primary}>
              START TIME
            </Typography>
          </div>
          <div className={styles.divHead1}>
            <Typography variant="body1" color={theme.palette.text.primary}>
              END TIME
            </Typography>
          </div>
          <div className={styles.divHead}>
            <Typography variant="body1" color={theme.palette.text.primary}>
              TOTAL HOURS
            </Typography>
          </div>
          <div className={styles.divHead21}>
            <Typography variant="body1" color={theme.palette.text.primary}>
              WEEK OFF
            </Typography>{" "}
          </div>
        </div>
        <ShiftDetailsIncludeForm ref={shiftRef} isSidePanel={isSidePanel} />
      </div>

      <div className={styles.actionButton}>
        {/* <ButtonBase className={"createBtnDeletOutland"}>DELETE</ButtonBase> */}
        <ButtonBase className={"createBtnreset"} onClick={handleSubmit}>
          {isSubmitting ? (
            <CircularProgress color="success" size="20px" />
          ) : editData?.id ? (
            "Update"
          ) : (
            " ADD"
          )}
        </ButtonBase>
      </div>
    </div>
  );
};

export default ShiftsCreate;
