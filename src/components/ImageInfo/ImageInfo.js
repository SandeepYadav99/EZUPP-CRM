import { InfoOutlined } from "@mui/icons-material";
import { Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import React from "react";

const ImageInfoToolTip = ({ title, resolution }) => {
  const theme = useTheme();
  
  return (
    <>
      <Typography variant={"subtitle1"} fontSize={12} color={theme.palette.text.subText1}>
        {title}
      </Typography>
      <Tooltip
        title={resolution}
        
        placement="right-start"
        sx={{
          cursor: "pointer",
         
        }}
      
      >
        <InfoOutlined  fontSize="12px" color="action" />
      </Tooltip>
    </>
  );
};

export default ImageInfoToolTip;
