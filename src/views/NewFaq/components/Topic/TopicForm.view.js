import React, { useState, useEffect, useRef } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import styles from "./Style.module.css";
import csx from "classnames";
import { MenuItem, Button, IconButton } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { withStyles } from "@mui/styles";

import {
  renderOutlinedTextField,
  renderOutlinedTextFieldWithLimit,
  renderOutlinedSelectField,
  renderCheckbox,
  renderAutoComplete,
  renderFileField,
} from "../../../../libs/redux-material.utils";
import {
  FormControlLabel,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  Tooltip,
} from "@mui/material";
import { Delete as DeleteIcon, Info as InfoIcon } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

let requiredFields = [];

const validate = (values) => {
  const errors = {};
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

const descNormalize = (value, prevValue) => {
  if (value.length > 100) {
    return prevValue;
  }
  return value;
};

const negativeNormalize = (value, prevValue) => {
  if (!value || (value >= 0 && value.length < 5)) {
    return value;
  }
  return prevValue;
};

const defaultTheme = createTheme();

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        width: "100%",
      },
      editor: {
        borderBottom: "1px solid gray",
      },
    },
  },
});

const Faq = (props) => {
  const [is_checked, setIsChecked] = useState(false);
  const [is_active, setIsActive] = useState(false);
  const [show_confirm, setShowConfirm] = useState(false);
  const editorRef = useRef(null);

  const { data, handleSubmit, classes, cities, faq_type } = props;

  useEffect(() => {
    if (data) {
      setIsActive(data.status === "ACTIVE");
      requiredFields = ["title", "visible_to"];
      Object.keys(data).forEach((val) => {
        if (["status"].indexOf(val) < 0) {
          const temp = data[val];
          props.change(val, temp);
        }
      });
    } else {
      requiredFields = ["title", "visible_to", "priority"];
    }
  }, [data, props]);

  const _handleSubmit = (tData) => {
    const status = is_active ? "ACTIVE" : "INACTIVE";
    if (data) {
      props.handleDataSave({ ...tData, status: status, id: data.id }, "UPDATE");
    } else {
      props.handleDataSave({ ...tData, status: status }, "CREATE");
    }
  };

  const _handleActive = () => {
    setIsActive(!is_active);
  };

  const _renderStatus = () => {
    return (
      <FormControlLabel
        control={
          <Switch
            color={"primary"}
            checked={is_active}
            onChange={_handleActive}
            value="is_active"
          />
        }
        label="Active ?"
      />
    );
  };

  const _handleChange = () => {
    setIsChecked(!is_checked);
  };

  const _convertData = (data) => {
    const temp = {};
    data.forEach((val) => {
      temp[val.id] = val.name;
    });
    return temp;
  };

  const _suspendItem = () => {
    setShowConfirm(false);
    props.handleDelete(data.id);
  };

  const _handleDialogClose = () => {
    setShowConfirm(false);
  };

  const _handleDelete = () => {
    setShowConfirm(true);
  };

  const _renderDialog = () => {
    if (show_confirm) {
      return (
        <Dialog
          keepMounted
          TransitionComponent={Transition}
          open={show_confirm}
          onClose={_handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          classes={{ paper: classes.dialog }}
        >
          <DialogTitle id="alert-dialog-title">{"Are You Sure"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to delete the item?
              <br />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={_handleDialogClose} color="primary">
              Disagree
            </Button>
            <Button onClick={_suspendItem} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
    return null;
  };

  return (
    <div>
      <div className={styles.headerFlex}>
        <h4 className={styles.infoTitle}>
          <div className={styles.heading}>FAQ</div>
          <Tooltip title="Info" aria-label="info" placement="right">
            <InfoIcon fontSize={"small"} />
          </Tooltip>
        </h4>
      </div>
      <form onSubmit={handleSubmit(_handleSubmit)}>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <Field
              fullWidth={true}
              name="title"
              component={renderOutlinedTextFieldWithLimit}
              maxLimit={100}
              multiline
              rows="1"
              margin={"dense"}
              normalize={descNormalize}
              label="Topic Header/Question"
            />
          </div>
        </div>

        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <Field
              fullWidth={true}
              name="visible_to"
              component={renderOutlinedSelectField}
              margin={"dense"}
              label="Applies To"
            >
              <MenuItem value={"BOTH"}>General</MenuItem>
            </Field>
          </div>
        </div>
        <br />

        <div className={styles.bottomFlex}>
          {_renderStatus()}
          <div>
            <IconButton
              variant={"contained"}
              className={props.classes.iconBtnError}
              onClick={_handleDelete}
              type="button"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>

        <br />
        <div className={styles.submitBtn}>
          <Button
            className={"sub"}
            variant={"contained"}
            color={"primary"}
            type={"submit"}
          >
            Save
          </Button>
        </div>
      </form>
      {_renderDialog()}
    </div>
  );
};

const useStyle = (theme) => ({
  btnSuccess: {
    backgroundColor: theme.palette.success.dark,
    color: "white",
    marginRight: 5,
    marginLeft: 5,
    "&:hover": {
      backgroundColor: theme.palette.success.main,
    },
  },
  btnError: {
    backgroundColor: theme.palette.error.dark,
    color: "white",
    marginLeft: 5,
    marginRight: 5,
    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
  },
  iconBtnError: {
    color: theme.palette.error.dark,
  },
});

const ReduxForm = reduxForm({
  form: "topic", // a unique identifier for this form
  validate,
})(withStyles(useStyle, { withTheme: true })(Faq));

export default connect(null, null)(ReduxForm);
