import React from "react";
import Grid from "@material-ui/core/Grid";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import EmailIcon from "@material-ui/icons/Email";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { CONTENT_WIDTH } from "../../lib/Themes/Mobile";

const data = {
  footerLinks: [
    {
      title: "Shopping Guide",
      options: [
        "Blog",
        "FAQs",
        "Payment",
        "Shipment",
        "Where is my order?",
        "Return Policy",
      ],
    },
    {
      title: "Style Advisor",
      options: [
        "Your Account",
        "Information",
        "Addresses",
        "Discount",
        "Order History",
        "Order Tracting",
      ],
    },
    {
      title: "Information",
      options: [
        "Site Map",
        "Search Terms",
        "Advanced Search",
        "About Us",
        "Contact Us",
        "Suppliers",
      ],
    },
  ],
};
export default () => {
  return (
    <Grid container justify="center" className="footer-container">
      <Grid item xs={CONTENT_WIDTH.FOOTER_CONTENT_WIDTH_XS}>
        <div className="footer">
          <div className="logo-container">
            <img
              alt="logo"
              src="https://neocellularparts.com/pub/media/logo/stores/1/neo_logo_nu_website.png"
              className="logo-footer"
            />
          </div>
          <div className="detailsContainer">
            <div className="links-container">
              {data.footerLinks.map((footerLink, index) => {
                return (
                  <ul key={index} className="footerLink-container">
                    <div className="footerLink-name">{footerLink.title}</div>
                    {footerLink.options.map((option, index) => {
                      return (
                        <li key={index} className="footerLink-item">
                          {option}
                        </li>
                      );
                    })}
                  </ul>
                );
              })}
              <ul className="footerLink-container">
                <div className="footerLink-name">Contact us</div>
                <li className="footerLink-item-contact">
                  <div>
                    <LocationCityIcon className="footerLink-item-icon" />
                  </div>
                  <div className="footerLink-item-text">
                    ThemesGround, 789 Main rd,
                    <br />
                    Anytown, CA 12345 USA
                  </div>
                </li>
                <li className="footerLink-item-contact">
                  <div>
                    <CallOutlinedIcon className="footerLink-item-icon" />
                  </div>
                  <div className="footerLink-item-text">+ 888 456-7890</div>
                </li>
                <li className="footerLink-item-contact">
                  <div>
                    <EmailIcon className="footerLink-item-icon" />
                  </div>
                  <div className="footerLink-item-text">
                    Qualis@themesground.com
                  </div>
                </li>
              </ul>
            </div>
            <div className="social-container">
              <div className="social">
                <FacebookIcon className="social-footer-icon" />
                <InstagramIcon className="social-footer-icon" />
                <TwitterIcon className="social-footer-icon" />
                <YouTubeIcon className="social-footer-icon" />
              </div>
              <div className="copyright">&copy; 2018. All rights reserved.</div>
              <div className="we-accept">
                <img
                  alt="card"
                  className="we-accept-img"
                  src="http://themesground.com/qmart-demo/V1/images/payment-1.png"
                />
                <img
                  alt="card"
                  className="we-accept-img"
                  src="http://themesground.com/qmart-demo/V1/images/payment-2.png"
                />
                <img
                  alt="card"
                  className="we-accept-img"
                  src="http://themesground.com/qmart-demo/V1/images/payment-3.png"
                />
                <img
                  alt="card"
                  className="we-accept-img"
                  src="http://themesground.com/qmart-demo/V1/images/payment-4.png"
                />
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};
