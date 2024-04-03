import React, { useMemo } from "react";
import styles from "./Style.module.css";
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import data from './mockData.json';
import {Typography} from "@mui/material";
import avatar from '../../../../assets/Assets/avatar 1.png';
import avatar1 from '../../../../assets/Assets/avatar 2.png';
import avatar2 from '../../../../assets/Assets/avatar 3.png';
import calender from '../../../../assets/Assets/ic_calendar.png';
import menu from '../../../../assets/Assets/ic_kebab_menu.png';
import StatusPill from "../../../../components/Status/StatusPill.component";

const EventCard =()=> {
  const { Data } = data;
  return(
    <>
    {Data.map((item, index) => (
     
      <ShadowBox className={styles.meetingSchedule}>
        <span className={styles.title}>
<Typography variant={'h4'} color={'text.secondary'} 
            >
              {item.title}
              </Typography>
              {/* <img src={menu} className={styles.menu} alt="Image"/> */}
              </span>
              <div className={styles.members}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
              <img src={avatar} alt="Image" style={{ marginRight: '10px' }} />
              <div>
              <Typography variant={'h5'} color={'text.secondary'}>{item.subtitle}</Typography>
              <span style={{ display: 'flex', alignItems: 'center' }}>
              <img src={calender} alt="Image"/>
              <Typography variant={'body2'} color={'text.secondary'} sx={{ml: 1}}>{item.Date}</Typography>
              
              </span>
               </div>
             
               </div>

               <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <img src={avatar1} alt="Image" style={{ marginRight: '10px' }} />
              <div>
              <Typography variant={'h5'} color={'text.secondary'}>{item.subtitle2}</Typography>
              <span className={styles.date}>
              <img src={calender} alt="Image"/>
              <Typography variant={'body2'} color={'text.secondary'} sx={{ml: 1}}>{item.Date}</Typography>
               {/* <div className={styles.status}><StatusPill status={'Payment'} color={'low'} />
               </div> */}
              </span>
               </div>
               </div>

               <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <img src={avatar2} alt="Image" style={{ marginRight: '10px' }} />
              <div>
              <Typography variant={'h5'} color={'text.secondary'}>{item.subtitle3}</Typography>
              <span className={styles.date}>
              <img src={calender} alt="Image"/>
              <Typography variant={'body2'} color={'text.secondary'} sx={{ml: 1}}>{item.Date}</Typography>
              </span>
               </div>
               </div>

               <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <img src={avatar} alt="Image" style={{ marginRight: '10px' }} />
              <div>
              <Typography variant={'h5'} color={'text.secondary'}>{item.subtitle}</Typography>
              <span className={styles.date}>
              <img src={calender} alt="Image"/>
              <Typography variant={'body2'} color={'text.secondary'} sx={{ml: 1}}>{item.Date}</Typography>
              </span>
               </div>
               </div>

               <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <img src={avatar1} alt="Image" style={{ marginRight: '10px' }} />
              <div>
              <Typography variant={'h5'} color={'text.secondary'}>{item.subtitle2}</Typography>
              <span className={styles.date}>
              <img src={calender} alt="Image"/>
              <Typography variant={'body2'} color={'text.secondary'} sx={{ml: 1}}>{item.Date}</Typography>
              </span>
               </div>
               </div>
               </div> 
</ShadowBox>

))}
    </>
  )

}

export default EventCard;
