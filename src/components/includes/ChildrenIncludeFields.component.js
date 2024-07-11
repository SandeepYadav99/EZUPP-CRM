import React from "react";
import styles from "./style.module.css";
import { ButtonBase, Typography } from "@mui/material";
import { Remove } from "@mui/icons-material";
import { useTheme } from "@mui/styles";
import CustomTextField from "../../FormFields/TextField.component";

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
  const theme = useTheme();
  const handleChange = (e) => {
    const name = e?.target?.name;
    const value = e?.target?.value;

    changeData(index, { [name]: value });
  };

  const changeTextData = (value, key) => {
    changeData(index, { [key]: value });
  };
  return (
    <div>
      <div className={styles.flexContainer}>
        <div className={styles.firstRow}>
          <div className={styles.flex1}>
            <CustomTextField
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
              {index === 0 ? (
                <Typography
                  sx={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "25px",
                    backgroundColor: theme.palette.text.error,
                  }}
                >
                  <Remove sx={{ color: "#fff" }} />{" "}
                </Typography>
              ) : (
                <Typography
                  sx={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "25px",
                    backgroundColor: theme.palette.text.error,
                  }}
                >
                  <Remove sx={{ color: "#fff" }} />{" "}
                </Typography>
              )}
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildrenIncludeFields;
