import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { CONTENT_WIDTH } from "../../../lib/Themes/Mobile";

const Banner = (props) => {
  const [state, setState] = useState({});

  const { content, container } = props;

  useEffect(() => {
    var countDownDate = Date.now() + 1000 * 60 * 60 * 2;
    let Timer = () => {
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      return {
        days,
        hours,
        minutes,
        seconds,
      };
    };
    setInterval(() => {
      setState(Timer());
    }, 1000);

    return () => {
      if (state) {
        clearInterval(state);
      }
    };
  }, []);

  return (
    <Hidden xsDown>
      <Grid container justify="center">
        <Grid item xs={12}>
          <div
            css={`
              display: flex;
              background: ${props => props.theme.secondaryColor};
              color: ${(props) => props.theme.primaryOnColor};
              padding: 5px 0;
              font-size: ${(props) => props.theme.span}
                ${container && container.styles ? container.styles : null};
            `}
          >
            <Grid container justify="center">
              <Grid
                item
                sm={CONTENT_WIDTH.HEADER_CONTENT_WIDTH_SM}
                md={CONTENT_WIDTH.HEADER_CONTENT_WIDTH_MD}
                lg={CONTENT_WIDTH.HEADER_CONTENT_WIDTH_LG}
                xl={CONTENT_WIDTH.HEADER_CONTENT_WIDTH_XL}
                css={`
                  display: flex;
                `}
              >
                <img
                  id="logo"
                  src="https://neocellularparts.com/pub/media/wysiwyg/FEDEX.png"
                  alt="Logo"
                />
                <div>
                  <div className="timeDetails">
                    {state.days ? <span>{state.days} dd </span> : ""}
                    {state.hours ? <span>{state.hours} hh </span> : ""}
                    {state.minutes ? <span>{state.minutes} mm </span> : ""}
                    {state.seconds ? <span>{state.seconds} ss </span> : ""}
                  </div>
                  <div className="smallMessage">
                    {content && content.description
                      ? content.description
                      : "Time Left For FedX Overnight Cutoff"}
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Hidden>
  );
};

export default Banner;
