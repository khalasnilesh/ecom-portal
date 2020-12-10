import React from "react";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import Hidden from "@material-ui/core/Hidden";
import { CONTENT_WIDTH } from "../../../lib/Themes/Mobile";
import Searchbox from "./Searchbox";
import { QuickOrderIcon, CallOutlinedIcon, ChatIcon } from "../../../lib/Themes/icons";

const mockProps = {
  logo: {
    url:
      "https://neocellularparts.com/pub/media/logo/stores/1/neo_logo_nu_website.png",
    width: "160px",
    height: "90px",
  },
  searchBar: <Searchbox borderRadius="4px" />,
  options: [
    {
      id: 2,
      icon: <QuickOrderIcon className="brandSearchRight-item-icon" />,
      text: "Quick order",
      link: "/order",
      separator: true,
    },
    {
      id: 2,
      icon: <CallOutlinedIcon className="brandSearchRight-item-icon" />,
      text: "Have Questions? \n (470) 269-5465",
      link: "/order",
      separator: true,
    },
    {
      id: 3,
      icon: <ChatIcon className="brandSearchRight-item-icon" />,
      text: "Chat with us? \n For Instance Solution",
      link: "/order",
      separator: true,
    },
  ],
};

export default (props) => {
  const { logo = "", searchBar = null, options = [] } =
    props.brandSearchOptions || mockProps;

  return (
    <Hidden xsDown>
      <Grid container justify="center">
        <Grid item xs={12} css={`background: ${props => props.theme.brandSearchBackground};`}>
          <Grid container justify="center">
            <Grid
              item
              sm={CONTENT_WIDTH.HEADER_CONTENT_WIDTH_SM}
              md={CONTENT_WIDTH.HEADER_CONTENT_WIDTH_MD}
            >
              <div
                css={`
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 5px 0;
                  color: ${props => props.theme.brandSearchColor};
                  .desk-logo {
                    width: ${(props) =>
                      props.logo ? props.logo.width : mockProps.logo.width};
                    object-fit: contain;
                    height: ${(props) =>
                      props.logo ? props.logo.height : mockProps.logo.height};
                  }
                  .brandSearchRight-container {
                    display: flex;
                    width: 45%;
                    max-width: 600px;
                    align-items: center;
                    justify-content: space-between;
                  }
                  .brandSearchRight-item {
                    align-items: center;
                    cursor: pointer;
                    display: flex;
                    white-space: pre-wrap;
                    font-size: ${(props) => props.theme.span};
                    margin-right: 10px;
                    &:hover {
                      color: ${(props) => props.theme.linkHoverColor};
                      svg.brandSearchRight-item-icon {
                        & path {
                        fill: ${props => props.theme.secondaryColor};
                      }
                      }
                    }
                    .brandSearchRight-item-icon {
                      margin-right: 10px;
                      font-size: ${(props) => props.theme.h1};
                      & path {
                        fill: ${props => props.theme.brandSearchColor};
                      }
                    }
                  }
                `}
                className="brandSearch-desk"
              >
                {logo ? (
                  <Link href="/">
                    <a>
                      <img className="desk-logo" alt="logo" src='/logo.jpg' />
                    </a>
                  </Link>
                ) : null}
                {searchBar && searchBar}
                {options && options.length !== 0 ? (
                  <div className="brandSearchRight-container">
                    {options.map((option, index) => {
                      if (option.component !== undefined || null) {
                        return (
                          <>
                          <div
                            key={index}
                            className="brandSearchRight-item"
                            // style={{
                            //   borderRight:
                            //     index === options.length - 1 ||
                            //     !option.separator
                            //       ? "none"
                            //       : "1px solid #A9A9A9",
                            //   marginRight:
                            //     index === options.length - 1 ? "none" : "10px",
                            //   paddingRight:
                            //     index === options.length - 1 ? "none" : "10px",
                            // }}
                          >
                            {option.component}
                          </div>
                          {index === options.length -1 ? null : 
                          <div css={`width: 1px; background: ${props => props.theme.brandSearchColor}; height: 38px; 
                    margin-right: 10px;`}></div>}
                          </>
                        );
                      } else {
                        return (
                          <>
                          <div
                            key={index}
                            className="brandSearchRight-item"
                            // style={{
                            //   borderRight:
                            //     index === options.length - 1 ||
                            //     !option.separator
                            //       ? "none"
                            //       : "1px solid #A9A9A9",
                            //   marginRight:
                            //     index === options.length - 1 ? "none" : "10px",
                            //   paddingRight:
                            //     index === options.length - 1 ? "none" : "10px",
                            // }}
                          >
                            {option.icon && option.icon !== null
                              ? option.icon
                              : null}
                            {option.text ? (
                              <div className="brandSearchRight-item-text">
                                {option.text}
                              </div>
                            ) : null}
                          </div>
                          {index === options.length -1 ? null : 
                          <div css={`width: 1px; background: ${props => props.theme.brandSearchColor}; height: 38px; 
                    margin-right: 10px;`}></div>}
                          </>
                        );
                      }
                    })}
                  </div>
                ) : null}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Hidden>
  );
};
