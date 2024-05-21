import React from 'react';
import { styled } from '@mui/material/styles';
import {Button} from "@mui/material";
import { Add, ArrowForward, Lock } from '@mui/icons-material';

const ButtonWrapper = styled(Button)(({ theme }) => ({

    '&:hover': {
        backgroundColor: theme.palette?.primaryButton?.hover
    },
    '&:disabled': {
        backgroundColor: theme.palette.primaryButton?.disabled,
        color:  theme.palette.primaryButton?.disabled_text
    }
}));
const PrimaryButton = ({disabled, children, ...props}) => {
    return (
        <ButtonWrapper {...props} variant={'contained'} disabled={disabled ? true : false}>
            {children}
        </ButtonWrapper>
    )
};

const OutlineButtonWrapper = styled(Button)(({ theme }) => ({
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    '&:hover': {
        backgroundColor: theme.palette.primary.light
    },
    '&:disabled': {
        backgroundColor: 'transparent',
        // color:  theme.palette.primaryButton.disabled_text
    }
}));

const OutlineButton = ({disabled, children, ...props}) => {
    return (
        <OutlineButtonWrapper variant={'outlined'} disabled={disabled} {...props}>
            {children}
        </OutlineButtonWrapper>
    );
}

const ActionButtonWrapper = styled(Button)(({ theme }) => ({
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    '&:hover': {
        backgroundColor: theme.palette.error.light
    },
    '&:disabled': {
        backgroundColor: 'transparent',
        // color:  theme.palette.primaryButton.disabled_text
    }
}));

const ActionMultiSelectButtonWrapper = styled(Button)(({ theme }) => ({
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    backgroundColor: theme.palette.grey[200],
    border:0,
    color:theme.palette.common.black,
    borderRadius:"20px",
    '&:hover': {
        backgroundColor: theme.palette.error.light
    },
    '&:disabled': {
        backgroundColor: 'transparent',
        // color:  theme.palette.primaryButton.disabled_text
    }
}));
const ActionButton = ({disabled, children, ...props}) => {
    return (
        <ActionButtonWrapper variant={'outlined'} color={'error'} disabled={disabled} {...props}>
            {children}
        </ActionButtonWrapper>
    );
}

const ActionMultiSelectButton = ({disabled, children, ...props}) => {
    return (
        <ActionMultiSelectButtonWrapper variant={'outlined'} color={'error'} disabled={disabled} {...props}>
            {children}
        </ActionMultiSelectButtonWrapper>
    );
}

const ArrowPrimaryButton = ({icon, ...props}) =>{
    return (<PrimaryButton {...props} endIcon={ !icon ? <ArrowForward/> :  icon} />);
}

const ArrowOutlineButton = ({ icon,...props}) =>{
    return (<OutlineButton {...props} endIcon={icon ? icon : <ArrowForward/>} />);
}

const ArrowActionButton = ({icon, ...props}) =>{
    return (<ActionButton {...props} endIcon={!icon ?  <ArrowForward/> : icon} />);
}

export {
    PrimaryButton,
    OutlineButton,
    ActionButton,
    ArrowPrimaryButton,
    ArrowOutlineButton,
    ArrowActionButton,
    ActionMultiSelectButton
};
