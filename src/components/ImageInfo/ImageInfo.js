import { InfoOutlined } from "@mui/icons-material";
import { Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import React from "react";

const ImageInfoToolTip = ({ title, resolution }) => {
  const theme = useTheme();
  
  return (
    <>
      <Typography variant={"subtitle1"} color={theme.palette.text.primary}>
        {title}
      </Typography>
      <Tooltip
        title={resolution}
        
        placement="right-start"
        sx={{
          cursor: "pointer",
         
        }}
      
      >
        <InfoOutlined  fontSize="small" color="action" />
      </Tooltip>
    </>
  );
};

export default ImageInfoToolTip;
