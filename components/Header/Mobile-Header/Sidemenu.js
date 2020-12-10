import React from 'react';
import styled from 'styled-components';
import {Dropdown} from './Dropdown';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      css={`
        max-height: 100%;
        overflow: auto;
      `}
    >
      {value === index && (
        <div p={3}>
          {children}
        </div>
      )}
    </div>
  );
}

const StyledSidemenu = styled.div`
  box-shadow: 0 0 10px #000;
  display: ${props => props.showSidemenu ? 'flex' : 'none'};
  flex-direction: column;
  position: fixed;
  background: ${props => props.theme.sidemenuBackground};
  width: 90vw;
  z-index: 3;
  height: ${props => props.top ? '100%' : 'calc(100% - 56px)'};
  padding-top: ${props => props.top ? '56px' : '0px'};
  bottom: ${props => props.top ? 'unset' : '56px'};
  left: 0;
  color: ${props => props.theme.sidemenuColor};
  svg {
    font-size: ${props => props.svgSize ? props.svgSize : '65px'};
  }
  div.topContent {
    align-items: center;
    display: flex;
  }
  span.authSpan {
    font-size: ${props => props.welcomeSpanSize ? props.welcomeSpanSize : props.theme.span};
  }
  span.welcomeSpan {
    color: ${props => props.theme.secondaryColor};
    font-size: ${props => props.welcomeSpanSize ? props.welcomeSpanSize : props.theme.p};
  }

  span.welcomeSpan, 
  span.authSpan {
    text-transform: uppercase;
  }
`

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const Sidemenu = (props) => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function renderChildren(data) {
    return data.map((mainMenuItem, index) => {
      return (
        <li  key={index}>
          <Dropdown primary={true} mainMenuItem={mainMenuItem}/>
        </li>
      )
    })
  }

  const {svgSize = null} = props;
  return (
    <StyledSidemenu top={props.top} svgSize={svgSize} showSidemenu={props.showSidemenu}>
      <div className="topContent">
        <AccountCircle />
        <div className="topContent-text">
          <span className="welcomeSpan">Welcome</span><br/><span className="authSpan">Login Or Register</span>
        </div>
      </div>
      <AppBar position="static" css={`background-color: ${props => props.theme.sidemenuTabsBackground}!important;
        color: ${props => props.theme.sidemenuTabsColor}!important;`}>
        <Tabs value={value} onChange={handleChange} centered aria-label="simple tabs example">
          <Tab label="Menu" {...a11yProps(0)}/>
          <Tab label="Account" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ul css={`list-style: none;`}>
          {renderChildren(props.menuItems)}
        </ul>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </StyledSidemenu>
  )
}

export default Sidemenu;