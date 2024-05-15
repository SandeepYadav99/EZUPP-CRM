import React from "react";

import styles from "./Style.module.css";
import { MenuItem, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { ActionButton } from "../../../components/Buttons/PrimaryButton";
import { PrimaryButton } from "../../../components/Buttons/PrimaryButton";
import NewEditor from "../../../components/NewEditor/NewEditor.component";
import CustomTextField from "../../../components/FormFields/TextField/TextField.component";
import history from "../../../libs/history.utils";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import CustomSwitch from "../../../components/FormFields/CustomSwitch";
import FileField from "../../../components/FileField/File.component";
import useNewBlogCreateHook from "./BlogsNewCreate.hook";
import MultiComplete from "../../../components/FormFields/AutoCompleteText/MultiComplete";
import ShadowBox from "../../../components/ShadowBox/ShadowBox";
const NewBlogsCreate = ({ location }) => {
  const {
    form,
    changeTextData,
    errorData,
    handleSubmit,
    taglist,
    handleCancel,
    coverImage,
    descriptionRef,
  } = useNewBlogCreateHook({ location });

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
              
              <Typography variant="body1" color={"text.secondary"}>
                Description
              </Typography>
              <NewEditor
                buttonList={true}
                // height={400}
                height={264}
                editorData={form?.blog_description}
                handleChangeEditor={(html) => {
                  descriptionRef.current(html, "blog_description");
                }}
              />
            </div>
            <div className={"formGroup"}>
              <MultiComplete
              isError={errorData?.tags}
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
          </ShadowBox>
        </div>
        <div className={styles.right}>
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
              <CustomTextField
                fullWidth
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
                <MenuItem value={"ACTIVE"}>ACTIVE</MenuItem>
                <MenuItem value={"INACTIVE"}>INACTIVE</MenuItem>
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
      {/* </div> */}
    </div>
  );
};

export default NewBlogsCreate;
