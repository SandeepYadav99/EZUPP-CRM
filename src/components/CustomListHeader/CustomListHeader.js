import React from "react";
import { ArrowPrimaryButton } from "../Buttons/PrimaryButton";
import { Add } from "@mui/icons-material";

export const CustomListHeader = ({ handleCreate, title ,  sideTitlle}) => {
  return (
    <div className={"HeaderCustom"}>
    <span className={"Title"}>{sideTitlle}</span>
   
    <ArrowPrimaryButton onClick={handleCreate} icon={<Add fontSize="normal" />}>
      {title}
    </ArrowPrimaryButton>
    </div>
  );
};
