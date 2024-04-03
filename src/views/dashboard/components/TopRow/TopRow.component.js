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
import data from './data.json';
import trophy from '../../../../assets/Assets/trophy.png'
import customer from '../../../../assets/Assets/ic_customer.png';
import profit from '../../../../assets/Assets/ic_profit.png';
import transaction from '../../../../assets/Assets/ic_transaction.png'
import contact from '../../../../assets/Assets/ic_add_contact.png'
import query from '../../../../assets/Assets/ic_add_query.png'
import sales from '../../../../assets/Assets/ic_sales_up.png'
import ShadowBox from "../../../../components/ShadowBox/ShadowBox";
import {PrimaryButton} from "../../../../components/Buttons/PrimaryButton";
const TopRow = () => {
  
  const { Data } = data;
  return (
    <>
        <div className={styles.div1}> 
        {Data.map((item, index) => (
          <>
          <div className={styles.congratulation}  >
           <ShadowBox style={{height:"98%"}}>
            <Typography variant={'h4'} color={'text.secondary'} 
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
              <img src={trophy} className={styles.image} />
             
          </div>
          </ShadowBox>  
          {/* <div>
            <img src={trophy} className={styles.image} />
            </div> */}
            </div>
            
          
          <div className={`${styles.sales} `} >
          
          <ShadowBox style={{height:"98%"}}>
              <Typography variant={'h4'} color={'text.secondary'} sx={{mb: 1.5}}>{item.titleSales}</Typography>
              
              <Typography variant={'h4'} color={'secondary'}>{item.totalSales}</Typography>
              <span style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant={'body2'} color={'text.secondary'}>{item.totalSalesSubtitle}
               
              </Typography>
              <Typography variant={'body2'} color={'#72D113'} style={{ marginLeft: '5px' }}>{item.totalRate}</Typography>
              </span>
            <div className={styles.newCustomer}>
              <div className={styles.iconCont}>
              <img src={customer} className="customerImg" alt="Query Image" />
                <div className={styles.customerDiv2}>
                
                  <Typography variant={'h2'} color={'text.primary'}>
                    {item.newCustomers}{" "}
                  </Typography>

                  <Typography variant={'body2'} color={'text.secondary'}>
                    {item.newCustomersSubtitle}
                  </Typography>
                </div>
              </div>
              <div className={styles.iconCont}>
              <img src={profit} className="customerImg" alt="Query Image" />
                <div className={styles.customerDiv2}>
                  <Typography variant={'h2'} color={'text.primary'}>
                    {item.totalProfit}{" "}
                  </Typography>

                  <Typography variant={'body2'} color={'text.secondary'}>
                    {item.totalProfitSubtitle}{" "}
                  </Typography>
                </div>
              </div>
              <div className={styles.iconCont}>
              <img src={transaction} className="customerImg" alt="Query Image" />
                <div className={styles.customerDiv2}>
                  <Typography variant={'h2'} color={'text.primary'}>
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
            <Typography variant={'h4'} color={'text.secondary'}>
             {item.titleQuick}
            </Typography>
            <hr className={styles.line} style={{ width: '100%', margin: '10px auto' }}/>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={contact} alt="Image" style={{ marginRight: '10px' }} />
            <div>
            <Typography variant={'subtitle1'} color={'text.primary'}>
                    {item.titleContact}
                  </Typography>
            <Typography variant={'body2'} color={'text.secondary'} >
                   {item.ContactSub}
            </Typography>
            </div>
            </div>
            <hr className={styles.line} style={{ marginBottom: '15px'}}/>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={query} alt="Image" style={{ marginRight: '10px' }} />
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
