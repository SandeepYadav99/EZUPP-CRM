import React from "react";

import styles from "./Style.module.css";
import { MenuItem, Button, IconButton, createMuiTheme } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIRichTextEditor from "mui-rte";
import {
  Backup as BackupIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import UploadImagePopover from "../component/Popover/Popover.component";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
  TextField,
} from "@mui/material";
import Autocomplete from "@mui/lab/Autocomplete";
import NewEditor from "../../../components/NewEditor/NewEditor.component";
import slugify from "slugify";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import useCreateHook from "./BlogsCreate.hook";
import { MuiThemeProvider } from "@material-ui/core";
import history from "../../../libs/history.utils";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import CustomCheckBox from "../../../components/FormFields/CustomCheckbox";
import FileField from "../../../components/FileField/File.component";
import { useParams } from "react-router-dom";

const BlogsCreate = ({ location }) => {
  const {
    form,
    changeTextData,
    errorData,
    handleSubmit,
    onChangeCheckBox,
    handleEditor,
    industries,
    dataMapped,
    handleDelete,
    confirmPopUp,
    suspendItem,
    handleDialogClose,
    taglist,
    handleFileUpload,
    handleSave,
    editor_data,
    anchor,
    coverImage,
    checked,
    descriptionRef,
  } = useCreateHook({ location });

  const defaultTheme = createMuiTheme();
  const params = useParams();

  const renderEditor = () => {
    if (editor_data) {
      return (
        <>
          <UploadImagePopover
            anchor={anchor}
            onSubmit={(data, insert) => {
              if (insert && data.file) {
                handleFileUpload(data.file);
              }
              this._setAnchor(null);
            }}
          />
          <MuiThemeProvider theme={defaultTheme}>
            <MUIRichTextEditor
              ref={(ref) => {
                this.editorRef = ref;
              }}
              defaultValue={editor_data}
              onChange={handleEditor}
              onSave={handleSave}
              label="Start typing..."
              controls={[
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "undo",
                "redo",
                "numberList",
                "bulletList",
                "quote",
                "link",
              ]}
              inlineToolbar={true}
              draftEditorProps={{
                handleDroppedFiles: (_selectionState, files) => {
                  if (files.length && files[0].name !== undefined) {
                    handleFileUpload(files[0]);
                    return "handled";
                  }
                  return "not-handled";
                },
              }}
            />
          </MuiThemeProvider>
        </>
      );
    }
  };

  const RenderDialog = () => {
    if (confirmPopUp) {
      return (
        <Dialog
          keepMounted
          open={confirmPopUp}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are You Sure"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to delete the item?
              <br />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Disagree
            </Button>
            <Button onClick={suspendItem} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      );
    }
    return null;
  };

  return (
    <>
      <div className={styles.paper}>
        <div className={styles.headerFlex}>
          <h4 className={styles.infoTitle}>
            <div className={styles.heading} onClick={() => history.goBack()}>
              Blogs
            </div>
            <Tooltip title="Info" aria-label="info" placement="right">
              <InfoIcon fontSize={"small"} />
            </Tooltip>
          </h4>
          {params?.id && (
            <IconButton
              variant={"contained"}
              onClick={handleDelete}
              type="button"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </div>
        <div className={"formGroup"} id={styles.inTwo}>
          <CustomTextField
            isError={errorData?.title}
            errorText={errorData?.title}
            label={"Title"}
            value={form?.title}
            onTextChange={(text) => {
              changeTextData(text, "title");
            }}
          />
          <CustomTextField
            isError={errorData?.slug}
            errorText={errorData?.slug}
            label={"Slug"}
            value={form?.slug}
            onTextChange={(text) => {
              changeTextData(text, "slug");
            }}
          />
        </div>
        <div className={"formGroup"}>
          <Autocomplete
            multiple
            id="tags-outlined"
            onChange={(e, value) => {
              changeTextData(value, "tags");
            }}
            value={form?.tags}
            options={taglist ? taglist : []}
            getOptionLabel={(option) => option}
            defaultValue={form?.tags}
            error={errorData?.tags}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Tags"
                error={errorData?.tags}
              />
            )}
          />
        </div>
        <label className={styles.enter}>
          Please press enter to add a tag if not found in the search results.
        </label>
        <div className={"formGroup"} id={styles.inTwo}>
          <div
            style={{ display: "flex", alignItems: "center" }}
            className={styles.minReads}
          >
            <CustomTextField
              isError={errorData?.topic}
              errorText={errorData?.topic}
              label={"No. of Mins of Read"}
              value={form?.topic}
              type="number"
              onTextChange={(text) => {
                changeTextData(text, "topic");
              }}
            />
          </div>
        </div>
        <div className={"formGroup"}>
          <CustomSelectField
            isError={errorData?.author}
            errorText={errorData?.author}
            label={"Author"}
            value={form?.author}
            handleChange={(value) => {
              changeTextData(value, "author");
            }}
          >
            <MenuItem value={"REVIEWER"}>Reviewer</MenuItem>
            <MenuItem value={"TECH"}>Tech</MenuItem>
            <MenuItem value={"BIZ"}>Biz</MenuItem>
            <MenuItem value={"KNOWLEDGE"}>Knowledge</MenuItem>
            <MenuItem value={"NEWS"}>News</MenuItem>
            <MenuItem value={"TEST"}>Test</MenuItem>{" "}
          </CustomSelectField>
        </div>
        <div className={"formGroup"}>
          <CustomTextField
            isError={errorData?.meta_description}
            errorText={errorData?.meta_description}
            label={"Meta Description"}
            value={form?.meta_description}
            onTextChange={(text) => {
              changeTextData(text, "meta_description");
            }}
          />
        </div>
        <label className={styles.enter}>
          Image should be in JPG, PNG format and should of 16:9 ratio
        </label>
        <div className={"formGroup"}>
          <FileField
            bannerLabel="Upload Image"
            default_image={coverImage}
            max_size={5 * 1024 * 1024}
            type={["png", "jpeg", "jpg"]}
            fullWidth={true}
            name="document"
            accept={"image/*"}
            label="Please Upload Image"
            show_image={true}
            error={errorData?.image}
            value={form?.image}
            onChange={(file) => {
              if (file) {
                changeTextData(file, "image");
              }
            }}
          />
          {params?.id ? (
            <a href={coverImage} target="_blank">
              Preview
            </a>
          ) : (
            ""
          )}
        </div>
        <div className={"formGroup"}>
          <CustomCheckBox
            label={
              <span style={{ color: "#888888", fontSize: "14px" }}>
                Featured
              </span>
            }
            value={form?.is_featured}
            handleChange={(text) => {
              changeTextData(text, "is_featured");
            }}
          />
        </div>

        <div className={"formGroup"}>
          <label className={styles.enter}>Blog Description</label>
          <NewEditor
            editorData={form?.blog_description}
            handleChangeEditor={(html) => {
              descriptionRef.current(html, "blog_description");
            }}
          />
        </div>

        <div className={"formGroup"}>
          <CustomSwitch
            value={form?.status}
            handleChange={() => {
              changeTextData(!form?.status, "status");
            }}
            label={`Active ?`}
          />
        </div>
        <div className={"formGroup"}>
          <div style={{ float: "right" }}>
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>

        <br />
        <br />
        {confirmPopUp && <RenderDialog />}
      </div>
    </>
  );
};

export default BlogsCreate;
