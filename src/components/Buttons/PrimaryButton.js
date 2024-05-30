import React from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { Add, ArrowForward, Lock } from "@mui/icons-material";

const ButtonWrapper = styled(Button)(({ theme, padding }) => ({
  paddingLeft: padding ? theme.spacing(padding) : "",
  paddingRight: padding ? theme.spacing(padding) : "",
  "&:hover": {
    backgroundColor: theme.palette?.primaryButton?.hover,
  },
  "&:disabled": {
    backgroundColor: theme.palette.primaryButton?.disabled,
    color: theme.palette.primaryButton?.disabled_text,
  },
}));

const PrimaryButton = ({ disabled, padding, children, ...props }) => {
  return (
    <ButtonWrapper
      {...props}
      padding={padding}
      variant={"contained"}
      disabled={disabled ? true : false}
    >
      {children}
    </ButtonWrapper>
  );
};

const OutlineButtonWrapper = styled(Button)(({ theme, padding }) => ({
  paddingLeft: padding ? theme.spacing(padding) : theme.spacing(4),
  paddingRight: padding ? theme.spacing(padding) : theme.spacing(4),
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
  "&:disabled": {
    backgroundColor: "transparent",
    // color:  theme.palette.primaryButton.disabled_text
  },
}));

const OutlineButton = ({ disabled, padding, children, ...props }) => {
  return (
    <OutlineButtonWrapper
      variant={"outlined"}
      padding={padding}
      disabled={disabled}
      {...props}
    >
      {children}
    </OutlineButtonWrapper>
  );
};

const ActionButtonWrapper = styled(Button)(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  "&:hover": {
    backgroundColor: theme.palette.error.light,
  },
  "&:disabled": {
    backgroundColor: "transparent",
    // color:  theme.palette.primaryButton.disabled_text
  },
}));

const ActionMultiSelectButtonWrapper = styled(Button)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(0),
  paddingBottom: theme.spacing(0),
  backgroundColor: theme.palette.grey[200],
  border: 0,
  color: theme.palette.common.black,
  borderRadius: "20px",
  "&:hover": {
    backgroundColor: theme.palette.error.light,
  },
  "&:disabled": {
    backgroundColor: "transparent",
    // color:  theme.palette.primaryButton.disabled_text
  },
}));
const ActionButton = ({ disabled, children, ...props }) => {
  return (
    <ActionButtonWrapper
      variant={"outlined"}
      color={"error"}
      disabled={disabled}
      {...props}
    >
      {children}
    </ActionButtonWrapper>
  );
};

const ActionMultiSelectButton = ({ disabled, children, ...props }) => {
  return (
    <ActionMultiSelectButtonWrapper
      variant={"outlined"}
      color={"error"}
      disabled={disabled}
      {...props}
    >
      {children}
    </ActionMultiSelectButtonWrapper>
  );
};

const ArrowPrimaryButton = ({ icon, paddingLR, ...props }) => {
  return (
    <PrimaryButton
      {...props}
      padding={paddingLR}
      endIcon={!icon ? <ArrowForward /> : icon}
    />
  );
};

const ArrowOutlineButton = ({ paddingLR, icon, ...props }) => {
  return (
    <OutlineButton
      {...props}
      padding={paddingLR}
      endIcon={icon ? icon : <ArrowForward />}
    />
  );
};

const ArrowActionButton = ({ icon, ...props }) => {
  return <ActionButton {...props} endIcon={!icon ? <ArrowForward /> : icon} />;
};

export {
  PrimaryButton,
  OutlineButton,
  ActionButton,
  ArrowPrimaryButton,
  ArrowOutlineButton,
  ArrowActionButton,
  ActionMultiSelectButton,
};
