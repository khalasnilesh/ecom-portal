import React, { useState, useEffect } from "react";
import styled, {keyframes} from "styled-components";
import Link from "next/link";
import { SecondaryCart } from "../../Cart/Cart";
// Material-ui components
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
// Material-ui icons
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import ContactMailOutlinedIcon from "@material-ui/icons/ContactMailOutlined";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// Custom styled components
import { CONTENT_WIDTH } from "../../../lib/Themes/Mobile";
import {
  UlWrapper,
  LiWrapper,
  ContentWrapper,
} from "../../../lib/Themes/StyledComponents";
import style from "./SecondaryMenubar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { showLogin } from "../../../store/actions/auth.action";
import Cookies from 'js-cookie';
import { motion, AnimateSharedLayout } from "framer-motion";


const slideDown = keyframes`
  80% {
    opacity: 1;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`
const MyAccountWrapper = styled.li`
  display: flex;
  height: 100%;
  align-items: center;
  padding-left: 10px;
  position: relative;
  cursor: pointer;
  z-index: 3;
  margin-right: 10px;
  font-size: ${props => props.theme.span};
  color: ${props => props.theme.secondaryMenubarColor};
  && svg {
    font-size: ${props => props.theme.span};
    margin: 0px 10px 0px 5px;
  }
  & span {
    display: none;
  }
  &:hover {
    color: ${(props) => props.theme.linkHoverColor};
    && svg {
      color: ${(props) => props.theme.linkHoverColor};
    }
    & ul {
      display: block;
    }
    & span {
      display: block;
      position: absolute; 
      width: 30px; 
      height: 30px; 
      background: ${props => props.theme.secondaryMenubarDropdownBackground};
      top: 30px;
      right: 40%;
      transform: rotate(45deg);
    }
  }
`
const MyAccountDropdownWrapper = styled.ul`
      display: none;
      box-shadow: 0px 5px 4px rgba(0,0,0,0.6);
      top: 35px;
      position: absolute;
      list-style: none;
      width: 120%;
      right: 5px;
      background: ${props => props.theme.secondaryMenubarDropdownBackground};
      z-index: 1;
`
const MyAccountDropdownListItem = styled.li`
      text-align: center;
      padding: 5px 10px;
      border-bottom: 1px solid ${props => props.theme.primaryColorV3};
      font-weight: ${props => props.companyName ? 'bold' : 'normal'};
      background: ${props => props.companyName ? 'rgba(0,0,0,0.1)' : props.theme.secondaryMenubarDropdownBackground};
      color: ${(props) => props.companyName ? props.theme.secondaryColor : props.theme.secondaryMenubarDropdownColor};
      &:hover {
        background: ${(props) => props.companyName ? 'rgba(0,0,0,0.1)' : props.theme.secondaryMenubarDropdownHoverBackground};
        color: ${(props) => props.companyName ? props.theme.secondaryColor : props.theme.linkHoverColor};
      }
`

