import React from "react";
import {
  ActionButton,
  ArrowPrimaryButton,
  PrimaryButton,
} from "../Buttons/PrimaryButton";
import { Add, ArrowBackIos, Edit, Info } from "@mui/icons-material";
import {
  ButtonBase,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import history from "../../libs/history.utils";
import styles from "./Styles.module.css";
import addTask from "../../assets/img/ic_add_task@2x.png";

export const CustomListHeader = ({ handleCreate, title, sideTitlle }) => {
  const theme = useTheme();
  return (
    <div className={"HeaderCustom"}>
      <Typography variant="h4" fontWeight={600}>
        {sideTitlle}
      </Typography>
      <ArrowPrimaryButton
        onClick={handleCreate}
        icon={<Add fontSize="normal" />}
      >
        <Typography variant="subtitle1" fontWeight={600}>
          {title}
        </Typography>
      </ArrowPrimaryButton>
    </div>
  );
};

// Custom List Action
export const ListActionComponent = ({
  handleDetail,
  allData: all,
  handleEdit,
  isAnotherAction,
}) => {
  const theme = useTheme();
  return (
    <>
      <IconButton
        disableRipple="false"
        onClick={() => {
          // handleSideToggle(all?.id);
          handleDetail(all);
        }}
      >
        <Info
          fontSize={"small"}
          sx={{
            color: theme.palette.text.primary,
          }}
        />
      </IconButton>
      {isAnotherAction &&  <IconButton
              disableRipple="false"
              // color={theme.palette.status.service}
              // onClick={() => handleProfile(all)}
            >
              <img
                src={addTask}
                alt="task"
                width={20}
                style={{ color: `${theme.palette.text.primary}` }}
              />
            </IconButton>}
      <IconButton
        disableRipple="false"
        onClick={() => {
          // handleSideToggle(all?.id);
          handleEdit(all);
        }}
      >
        <Edit
          fontSize={"small"}
          sx={{
            color: theme.palette.text.primary,
          }}
        />
      </IconButton>
    </>
  );
};
// Create Header ->

export const CreateHeadaerComponent = ({ id, title }) => {
  const theme = useTheme();
  return (
    <div className={styles.iconButton}>
      <ButtonBase onClick={() => history.goBack()}>
        <ArrowBackIos
          sx={{
            color: theme.palette.text.primary,
          }}
          fontSize={"small"}
        />{" "}
      </ButtonBase>
      <Typography
        variant="h4"
        fontWeight={600}
        color={theme.palette.text.primary}
      >
        {title}
        {/* {id ? "Edit" : "Create"} Role */}
      </Typography>
    </div>
  );
};

// Action Button in Create AND Update

export const CreateActionComponent = ({
  removeHandler,
  isRemove,
  handleSubmit,
  isSubmitting,
  title,
}) => {
  return (
    <div className={styles.actionButton}>
      {isRemove ? <ActionButton onClick={removeHandler}>CANCEL</ActionButton> : <Typography></Typography>}

      <PrimaryButton
        variant={"contained"}
        color={"primary"}
        type={"submit"}
        onClick={handleSubmit}
      >
        {isSubmitting ? (
          <CircularProgress color="success" size="20px" />
        ) : (
          title
        )}
      </PrimaryButton>
    </div>
  );
};

// Crate / Update detail heading componet -> ex. Detail Title


export const HeaderTitleComponet = ({ headerTitle }) => {
  const theme = useTheme();
  return (
    <Typography
      variant="h5"
      fontWeight={600}
      color={theme.palette.text.primary}
      sx={{
        margin: theme.spacing(1, 0, 1, 1),
      }}
    >
      {headerTitle}
    </Typography>
  );
};
