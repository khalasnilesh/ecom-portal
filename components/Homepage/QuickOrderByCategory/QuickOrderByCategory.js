import React from "react";
import Grid from "@material-ui/core/Grid";
import style from "./style.module.scss";
import { CONTENT_WIDTH } from '../../../lib/Themes/Mobile';

const QuickOrderByCategory = () => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
    >
      <Grid item 
        xs={CONTENT_WIDTH.BODY_CONTENT_WIDTH_XS} 
        sm={CONTENT_WIDTH.BODY_CONTENT_WIDTH_SM} 
        md={CONTENT_WIDTH.BODY_CONTENT_WIDTH_MD} 
        lg={CONTENT_WIDTH.BODY_CONTENT_WIDTH_LG}
        xl={CONTENT_WIDTH.BODY_CONTENT_WIDTH_XL}
      >
        <div css={`width: 100%; margin: 0 auto; margin-top: 50px;`}>
        <Grid container justify="center">
          <Grid item xs={12} sm={10} md={12}>
            <div className={style.heading}>Quick Order By Categories</div>
          </Grid>
          <Grid item xs={6} sm={5} md={3} lg={2}>
            <div className={style.topCartItem}>
              <a href="https://neocellularparts.com/apple/iphones/am5-screens.html">
                <img
                  className={style.imgFluid}
                  src="https://neocellularparts.com/pub/media/wysiwyg/magebig/layout03/AM5-v2.jpg"
                  alt="AM5"
                />
              </a>
              <h3 className={style.title}>
                <a href="#">AM5</a>
              </h3>
            </div>
          </Grid>

          <Grid item xs={6} sm={5} md={3} lg={2}>
            <div className={style.topCartItem}>
              <a href="https://neocellularparts.com/apple/iphones/nv6-screens.html">
                <img
                  className={style.imgFluid}
                  src="https://neocellularparts.com/pub/media/wysiwyg/magebig/layout03/NV6-v2.jpg"
                  alt="NV6"
                />
              </a>
              <h3 className={style.title}>
                <a href="#">NV6</a>
              </h3>
            </div>
          </Grid>

          <Grid item xs={6} sm={5} md={3} lg={2}>
            <div className={style.topCartItem}>
              <a href="https://neocellularparts.com/apple/iphones/nv7-screens.html">
                <img
                  className={style.imgFluid}
                  src="https://neocellularparts.com/pub/media/wysiwyg/magebig/layout03/NV7-v2.jpg"
                  alt="NV7"
                />
              </a>
              <h3 className={style.title}>
                <a href="#">NV7</a>
              </h3>
            </div>
          </Grid>

          <Grid item xs={6} sm={5} md={3} lg={2}>
            <div className={style.topCartItem}>
              <a href="https://neocellularparts.com/apple/iphones/nv6-full-assembly.html">
                <img
                  className={style.imgFluid}
                  src="https://neocellularparts.com/pub/media/wysiwyg/magebig/layout03/NV6-Full-v2.jpg"
                  alt="NV6 Full Assembly"
                />
              </a>
              <h3 className={style.title}>
                <a href="#">NV6 Full Assembly</a>
              </h3>
            </div>
          </Grid>

          <Grid item xs={6} sm={5} md={3} lg={2}>
            <div className={style.topCartItem}>
              <a href="https://neocellularparts.com/apple/iphones/powerd-batteries.html">
                <img
                  className={style.imgFluid}
                  src="https://neocellularparts.com/pub/media/wysiwyg/magebig/layout03/Batteries-v2.jpg"
                  alt="powered battries"
                />
              </a>
              <h3 className={style.title}>
                <a href="#">Batteries</a>
              </h3>
            </div>
          </Grid>

          <Grid item xs={6} sm={5} md={3} lg={2}>
            <div className={style.topCartItem}>
              <a href="https://neocellularparts.com/apple/ipads/ipad-digitizers.html">
                <img
                  className={style.imgFluid}
                  src="https://neocellularparts.com/pub/media/wysiwyg/magebig/layout03/ipad-v2.jpg"
                  alt="iPad Screens"
                />
              </a>
              <h3 className={style.title}>
                <a href="#">iPad Screens</a>
              </h3>
            </div>
          </Grid>
        </Grid>
        </div>
      </Grid>
    </Grid>
  );
};

export default QuickOrderByCategory;
