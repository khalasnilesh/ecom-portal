import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Cart } from "../../Cart/Cart";
import Sidemenu from "./Sidemenu";
//Material components
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import Slide from "@material-ui/core/Slide";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Searchbox from "../BrandSearch/Searchbox";
import { showLogin } from "../../../store/actions/auth.action";

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
}));

const MobileHeader = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showSidemenu, setShowSidemenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [top, setTop] = useState(false);
  const open = Boolean(anchorEl);
  const myAccountList = [
    "Blog",
    "Support",
    "My Account",
    "My Orders",
    "LCD Buyback",
  ];

  const trigger = useScrollTrigger({ disableHysteresis: true });

  function handleMenuClick(t) {
    setTop(false);
    if (t) {
      setTop(true);
    }
    setShowSidemenu(!showSidemenu);
  }

  useEffect(() => {
    const body = document.getElementsByTagName("BODY")[0];
    if (showSidemenu) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [showSidemenu]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    dispatch(showLogin(true))
    handleClose()
  }

  return (
    <Hidden smUp>
      <Grid container justify="center">
        <Sidemenu
          top={top}
          showSidemenu={showSidemenu}
          menuItems={props.menuItems}
          onSidemenuClose={handleMenuClick}
        />
        <AppBar
          position="static"
          css={`
            background-color: ${(props) =>
              props.theme.mobileHeaderTopBackground}!important;
            svg {
              color: ${(props) => props.theme.mobileHeaderIconColor};
            }
          `}
        >
          <Toolbar>
            <IconButton
              edge="start"
              aria-label="menu"
              onClick={() => handleMenuClick(true)}
            >
              {showSidemenu ? (
                <CloseIcon fontSize="large" />
              ) : (
                <MenuIcon fontSize="large" />
              )}
            </IconButton>
            <img
              alt="logo"
              width="100px"
              src="https://neocellularparts.com/pub/media/logo/stores/1/neo_logo_nu_website.png"
            />
            {true && (
              <div
                css={`
                  margin-left: auto;
                  display: flex;
                  align-items: center;
                `}
              >
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                >
                  <AccountCircle fontSize="large" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleLoginClick()}>Login</MenuItem>
                  {myAccountList.map((item, index) => {
                    return (
                      <MenuItem key={index} onClick={handleClose}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Menu>
                <Cart small />
              </div>
            )}
          </Toolbar>
        </AppBar>
        {<Searchbox width="100%" borderRadius="0px" />}
        <Slide direction="up" in={trigger} mountOnEnter unmountOnExit>
          <AppBar
            position="fixed"
            className={classes.appBar}
            css={`
              background-color: ${(props) =>
                props.theme.mobileHeaderBottomNavBackground}!important;
              svg {
                color: ${(props) => props.theme.mobileHeaderBottomIconColor};
              }
            `}
          >
            <Toolbar>
              <IconButton
                edge="start"
                aria-label="open drawer"
                onClick={() => handleMenuClick(false)}
                className={classes.grow}
              >
                {showSidemenu ? (
                  <CloseIcon fontSize="large" />
                ) : (
                  <MenuIcon fontSize="large" />
                )}
              </IconButton>
              <div className={classes.grow}>
              <div css={`width: fit-content; margin: 0 auto;`}>
                <Cart small bottom />
              </div>
              </div>
              <IconButton className={classes.grow}>
                <SearchIcon fontSize="large" />
              </IconButton>
              <IconButton
                edge="end"
                onClick={handleMenu}
                className={classes.grow}
              >
                <AccountCircle fontSize="large" />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Slide>
      </Grid>
    </Hidden>
  );
};

export default MobileHeader;
