import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Paper,
  Button,
  ButtonBase,
} from "@material-ui/core";

import styles from "./Style.module.css";

const TopRow = () => {
//   const dispatch = useDispatch();
//   const { dashboard } = useSelector((state) => state?.dashboard);

//   useEffect(() => {
//     dispatch(actionGetDashboard());
//   }, []);

  return (
    <>
        <div className={styles.div1}>
          <div className={styles.congratulation} id={styles.card}>
            <span
              style={{  fontWeight: "700", fontSize: "22px" }}
            >
              Congratulations Shivay!
            </span>
            <span style={{  fontSize: "14px" }}>
              Best Seller of the Month
            </span>
            <span style={{ color: "#25CEAE", fontSize: "24px" }}>$42.8k</span>
            <span style={{  fontSize: "14px" }}>
              {" "}
              78% of target 🚀
            </span>
            <div>
              <ButtonBase className={styles.login}>View Sales</ButtonBase>
            </div>
          </div>
          <div className={styles.sales} id={styles.card}>
            <span
              style={{  fontWeight: "700", fontSize: "18px" }}
            >
              Sales Overview
            </span>
            <span style={{ color: "#25CEAE", fontSize: "24px" }}> 42.5k </span>
            <span style={{  fontSize: "14px" }}>
              Total Sales
            </span>
            <div className={styles.newCustomer}>
              <div className={styles.iconCont}>
                <div className={styles.coloredDiv1}></div>
                <div className={styles.customerDiv2}>
                  <span style={{  fontSize: "20px" }}>
                    8,458{" "}
                  </span>

                  <span style={{  fontSize: "10px" }}>
                    New Customers
                  </span>
                </div>
              </div>
              <div className={styles.iconCont}>
                <div className={styles.coloredDiv1}></div>
                <div className={styles.customerDiv2}>
                  <span style={{  fontSize: "20px" }}>
                    $28.5k{" "}
                  </span>

                  <span style={{  fontSize: "10px" }}>
                    Total Profit{" "}
                  </span>
                </div>
              </div>
              <div className={styles.iconCont}>
                <div className={styles.coloredDiv1}></div>
                <div className={styles.customerDiv2}>
                  <span style={{ fontSize: "20px" }}>
                    2,450k{" "}
                  </span>

                  <span style={{ fontSize: "10px" }}>
                    New Transactions{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.quick} id={styles.card}>
            <span
              style={{ fontWeight: "700", fontSize: "18px" }}
            >
              Quick Action
            </span>
            <div>
              <ButtonBase className={styles.login}>+ CONTACT</ButtonBase>
            </div>
            <div>
              <ButtonBase className={styles.logingreen}>+ QUERY</ButtonBase>
            </div>
          </div>
        </div>
    </>
  );
};

export default TopRow;