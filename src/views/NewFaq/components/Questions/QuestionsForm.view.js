import React, { useState, useRef, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import styles from "./Style.module.css";
import csx from "classnames";
import { withStyles } from "@mui/styles";
import {
  MenuItem,
  Button,
  IconButton,
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
import { convertFromRaw } from "draft-js";

import {
  Backup as BackupIcon,
  Info as InfoIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIRichTextEditor from "mui-rte";
import { stateToHTML } from "draft-js-export-html";
import { convertFromHTML, ContentState, convertToRaw } from "draft-js";
import {
  renderOutlinedTextField,
  renderOutlinedTextFieldWithLimit,
} from "../../../../libs/redux-material.utils";
import {
  serviceBlogsExists,
  serviceUploadBlogImage,
} from "../../../../services/Blogs.service";
import EventEmitter from "../../../../libs/Events.utils";

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
  if (values.title && !/^[A-Z ]*$/i.test(values.title)) {
    errors.title = "Only alphabets are allowed";
  }
  return errors;
};

const descNormalize = (value, prevValue) => {
  if (value && value.length > 500) {
    return prevValue;
  }
  return value;
};

const negativeNormalize = (value, prevValue) => {
  if (value && (value >= 0 && value.toString().length < 5)) {
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

const QuestionsFormView = ({
  handleSubmit,
  change,
  handleDataSave,
  handleDelete,
  classes,
  data,
  category,
}) => {
  const [is_checked, setIsChecked] = useState(false);
  const [editor, setEditor] = useState(null);
  const [editor_data, setEditorData] = useState(null);
  const [anchor, setAnchor] = useState(null);
  const [is_active, setIsActive] = useState(false);
  const [show_confirm, setShowConfirm] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const editorRef = useRef(null);

  useEffect(() => {
    if (category) {
      change("title", category.title);
    }
    let htmlData = "";
    if (data) {
      setIsActive(data.status === "ACTIVE");
      requiredFields = ["title", "priority", "question"];
      Object.keys(data).forEach((val) => {
        if (["description", "status"].indexOf(val) < 0) {
          const temp = data[val];
          change(val, temp);
        }
      });
      htmlData = data.description;
    } else {
      htmlData = "";
      requiredFields = ["title", "priority", "question"];
    }

    const contentHTML = convertFromHTML(htmlData);

    const state = ContentState.createFromBlockArray(
      contentHTML.contentBlocks,
      contentHTML.entityMap
    );
    const tempData = convertToRaw(state);
    const entityMap = tempData.entityMap;
    Object.keys(entityMap).forEach((key, index) => {
      const tempValue = entityMap[key];
      if ("data" in tempValue && "src" in tempValue.data) {
        entityMap[key].data = { ...tempValue.data, url: tempValue.data.src };
      }
    });
    setEditorData(JSON.stringify(tempData));
  }, [data, category, change]);

  const _handleSubmit = (tData) => {
    const status = is_active ? "ACTIVE" : "INACTIVE";
    if (editor) {
      if (data) {
        handleDataSave(
          {
            ...tData,
            status: status,
            faq_category_id: category.id,
            description: editor,
            id: data.id,
          },
          "UPDATE"
        );
      } else {
        handleDataSave(
          {
            ...tData,
            status: status,
            faq_category_id: category.id,
            description: editor,
          },
          "CREATE"
        );
      }
    } else {
      EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
        error: "Please Enter Description",
        type: "error",
      });
    }
  };

  const _handleEditor = (data, b) => {
    if (!data.getCurrentContent().hasText()) {
      setEditor(null);
    } else {
      const html = stateToHTML(data.getCurrentContent());
      setEditor(html);
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

  const handleEditorChange = (content, editor) => {};

  const _handleFileUpload = async (file) => {
    if (editorRef.current) {
      editorRef.current.insertAtomicBlockAsync(
        "IMAGE",
        _uploadImage(file),
        "Uploading now..."
      );
    }
  };

  const _handleSave = (data) => {
    const tData = JSON.parse(data);
    const state = convertFromRaw(tData);
  };

  const _uploadImage = (file) => {};

  const _renderEditor = () => {
    if (editor_data) {
      return (
        <>
          <ThemeProvider theme={defaultTheme}>
            <MUIRichTextEditor
              ref={(ref) => {
                editorRef.current = ref;
              }}
              defaultValue={editor_data}
              onChange={_handleEditor}
              onSave={_handleSave}
              label="Start typing..."
              controls={["bold", "italic", "underline", "link"]}
              inlineToolbar={true}
              customControls={[
                {
                  name: "upload-image",
                  icon: <BackupIcon />,
                  type: "callback",
                  onClick: (_editorState, _name, anchor) => {
                    setAnchor(anchor);
                  },
                },
              ]}
              draftEditorProps={{
                handleDroppedFiles: (_selectionState, files) => {
                  if (files.length && files[0].name !== undefined) {
                    _handleFileUpload(files[0]);
                    return "handled"
                } else {
                    return "not-handled";
                  }
                },
              }}
            />
          </ThemeProvider>
        </>
      );
    }
    return null;
  };

  const _handleChange = () => {
    setIsChecked(!is_checked);
  };

  const _suspendItem = () => {
    setShowConfirm(false);
    handleDelete(data.id);
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
          <div className={styles.heading}>Questions</div>
          <Tooltip title="Info" aria-label="info" placement="right">
            <InfoIcon fontSize={"small"} />
          </Tooltip>
        </h4>
      </div>
      <form onSubmit={handleSubmit(_handleSubmit)}>
        <div className={styles.category}>
          <b>Title</b> - {category.title}
        </div>
        <div className={styles.category}>
          <b>Applies To</b> - {category.visible_to}
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <Field
              fullWidth={true}
              name="question"
              component={renderOutlinedTextFieldWithLimit}
              maxLimit={500}
              margin={"dense"}
              normalize={descNormalize}
              label="Question Name"
            />
          </div>
        </div>
        <div className={"formFlex"}>
          <div className={"formGroup"}>
            <Field
              fullWidth={true}
              name="priority"
              type={"number"}
              component={renderOutlinedTextField}
              margin={"dense"}
              normalize={negativeNormalize}
              label="Priority"
            />
          </div>
        </div>
        <div>
          <div className={styles.lblTxt}>Answer</div>
          <div className={"formFlex"}>
            <div className={csx("formGroup", styles.editorContainer)}>
              {_renderEditor()}
            </div>
          </div>
        </div>
        <br />
        <div className={styles.bottomFlex}>
          {_renderStatus()}
          <div>
            <IconButton
              variant={"contained"}
              className={classes.iconBtnError}
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
  form: "questions",
  validate,
})(withStyles(useStyle, { withTheme: true })(QuestionsFormView));

export default connect(null, null)(ReduxForm);
