import React, { useMemo } from "react";
import styles from "./Style.module.css";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import data from './mockData.json';
import {Typography} from "@mui/material";

const EventCard =()=> {
  const { Data } = data;
  return(
    <>
    {Data.map((item, index) => (
      <ShadowBox>
<Typography variant={'h3'} color={'text.secondary'} 
            >
              {item.title}
              </Typography>
</ShadowBox>
))}
    </>
  )

}

export default EventCard;
