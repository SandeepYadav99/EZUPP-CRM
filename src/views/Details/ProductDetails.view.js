import React, { useState, useSelector } from "react";
import styles from "./Styles.module.css";
import StatusPill from "../../components/Status/StatusPill.component";
import history from "../../libs/history.utils";
import {
  OutlineButton,
  ActionButton,
  PrimaryButton,
} from "../../components/Buttons/PrimaryButton";
import { Dialog, ButtonBase, Typography } from "@mui/material";
import { Add, ArrowBackIos, Lock } from "@mui/icons-material";
import removeTask from "../../assets/Assets/ic_delete@2x.png";
import editTask from "../../assets/Assets/ic_edit_blue@2x.png";
import ShadowBox from "../../components/ShadowBox/ShadowBox";
import useProductDetailHook from "./ProductDetailsHook";
import DeleteDialog from "../Products/List/component/DeleteDialog/DeleteDialog";

const ProductDetailview = () => {
  const { isLoading, handleSideToggle, handleDetailPage, profileDetails, handleDelete, openDialog,
    closeDialog,
    isDialogOpen,
    handleEdit} =
    useProductDetailHook({});
    const img="http://91.205.173.97:8118/public/product_images/1713506777190_red-ball-hitting-wicket-stumps-with-bat-black-abstract-splash-background-cricket-fever-concept_1302-5492.jpg"
 
  console.log("profileDetails", profileDetails);
  const getStatusPillColor = () => {
    if (profileDetails?.status === "ACTIVE") {
      return "active"; 
    } else if (profileDetails?.status === "DELETED") {
      return "high"; 
    } else if (profileDetails?.status === "DRAFT") {
      return "draft"; 
    }

  };
  
  return (
    <div>
      <div>
        <div className={styles.upperFlex}>
          <ButtonBase onClick={() => history.push("/products")}>
            <ArrowBackIos fontSize={"small"} />{" "}
            <span>
              <Typography variant={"title1"}>Product Detail</Typography>
            </span>
          </ButtonBase>
          <div></div>
          <div className={styles.profileHeading}></div>
          <div className={styles.buttonRow}>
          <OutlineButton onClick={() => {
                
                handleEdit();
              }}>
              EDIT
              <span className={styles.imageContainer}>
                <img
                  src={editTask}
                  alt="task"
                  width={20}
                  height={20}
                  className={styles.binImage}
                />
              </span>
            </OutlineButton>
            {profileDetails?.status !== "DELETED" && (
            <ActionButton onClick={openDialog}>
              DELETE
              <span className={styles.imageContainer}>
                <img
                  src={removeTask}
                  alt="task"
                  width={20}
                  height={17}
                  className={styles.binImage}
                />
              </span>
            </ActionButton>
            )}
          </div>
        </div>
        <div className={styles.gridContainer}>
          <ShadowBox className={styles.product}>
            <div className={styles.title}>
              <div className={styles.row}>
                <img
                  src={profileDetails?.image}
                  alt="Image"
                  className={styles.image}
                  crossOrigin="anonymous"
                />
                <div className={styles.textContainer}>
                  <div className={styles.row1}>
                    <Typography variant={"title"} color={"text.primary"}>
                      {" "}
                      {profileDetails?.name}
                    </Typography>
                    <div className={styles.right}>
                      <StatusPill status={profileDetails?.status} color={getStatusPillColor()}/>
                    </div>
                  </div>
                  <Typography variant={"body1"} color={"text.secondary"}>
                    {profileDetails?.code}
                  </Typography>
                  <Typography variant={"body1"} color={"text.secondary"}>
                    {profileDetails?.type}
                  </Typography>
                  <Typography variant={"body1"} className={styles.link}>
                    <a href={profileDetails?.product_link} target={"_blank"}>
                      {profileDetails?.product_link}
                    </a>
                  </Typography>
                </div>
              </div>
              <div className={styles.line} />
              <Typography variant={"subtitle1"} className={styles.title}>
                Associated Tags
              </Typography>
              <div className={styles.row21}>
              {profileDetails?.tags?.length > 0 && profileDetails?.tags.every(item => item!== "")? (
                profileDetails?.tags?.map((item, index) => (
                  <Typography
                    variant={"body1"}
                    className={styles.tags}
                    key={`tags_${index}`}
                    color={"text.primary"}
                  >
                    {item} 
                  </Typography>
                ))
              ) : (
                <Typography
                  variant={"body1"}                
                  color={"text.secondary"}
                >
                  N/A
                </Typography>
              )
                }
              </div>

              <Typography variant={"subtitle1"} className={styles.title}>
                Description
              </Typography>
              <Typography variant={"body1"} color={"text.secondary"}>
                {profileDetails?.description}
              </Typography>
            </div>
          </ShadowBox>
          <div className={styles.profileFlex}>
            <div className={styles.leftSection}>
              <>
                <ShadowBox className={styles.productComm} >
                  <div className={styles.profileContainer}></div>
                  <div className={styles.title}>
                    <Typography variant={"title"} color={"text.primary"}>
                      Product Commercials
                    </Typography>
                  </div>

                  <div>
                    <div className={styles.contactFlex}>
                      <Typography variant={"subtitle1"}>
                        Measure Unit:
                      </Typography>
                      <Typography
                        variant={"body1"}
                        color={"text.secondary"}
                        className={styles.email}
                      >
                        {profileDetails?.unit?.name ?? "N/A"}
                      </Typography>
                    </div>
                    <div className={styles.contactFlex}>
                      <Typography variant={"subtitle1"}>
                        Ballpark Cost:
                      </Typography>
                      <Typography
                        variant={"body1"}
                        color={"text.secondary"}
                        className={styles.email}
                      >
                        {" "}
                        {/* {profileDetails?.currency} {profileDetails?.ballpark_cost ?? "N/A"} */}
                        {profileDetails?.ballpark_cost != null && profileDetails.discount_value !== 0 ? `${profileDetails.currency} ${profileDetails.ballpark_cost}` : "N/A"}
                      </Typography>
                    </div>
                    <div className={styles.contactFlex}>
                      <Typography variant={"subtitle1"}>
                        Ballpark Price:
                      </Typography>
                      <Typography
                        variant={"body1"}
                        color={"text.secondary"}
                        className={styles.email}
                      >
                        {" "}
                        {/* {profileDetails?.currency} {profileDetails?.ballpark_price ?? "N/A"} */}
                        {profileDetails?.ballpark_price != null && profileDetails.discount_value !== 0 ? `${profileDetails.currency} ${profileDetails.ballpark_price}` : "N/A"}
                        
                      </Typography>
                    </div>
                    <div className={styles.contactFlex}>
                      <Typography variant={"subtitle1"}>
                        Discount Percent:
                      </Typography>
                      <Typography
                        variant={"body1"}
                        color={"text.secondary"}
                        className={styles.email}
                      >
                        {" "}
                        {profileDetails?.discount_value != null && profileDetails.discount_value !== 0 ?profileDetails?.discount_percent : "N/A"}
                      </Typography>
                    </div>
                    <div className={styles.contactFlex}>
                      <Typography variant={"subtitle1"}>
                        Discount Value:
                      </Typography>
                      <Typography
                        variant={"body1"}
                        color={"text.secondary"}
                        className={styles.email}
                      >
                        {" "}
                        {/* {profileDetails?.currency} {profileDetails?.discount_value ?? "N/A"} */}
                        {profileDetails?.discount_value != null && profileDetails.discount_value !== 0 ? `${profileDetails.currency} ${profileDetails.discount_value}` : "N/A"}
                      </Typography>
                    </div>
                  </div>

                  <div className={styles.line} />

                  <div>
                    <div className={styles.title}>
                      <Typography variant={"title"} color={"text.primary"}>
                        Activity Information
                      </Typography>
                    </div>
                    <div className={styles.activityFlex}>
                      <Typography variant={"subtitle1"}>Created By:</Typography>

                      <Typography
                        variant={"body1"}
                        color={"text.secondary"}
                        className={styles.activity}
                      >
                        {profileDetails?.createdBy?.user_name ?? "N/A"}
                      </Typography>
                    </div>
                    <div className={styles.activityFlex}>
                      <Typography variant={"subtitle1"}>Created At:</Typography>

                      <Typography
                        variant={"body1"}
                        color={"text.secondary"}
                        className={styles.activity}
                      >
                        {profileDetails?.createdAtText || "N/A"}
                      </Typography>
                    </div>
                    <div className={styles.activityFlex}>
                      <Typography variant={"subtitle1"}>Updated By:</Typography>

                      <Typography
                        variant={"body1"}
                        color={"text.secondary"}
                        className={styles.activity}
                      >
                        {profileDetails?.updatedBy?.user_name ?? "N/A"}                     
                      </Typography>
                    </div>
                    <div className={styles.activityFlex}>
                      <Typography variant={"subtitle1"}>Updated At:</Typography>

                      <Typography
                        variant={"body1"}
                        color={"text.secondary"}
                        className={styles.activity}
                      >
                        {profileDetails?.updatedAtText || "N/A"}
                      </Typography>
                    </div>
                  </div>

                  <div className={styles.line} />
                  <div className={styles.title}>
                    <Typography variant={"title"} color={"text.primary"}>
                      Settings
                    </Typography>
                  </div>
                  <div className={styles.activityFlex}>
                    <Typography variant={"subtitle1"}>Show Public:</Typography>

                    <Typography
                      variant={"body1"}
                      color={"text.secondary"}
                      className={styles.activity}
                    >
                      {profileDetails?.is_show_public ? "Yes" : "No"}
                    </Typography>
                  </div>
                  <div className={styles.activityFlex}>
                    <Typography variant={"subtitle1"}>Value Add:</Typography>

                    <Typography
                      variant={"body1"}
                      color={"text.secondary"}
                      className={styles.activity}
                    >
                      {profileDetails?.is_value_add ? "Yes" : "No"}
                    </Typography>
                  </div>
                </ShadowBox>
              </>
              
            </div>
            
          </div>
        </div>
      </div>
      <DeleteDialog
        isOpen={isDialogOpen}
        handleCLose={closeDialog}
        handleSubmit={handleDelete}
      />
    
    </div>
  );
};

export default ProductDetailview;
