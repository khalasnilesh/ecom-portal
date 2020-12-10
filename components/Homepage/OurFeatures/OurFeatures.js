import React from "react";
import Grid from "@material-ui/core/Grid";
import CachedIcon from "@material-ui/icons/Cached";
import PaymentOutlinedIcon from "@material-ui/icons/PaymentOutlined";
import QuestionAnswerOutlinedIcon from "@material-ui/icons/QuestionAnswerOutlined";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import style from "./ourFeatures.module.scss";
import { CONTENT_WIDTH } from '../../../lib/Themes/Mobile';

const OurFeatures = () => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={style.mainContainer}
    >
      <Grid item 
        xs={CONTENT_WIDTH.BODY_CONTENT_WIDTH_XS} 
        sm={CONTENT_WIDTH.BODY_CONTENT_WIDTH_SM} 
        md={CONTENT_WIDTH.BODY_CONTENT_WIDTH_MD} 
        lg={CONTENT_WIDTH.BODY_CONTENT_WIDTH_LG}
        xl={CONTENT_WIDTH.BODY_CONTENT_WIDTH_XL}>
        <Grid container justify="center">
        <Grid item xs={6} sm={3} md={3} className={style.borderRight}>
          <div className={style.features}>
            <LocalShippingOutlinedIcon
              className={style.icon}
            ></LocalShippingOutlinedIcon>
            <div>
              <h3>Fast Delivery</h3>
              <p>For all Orders</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={6} sm={3} md={3} className={style.borderRight}>
          <div className={style.features}>
            <CachedIcon className={style.icon}></CachedIcon>
            <div>
              <h3>Life Time Warranty</h3>
              <p>IF goods have any problems</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={6} sm={3} md={3} className={style.borderRight}>
          <div className={style.features}>
            <PaymentOutlinedIcon className={style.icon}></PaymentOutlinedIcon>
            <div>
              <h3>Secure Payment</h3>
              <p>100% secure payment</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={6} sm={3} md={3} className={style.borderRight}>
          <div className={style.features}>
            <QuestionAnswerOutlinedIcon
              className={style.icon}
            ></QuestionAnswerOutlinedIcon>
            <div>
              <h3>24/7 Support</h3>
              <p>Dedicated support</p>
            </div>
          </div>
        </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OurFeatures;
