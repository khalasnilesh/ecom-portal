import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StyledAlert = withStyles({
  root: {
    maxWidth: '50%'
  }
})(Alert)

const StyledAppBar = withStyles({
  root: {
    background: '#fff',
    boxShadow: 'none',
    color: '#000',
    fontWeight: 'bold'
  }
})(AppBar)

const StyledTabs = withStyles({
  root: {
    borderBottom: '1px solid #A9A9A9',
  },
  indicator: {
    backgroundColor: '#000',
    height: '3px'
  },
})(Tabs);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SimpleTabs(props) {
  const [value, setValue] = React.useState(0);

  const {productFullDescription} = props

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <StyledAppBar position="static">
        <StyledTabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Product description" {...a11yProps(0)} />
          {/* <Tab label="Reviews" {...a11yProps(1)} /> */}
        </StyledTabs>
      </StyledAppBar>
      <TabPanel value={value} index={0}>
      <div dangerouslySetInnerHTML={{
          __html: productFullDescription
      }} />
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
        <StyledAlert severity="warning">
          Only registered users can write reviews. Please 
          <span css={`color: ${props => props.theme.secondaryColor}`}> Sign in </span> 
          or <span css={`color: ${props => props.theme.secondaryColor}`}>create an account</span></StyledAlert>
      </TabPanel> */}
    </div>
  );
}
