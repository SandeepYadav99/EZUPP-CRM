
import React from "react";
import styles from "./style.module.css";
import TextFiledCustom from "../../CustomFormFiled/TextFiledCustom";
import { ButtonBase } from "@mui/material";

const ChildrenIncludeFields = ({
  index,
  changeData,
  variants,
  handlePress,
  data,
  errors,
  onBlur,
  currency,
  listWarehouse,
}) => {
  const handleChange = (e) => {
    const name = e?.target?.name;
    const value = e?.target?.value;
 
      changeData(index, { [name]: value });
    
  };

const changeTextData=(value,key)=>{
  changeData(index, { [key]: value });

}
  return (
    <div>
      <div className={styles.flexContainer}>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            <TextFiledCustom
              error={errors?.name}
              onChange={handleChange}
              value={data?.name}
              fullWidth={true}
              name={"name"}
              margin={"dense"}
              variant={"outlined"}
              label={"Label Name"}
            />
          </div>
      
       
          <div className={"textCenter"}>
            <ButtonBase
              className={styles.removeBtn}
              // label={this.props.index == 0 ? "+" : '-'}
              onClick={() => {
                handlePress(index === 0 ? "-" : "-", index);
              }}
            >
              {index === 0 ? "Remove" : "Remove"}
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildrenIncludeFields;
