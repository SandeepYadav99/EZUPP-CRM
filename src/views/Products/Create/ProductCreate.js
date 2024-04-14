import React from "react";

import styles from "./Style.module.css";
import { ButtonBase, Typography } from "@mui/material";

import { PrimaryButton } from "../../../components/Buttons/PrimaryButton";
// import WorkInfoView from "./Component/WorkInfoView";
import ProductInformation from "./Components/ProductInformation";
import { ArrowBackIos } from "@mui/icons-material";
import history from "../../../libs/history.utils";
import useProductCreateHook from "./ProductCreateHook";

const ProductCreate = ({}) => {
  const {
    errorData,
    changeTextData,
    form,
    onBlurHandler,
    handleSubmit,
    image,
    id,
    images,
    manager,
    department,
    listData,
  } = useProductCreateHook();

  return (
    <>
      <div className={styles.outerFlex1}>
        <div className={styles.iconButton}>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIos fontSize={"small"} />{" "}
          </ButtonBase>
          <Typography variant={"h4"}>{id ? "Update" : "Add"} User</Typography>
        </div>
      </div>
      <ProductInformation
        errorData={errorData}
        form={form}
        image={image}
        changeTextData={changeTextData}
        // handleSubmit={handleSubmit}
        onBlurHandler={onBlurHandler}
        listData={listData}
      />
      {/* Work flow  */}
      {/* <WorkInfoView
        errorData={errorData}
        form={form}
       
        changeTextData={changeTextData}
        
        onBlurHandler={onBlurHandler}
        manager={manager}
        department={department}
      /> */}

      <div className={styles.saveButton}>
        <PrimaryButton color={"primary"} onClick={handleSubmit}>
          {/* {isSubmitting ? ( */}
          {/* <CircularProgress color="success" size="20px" />
              ) : (  */}
          Save
          {/* )} */}
        </PrimaryButton>
      </div>
    </>
  );
};

export default ProductCreate;
