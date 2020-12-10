import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {MobileTheme} from '../../lib/Themes/Mobile';
import {StyledGreenButton} from '../../lib/Themes/StyledComponents';
import styled from 'styled-components';

import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useSelector } from 'react-redux';
import { loadSavedLocalCart } from '../../utils/localCart';

const StyledApply = styled(StyledGreenButton)`
  margin: 0px;
  margin-left: 3%;
  text-transform: uppercase;
`

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formLabel: {
    color: 'rgba(0,0,0,0.5)!important',
    marginBottom: '10px',
  }
}));

const PromoInput = withStyles({
  root: {
    border: '1px solid #A9A9A9',
    padding: '3px 10px',
    fontSize: '12px',
    width: '100%',
    maxWidth: '380px'
  }
})(InputBase)

const RadioButtonsGroup = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState('priority');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset" className={classes.formControl}>
      <FormLabel component="legend" className={classes.formLabel}>FedEx</FormLabel>
      <RadioGroup aria-label="fedex" name="fedex" value={value} onChange={handleChange}>
        <FormHelperText>Fedex Priority Saturday Delivery</FormHelperText>
        <FormControlLabel value="priority" control={<Radio />} label="Saturday Delivery $30.00"/>

        <FormHelperText>Before 5pm</FormHelperText>
        <FormControlLabel value="local" control={<Radio />} label="Local Delivery $15.00" />

        <FormHelperText htmlFor="priority">(In Store Pickup Not Available)</FormHelperText>
        <FormControlLabel value="other" control={<Radio />} label="Curbside Pickup $0.00" />
      </RadioGroup>
    </FormControl>
  );
}

const Select = ({label}) => {
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });
  const classes = useStyles();
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink htmlFor={label}>{label}</InputLabel>
        <NativeSelect
          value={state.age}
          onChange={handleChange}
          inputProps={{
            name: `${label}`,
            id: `${label}`,
          }}
        >
          <option value="">None</option>
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
      </FormControl>
  )
}

const ExpansionPanel = withStyles({
  root: {
    padding: '0% 3%',
    boxShadow: 'none',
    background: '#F5F5F5',
    color: MobileTheme.primaryColorV1,
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    // marginBottom: -1,
    '&:not(:last-child)': {
      borderBottom: '1px solid',
      borderColor: MobileTheme.primaryColorV3,
    },
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    }
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const WithoutBorder = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    }
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary)

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

export default function CustomizedExpansionPanels() {
  const [expanded, setExpanded] = React.useState('panel1');
  const [localCart, setLocalCart] = React.useState({
    cartLineItems: [],
    totalCartPrice: 0,
    totalCartQuantity: 0
  })

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const {customerDto} = useSelector(state => state.checkoutReducer.userData)
  const totalCartPrice = useSelector(state => state.cartReducer.cart.totalCartPrice);
  const loadLocalCartStore = useSelector(state => state.cartReducer.loadLocalCart);

  React.useEffect(() => {
    const savedLocalCart = loadSavedLocalCart()
    setLocalCart(savedLocalCart)
  },[loadLocalCartStore])

  return (
    <div>
      <ExpansionPanel square>
        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
          <h2>Summary</h2>
        </ExpansionPanelSummary>
      </ExpansionPanel>
      {/* <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <ExpansionPanelSummary 
        expandIcon={<ExpandMoreIcon style={{fill: MobileTheme.primaryColor}}/>}
        aria-controls="panel2d-content" 
        id="panel2d-header">
          <h4>Estimated Shipping and Tax</h4>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div css={` width: 100%;`}>
            <Select label="Country"/>
            <Select label="State/Province"/>
            <TextField 
              label="Zip/Postal Code" 
              id="zip-postal" 
              fullWidth
              style={{ margin: 8 }}
              InputLabelProps={{
                shrink: true,
              }} />
              <RadioButtonsGroup />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel> */}
      <ExpansionPanel square>
        <ExpansionPanelSummary aria-controls="panel3d-content" id="panel3d-header">
          <div css={`width: 100%; display: flex; justify-content: space-between;`}>
            <p>Subtotal</p>
            <p>$ {customerDto ? totalCartPrice : localCart.totalCartPrice}</p>
          </div>
        </ExpansionPanelSummary>
      </ExpansionPanel>
      <ExpansionPanel square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <ExpansionPanelSummary 
        expandIcon={<ExpandMoreIcon style={{fill: MobileTheme.primaryColor}}/>}
        aria-controls="panel4d-content" 
        id="panel4d-header">
          <h4>Apply Discount</h4>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div css={`width: 100%; display: flex;`}>
            <PromoInput type="text" placeholder="Enter code" variant="outlined"/>
            <StyledApply>Apply</StyledApply>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel square>
        <WithoutBorder aria-controls="panel3d-content" id="panel3d-header">
          <div css={`width: 100%; display: flex; justify-content: space-between;`}>
            <h3>Order Total</h3>
            <h3>$ {customerDto ? totalCartPrice : localCart.totalCartPrice}</h3>
          </div>
        </WithoutBorder>
      </ExpansionPanel>
    </div>
  );
}
