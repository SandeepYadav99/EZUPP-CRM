import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Paper,
  Button,
  ButtonBase,
} from '@mui/material';

import styles from "./Style.module.css";
import data from './data';
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import {PrimaryButton} from "../../../../components/Buttons/PrimaryButton";
const TopRow = () => {
  
 // const { Data } = data;
  return (
    <>
        <div className={styles.div1}> 
        {data.Data.map((item, index) => (
          <>
          <div className={styles.congratulation}  >
           <ShadowBox style={{height:"98%"}}>
            <Typography variant={'h4'} color={'text.primary'} 
            >
              {item.title}
              </Typography>
            <Typography variant={'body2'} color={'text.secondary'}>
            {item.subtitle}
            </Typography> 
            <div className={styles.spacer} />
            <Typography variant={'h3'} color={'secondary'}>{item.amount}</Typography>
            <Typography variant={'body2'} color={'text.secondary'} >
             
              {item.progress}
            </Typography>
          
            <div className={styles.buttonAndImageContainer} >
              <PrimaryButton size={'small'} className={styles.primary} >{item.buttonText}</PrimaryButton>
              <img src={item.image1} className={styles.image} />
             
          </div>
          </ShadowBox>  
          {/* <div>
            <img src={trophy} className={styles.image} />
            </div> */}
            </div>
            
          
          <div className={`${styles.sales} `} >
          
          <ShadowBox style={{height:"98%"}}>
              <Typography variant={'h4'} color={'text.primary'} sx={{mb: 1.5}}>{item.titleSales}</Typography>
              
              <Typography variant={'h3'} color={'secondary'}>{item.totalSales}</Typography>
              <span style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant={'body2'} color={'text.secondary'}>{item.totalSalesSubtitle}
               
              </Typography>
              <Typography variant={'body2'} color={'#72D113'} style={{ marginLeft: '5px' }}>{item.totalRate}</Typography>
              </span>
            <div className={styles.newCustomer}>
              <div className={styles.iconCont}>
              <img src={item.image2} className="customerImg" alt="Query Image" />
                <div className={styles.customerDiv2}>
                
                  <Typography variant={'h3'} color={'text.primary'}>
                    {item.newCustomers}{" "}
                  </Typography>

                  <Typography variant={'body2'} color={'text.secondary'}>
                    {item.newCustomersSubtitle}
                  </Typography>
                </div>
              </div>
              <div className={styles.iconCont}>
              <img src={item.image3} className="customerImg" alt="Query Image" />
                <div className={styles.customerDiv2}>
                  <Typography variant={'h3'} color={'text.primary'}>
                    {item.totalProfit}{" "}
                  </Typography>

                  <Typography variant={'body2'} color={'text.secondary'}>
                    {item.totalProfitSubtitle}{" "}
                  </Typography>
                </div>
              </div>
              <div className={styles.iconCont}>
              <img src={item.image4} className="customerImg" alt="Query Image" />
                <div className={styles.customerDiv2}>
                  <Typography variant={'h3'} color={'text.primary'}>
                    {item.newTransactions}{" "}
                  </Typography>

                  <Typography variant={'body2'} color={'text.secondary'}>
                   {item.newTransactionsSubtitle}{" "}
                  </Typography>
                </div>
              </div>
            </div>
            </ShadowBox>
          </div>


          <div className={styles.quick} >
          <ShadowBox style={{height:"98%"}}>
            <Typography variant={'h4'} color={'text.primary'}>
             {item.titleQuick}
            </Typography>
            <div className={styles.line} style={{ width: '100%', margin: '10px auto' }}/>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={item.image5} alt="Image" style={{ marginRight: '10px' }} />
            <div>
            <Typography variant={'subtitle1'} color={'text.primary'}>
                    {item.titleContact}
                  </Typography>
            <Typography variant={'body2'} color={'text.secondary'}>
                   {item.ContactSub}
            </Typography>
            </div>
            </div>
            <div className={styles.line} style={{ marginBottom: '15px', marginTop: '10px'}}/>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={item.image6} alt="Image" style={{ marginRight: '10px' }} />
            <div>
            <Typography variant={'subtitle1'} color={'text.primary'}>
                    {item.titleQuery}
                  </Typography>
            <Typography variant={'body2'} color={'text.secondary'}>
                   {item.QuerySub}
            </Typography>
            </div>
            </div>
            </ShadowBox>
          </div>
          </> 
           ))}
        </div>
    </>
  );
};

export default TopRow;
