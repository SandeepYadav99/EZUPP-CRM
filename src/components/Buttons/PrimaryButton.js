import React from 'react';
import { styled } from '@mui/material/styles';
import {Button} from "@mui/material";
import { Add, ArrowForward, Lock } from '@mui/icons-material';

const ButtonWrapper = styled(Button)(({ theme }) => ({

    '&:hover': {
        backgroundColor: theme.palette.primaryButton.hover
    },
    '&:disabled': {
        backgroundColor: theme.palette.primaryButton.disabled,
        color:  theme.palette.primaryButton.disabled_text
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

const ActionButton = ({disabled, children, ...props}) => {
    return (
        <ActionButtonWrapper variant={'outlined'} color={'error'} disabled={disabled} {...props}>
            {children}
        </ActionButtonWrapper>
    );
}

const ArrowPrimaryButton = ({...props},  icon) =>{
    return (<PrimaryButton {...props} endIcon={ !icon ? <ArrowForward/> :  <Add fontSize={"small"} />} />);
}

const ArrowOutlineButton = ({...props}, icon) =>{
    return (<OutlineButton {...props} endIcon={icon ? <Lock fontSize="normal"/> : <ArrowForward/>} />);
}

const ArrowActionButton = ({...props}) =>{
    return (<ActionButton {...props} endIcon={<ArrowForward/>} />);
}

export {
    PrimaryButton,
    OutlineButton,
    ActionButton,
    ArrowPrimaryButton,
    ArrowOutlineButton,
    ArrowActionButton
};
