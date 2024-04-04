import React from 'react'
import data from './data';
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import { Typography } from "@mui/material";
import styles from "./Style.module.css";
const QuickAccess = () => {
    // const { Data } = data;
  return (
    <>
    
        
        <ShadowBox className={styles.quickAccess}>
        {data.Data.map((item, index) => (
            <>
        <Typography className={styles.title} variant={'h4'} color={'text.secondary'} 
            >
              {item.title}
              </Typography>
              
              </>
              ))}
           <div className={styles.line} />
           {/* <div className={styles.hline} /> */}
           <div className={styles.firstRow}>
          
           {data.Data.map((item, index) => (
            <>
             <div className={styles.row}
             
              
            >
                  
             <img src={item.image} alt="Image" className={styles.image} />
             <div className={styles.text}>
        <Typography  variant={'h5'} color={'text.secondary'}  sx={{ ml: 1 }}
            >
              {item.subtitle}
              </Typography>
              <Typography  variant={"body2"}  color={"text.secondary"} sx={{ ml: 1}}>
                {item.bodyText}
              </Typography>
            
              </div>
             
            </div>
           
              </>
              ))}
          
</div>
    </ShadowBox>
    
   
    </>
  )
}

export default QuickAccess