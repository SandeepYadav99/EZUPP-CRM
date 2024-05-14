import React from "react";

import styles from "./Style.module.css";
import {
  MenuItem,
  Button,
  IconButton,
  createMuiTheme,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MUIRichTextEditor from "mui-rte";
import {
  Backup as BackupIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import UploadImagePopover from "../component/Popover/Popover.component";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { ActionButton } from "../../../components/Buttons/PrimaryButton";
import { PrimaryButton } from "../../../components/Buttons/PrimaryButton";
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
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import history from "../../../libs/history.utils";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import CustomCheckBox from "../../../components/FormFields/CustomCheckbox";
import FileField from "../../../components/FileField/File.component";
import { useParams } from "react-router-dom";
import useNewBlogCreateHook from "./BlogsNewCreate.hook";
import PageBox from "../../../components/PageBox/PageBox.component";
// import Typography from "../../../themes/typography";
import MultiComplete from "../../../components/FormFields/AutoCompleteText/MultiComplete";
import ShadowBox from "../../../components/ShadowBox/ShadowBox";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const NewBlogsCreate = ({ location }) => {
  const {
    form,
    changeTextData,
    errorData,
    handleSubmit,
    onChangeCheckBox,
    handleEditor,
    industries,
    dataMapped,
   
    confirmPopUp,
    handleDialogClose,
    taglist,
    handleFileUpload,
    handleSave,
    handleCancel,
    editor_data,
    anchor,
    coverImage,
    setCoverImage,
    suspendItem,

    checked,
  } = useNewBlogCreateHook({ location });

  const defaultTheme = createMuiTheme();
  const params = useParams();
  const theme = useTheme();
  console.log("blog", form, errorData);
  console.log("blog", coverImage);

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
          <ThemeProvider theme={defaultTheme}>
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
          </ThemeProvider>
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
  console.log("taglist", taglist, industries);

  console.log("form", form, coverImage);

  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <ArrowBackIosNewIcon
          fontSize="medium"
          onClick={() => history.goBack()}
          sx={{ cursor: "pointer" }}
        />
        <Typography variant={"h4"} color={"text.secondary"}>
          Create Blog
        </Typography>
      </div>
      {/* <div className={styles.paper}> */}
      {/* <div className={styles.headerFlex}>
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
        </div> */}
      <div className={styles.mainFlex}>
        <div className={styles.left}>
          <ShadowBox width={"100%"}>
            <div className={styles.headerFlex}>
              <Typography variant="h5" color={"text.secondary"}>
                Blog Post
              </Typography>
              {/* <h4 className={styles.infoTitle}>
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
          )} */}
            </div>
            <div className={"formGroup"}>
              <FileField
                bannerLabel="Upload Cover Image"
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
                is_not_default_width
                is_not_default_height
                onChange={(file) => {
                  if (file) {
                    changeTextData(file, "image");
                  }
                }}
                isBlogPage
                imageClass={"fileClass"}
              />
              {/* {params?.id ? (
                <a href={coverImage} target="_blank">
                  Preview
                </a>
              ) : (
                ""
              )} */}
              {/* <label className={styles.enter}>
              Image should be in JPG, PNG format and should of 16:9 ratio
            </label> */}
              <Typography variant="body2" color={"text.secondary"}>
                Image should be in JPG, PNG format and should of 16:9 ratio
              </Typography>
            </div>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.title}
                errorText={errorData?.title}
                label={"Blog Title"}
                value={form?.title}
                onTextChange={(text) => {
                  changeTextData(text, "title");
                }}
              />
            </div>
            <div className={"formGroup"}>
              {/* <label className={styles.enter}>Blog Description</label> */}
              <Typography variant="body1" color={"text.secondary"}>
                Description
              </Typography>
              <NewEditor
                buttonList={true}
                // height={400}
                height={264}
                editorData={form?.blog_description}
                handleChangeEditor={(html) => {
                  changeTextData(html, "blog_description");
                }}
              />
            </div>
            <div className={"formGroup"}>
              {/* <Autocomplete
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
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      sx: {
                        paddingRight: theme.spacing(0),
                        paddingLeft: theme.spacing(0),
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <SearchIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              /> */}
              <MultiComplete
                multiple
               isArray
                AutoCompleteList={taglist ? taglist : []}
                getOptionLabel={(option) => option}
                label="Associate Tags"
                defaultValue={form?.tags}
                value={form?.tags}
                onTextChange={(text) => {
                  changeTextData(text, "tags");
                }}
               
              />
              <Typography variant="body2" color={"text.secondary"}>
                Please press enter to add a tag if not found in the search
                results.
              </Typography>
            </div>
            {/* <label className={styles.enter}>
              Please press enter to add a tag if not found in the search
              results.
            </label> */}

            {/* <div className={"formGroup"} id={styles.inTwo}>
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
            </div> */}
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.topic}
                errorText={errorData?.topic}
                label={"Topic"}
                value={form?.topic}
                handleChange={(value) => {
                  changeTextData(value, "topic");
                }}
              >
                <MenuItem value={"Xyz"}>Xyz</MenuItem>
                <MenuItem value={"B"}>B</MenuItem>
                <MenuItem value={"C"}>C</MenuItem>
                <MenuItem value={"D"}>D</MenuItem>
                <MenuItem value={"E"}>E</MenuItem>
                <MenuItem value={"F"}>F</MenuItem>
              </CustomSelectField>
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
            {/* <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.meta_description}
                errorText={errorData?.meta_description}
                label={"Meta Description"}
                value={form?.meta_description}
                onTextChange={(text) => {
                  changeTextData(text, "meta_description");
                }}
              />
            </div> */}
          </ShadowBox>
        </div>
        <div className={styles.right}>
          {/* <div className={"formGroup"}>
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
          </div> */}
          <ShadowBox className={styles.slugBox}>
            <Typography
              variant="h5"
              color={"text.secondary"}
              className={styles.marginLeft}
            >
              SEO
            </Typography>
            <div className={"formGroup"}>
              <CustomTextField
                isError={errorData?.slug}
                errorText={errorData?.slug}
                label={"Slug"}
                value={form?.slug}
                disabled
                onTextChange={(text) => {
                  changeTextData(text, "slug");
                }}
              />
            </div>
            <div className={"formGroup"}>
              {/* <CustomTextField
                isError={errorData?.meta_description}
                errorText={errorData?.meta_description}
                label={"Meta Description"}
                value={form?.meta_description}
                onTextChange={(text) => {
                  changeTextData(text, "meta_description");
                }}
              /> */}
              {/* <Typography variant="body1" color={"text.secondary"}>
                Meta Description
              </Typography> */}
              {/* <NewEditor
               buttonList={false}
               label={"Meta Description"}
               height={146}
                editorData={form?.meta_description}
                handleChangeEditor={(html) => {
                  descriptionRef.current(html, "meta_description");
                }}
              /> */}
              <CustomTextField
                fullWidth
                // inputProps={{
                //   sx: {
                //     "& >fieldset": { height: "146px" },
                //   },
                // }}
                isError={errorData?.meta_description}
                errorText={errorData?.meta_description}
                label={"Meta Description"}
                value={form?.meta_description}
                onTextChange={(text) => {
                  changeTextData(text, "meta_description");
                }}
                multiline
                rows={5}
              />
            </div>
          </ShadowBox>
          <ShadowBox className={styles.settingsBox}>
            <Typography
              variant="h5"
              color={"text.secondary"}
              className={styles.marginLeft}
            >
              Settings
            </Typography>
            <div className={"formGroup"}>
              <CustomSelectField
                isError={errorData?.status}
                errorText={errorData?.status}
                label={"Status"}
                value={form?.status}
                handleChange={(value) => {
                  changeTextData(value, "status");
                }}
              >
                <MenuItem value={"Active"}>Active</MenuItem>
                <MenuItem value={"InActive"}>InActive</MenuItem>
              </CustomSelectField>
            </div>
            <div className={"formGroup"}>
              <CustomSwitch
                value={form?.is_featured}
                handleChange={() => {
                  changeTextData(!form?.is_featured, "is_featured");
                  
                }}
                label={`Is Featured?`}
              />
            </div>
          </ShadowBox>
        </div>
      </div>

      <div className={"formGroup"}>
        <div style={{ float: "right" }}>
          <PrimaryButton
            variant={"contained"}
            color={"primary"}
            onClick={handleSubmit}
          >
            SAVE
          </PrimaryButton>
        </div>
        <div style={{ float: "left" }}>
          <ActionButton onClick={handleCancel}>CANCEL</ActionButton>
        </div>
      </div>

      <br />
      <br />
      {confirmPopUp && <RenderDialog />}
      {/* </div> */}
    </div>
  );
};

export default NewBlogsCreate;
