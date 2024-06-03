import React from "react";
import { ArrowPrimaryButton } from "../Buttons/PrimaryButton";
import { Add } from "@mui/icons-material";
import { Typography } from "@mui/material";

export const CustomListHeader = ({ handleCreate, title, sideTitlle }) => {
  return (
    <div className={"HeaderCustom"}>
      <Typography fontSize={18}  fontWeight={600}>
        {sideTitlle}
      </Typography>
      <ArrowPrimaryButton
        onClick={handleCreate}
        icon={<Add fontSize="normal" />}
        paddingLR={2}
      >
        <Typography variant="h6"  fontWeight={600}>
          {title}
        </Typography>
      </ArrowPrimaryButton>
    </div>
  );
};