// Renaming custom styled components
const RightContentWrapper = styled(UlWrapper)`
  margin-right: 50px;
`;
const RightContentLinks = styled(LiWrapper)`
  color: ${(props) =>
    props.fontColor ? props.fontColor : props.theme.secondaryMenubarColor};
  border-right: ${(props) =>
    props.border ? `1px solid ${props.theme.primaryColorV3}` : "none"};
  padding: ${(props) => (props.border ? "0 10px" : "0 0 0 10px")};
  && svg,
  && a {
    color: ${(props) =>
      props.fontColor ? props.fontColor : props.theme.secondaryMenubarColor};
  }
  &:hover a,
  &:hover svg {
    color: ${(props) => props.theme.linkHoverColor};
  }
  &:hover {
    color: ${(props) => props.theme.linkHoverColor};
  }
`;
const RightContentLinksDropdown = styled(UlWrapper)`
  background: ${(props) =>
    props.background
      ? props.background
      : props.theme.secondaryMenubarDropdownBackground};
  z-index: 5;
`;
const RightContentLinksDropdownItem = styled(LiWrapper)`
  && svg,
  && a {
    color: ${(props) =>
      props.color ? props.color : props.theme.secondaryMenubarDropdownColor};
  }
  &:hover {
    background: ${(props) =>
      props.hoverBackground
        ? props.hoverBackground
        : props.theme.secondaryMenubarDropdownHoverBackground};
  }
  &:hover a,
  &:hover svg {
    color: ${(props) => props.theme.linkHoverColor};
  }
`;
const LeftContentWrapper = styled(ContentWrapper)`
  flex-direction: ${(props) =>
    props.iconLocation === "end" ? "row-reverse" : "row"};
  color: ${(props) =>
    props.fontColor ? props.fontColor : props.theme.secondaryMenubarColor};
    /* animation: ${slideDown} 6s linear infinite alternate; */
`;
// Mock data if props isn't there
const mockData = {
  className: style.background,
  leftContent: {
    text: ["Your #1 Choice for Mods, Juice, Accessories",
    "This is to let you know that this is working",
    "Best place to buy products related to mobile"],
    // icon: <CallOutlinedIcon />,
    // iconLocation: "start",
    className: style.leftContent, //or end
  },
  rightOptions: {
    className: style.rightContent,
    options: [
      {
        id: "track-order",
        type: "link",
        name: "Track Your Order",
        link: "/thankyou",
        icon: <LocationOnOutlinedIcon className={style.optionIcon} />,
      },
      {
        id: "contact-us",
        type: "link",
        link: "/contactus",
        name: "Contact Us",
        icon: <CallOutlinedIcon className={style.optionIcon} />,
        options: [],
      },
      {
        id: "register",
        type: "link",
        link: "/register",
        name: "Register",
        icon: <PersonAddOutlinedIcon className={style.optionIcon} />,
        options: [],
      }
    ],
  },
};

