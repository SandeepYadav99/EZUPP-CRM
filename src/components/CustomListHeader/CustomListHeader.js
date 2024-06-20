import React from "react";
import { ArrowPrimaryButton } from "../Buttons/PrimaryButton";
import { Add } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/styles";

export const CustomListHeader = ({ handleCreate, title, sideTitlle }) => {
  const theme = useTheme()
  return (
    <div className={"HeaderCustom"}>
      <Typography variant="h4"  fontWeight={600}>
        {sideTitlle}
      </Typography>
      <ArrowPrimaryButton
        onClick={handleCreate}
        icon={<Add fontSize="normal" />}
       
      >
        <Typography variant="subtitle1"  fontWeight={600}>
          {title}
        </Typography>
      </ArrowPrimaryButton>
    </div>
  );
};