const SecondaryMenubar = (props) => {
  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const {customerDto} = useSelector(state => state.checkoutReducer.userData)
  useEffect(() => {
    if(customerDto) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  },[customerDto])
  /**
   * @param background
   * This will change the background of the menubar. Default is transparent
   * @param leftContent
   * Object for left side data - keys - text icon iconLocation
   */
  const { leftContent = {}, rightOptions = [], className = "" } =
    props.secondaryMenuOptions || mockData;

    const handleLogoutClick = () => {
      localStorage.clear()
      Object.keys(Cookies.get()).forEach(function(cookieName) {
        var neededAttributes = {
          // Here you pass the same attributes that were used when the cookie was created
          // and are required when removing the cookie
        };
        Cookies.remove(cookieName, neededAttributes);
      });
      window.location.href = '/'
    }

    useEffect(() => {
      const timer = setTimeout(() => {
      if (currentTextIndex + 1 === leftContent.text.length) {
        setCurrentTextIndex(0)
      } else {
        setCurrentTextIndex(currentTextIndex + 1)
      }
      return () => {
        clearTimeout(timer)
      }
      }, 6000);
    }, [currentTextIndex])

    const renderText= (index) => {
      return (
        <motion.div layout initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0}} exit={{opacity: 0, y: 30}}>
                    {leftContent ? leftContent.text[index] : null}
                  </motion.div>
      )
    }

  return (
    <Hidden xsDown>
      <Grid container justify="center">
        <Grid
          item
          xs={12}
          css={`
            background: ${(props) => props.theme.secondaryMenubarBackground};
          `}
          className={className ? className : ""}
        >
          <Grid container justify="center">
            <Grid
              item
              sm={CONTENT_WIDTH.HEADER_CONTENT_WIDTH_SM}
              md={CONTENT_WIDTH.HEADER_CONTENT_WIDTH_MD}
              css={`
                display: flex;
                justify-content: space-between;
                padding: 5px 0;
                position: relative;
              `}
            >
              <Hidden smDown>
                <LeftContentWrapper
                  className={
                    leftContent.className ? leftContent.className : null
                  }
                  fontSize={leftContent.fontSize ? leftContent.fontSize : null}
                  iconLocation={
                    leftContent.iconLocation
                      ? leftContent.iconLocation
                      : "start"
                  }
                >
                  <AnimateSharedLayout exitBeforeEnter>
                  <motion.div layout initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}}>
                    <p>{leftContent && leftContent.text[currentTextIndex]}</p>
                  </motion.div>
                  </AnimateSharedLayout>
                </LeftContentWrapper>
              </Hidden>
              <RightContentWrapper>
              {isLoggedIn ? 
              <RightContentLinks css={`font-size: 14px;`} border={true} onClick={() => handleLogoutClick()}>
                <LockOutlinedIcon className={style.optionIcon} />Logout
              </RightContentLinks>
              : 
              <RightContentLinks css={`font-size: 14px;`} border={true} onClick={() => dispatch(showLogin(true))}>
                <LockOutlinedIcon className={style.optionIcon} />Login
              </RightContentLinks>}
                {rightOptions
                  ? rightOptions.options.map((item, index) => {
                      return (
                        <RightContentLinks
                          border={true
                            // index === rightOptions.options.length - 1
                            //   ? false
                            //   : true
                          }
                          secondary
                          className={
                            rightOptions.className
                              ? `secondaryMenubar-option ${rightOptions.className}`
                              : "secondaryMenubar-option"
                          }
                          position="relative"
                          key={item.id}
                        >
                          {item.icon ? item.icon : null}
                          <Link href={item.link ? item.link : "/"}>
                            <a>{item.name}</a>
                          </Link>
                          {item.subMenus && item.subMenus.options.length > 0 ? (
                            <ArrowDropDownOutlinedIcon className="option-icon" />
                          ) : null}
                          {item.subMenus && item.subMenus.options.length > 0 ? (
                            <RightContentLinksDropdown
                              boxShadow="0 0 5px #A9A9A9"
                              display="none"
                              position="absolute"
                              whiteSpace="nowrap"
                              top="20px"
                              left="-10px"
                              borderRadius="4px"
                              zIndex="4"
                              className="dropdown"
                            >
                              {item.subMenus.options.map((item2, index) => {
                                return (
                                  <RightContentLinksDropdownItem
                                    className={
                                      item.subMenus !== null
                                        ? `${item.subMenus.className}`
                                        : null
                                    }
                                    padding="10px"
                                    key={index}
                                  >
                                    {item2.icon ? (
                                      <span>{item2.icon}</span>
                                    ) : null}
                                    <Link href={item2.link ? item2.link : "/"}>
                                      <a>{item2.name}</a>
                                    </Link>
                                  </RightContentLinksDropdownItem>
                                );
                              })}
                            </RightContentLinksDropdown>
                          ) : null}
                        </RightContentLinks>
                      );
                    })
                  : null}
                  <MyAccountWrapper
                    onClick={() => {
                      if(!isLoggedIn) {
                        dispatch(showLogin(true))
                      } else {
                        return
                      }
                    }}>
                    <ContactMailOutlinedIcon className={style.optionIcon}/>
                    {isLoggedIn ? `Hello! ${customerDto.name}` : 'My Account'}
                    {isLoggedIn && <ArrowDropDownOutlinedIcon className={style.optionIcon} />}
                    {
                      isLoggedIn && 
                      <>
                      <MyAccountDropdownWrapper>
                        <MyAccountDropdownListItem companyName>{customerDto.company || 'Company'}</MyAccountDropdownListItem>
                        <MyAccountDropdownListItem>My Dashboard</MyAccountDropdownListItem>
                        <MyAccountDropdownListItem>My Orders</MyAccountDropdownListItem>
                        <MyAccountDropdownListItem>Returns/RMA</MyAccountDropdownListItem>
                        <MyAccountDropdownListItem>My Credit</MyAccountDropdownListItem>
                        <MyAccountDropdownListItem onClick={() => handleLogoutClick()}>Logout</MyAccountDropdownListItem>
                      </MyAccountDropdownWrapper>
                      <span></span>
                      </>
                    }
                  </MyAccountWrapper>
                <SecondaryCart />
              </RightContentWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Hidden>
  );
};
export default SecondaryMenubar;
