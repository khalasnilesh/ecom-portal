import React, { useEffect } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { StyledGreenButton } from '../../../lib/Themes/StyledComponents';
import Table from '@material-ui/core/Table';
import Checkbox from '@material-ui/core/Checkbox';
import Hidden from "@material-ui/core/Hidden";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {MobileTheme} from '../../../lib/Themes/Mobile';
import { useDispatch, useSelector } from 'react-redux';
import { enqueueSnackbar } from '../../../store/actions/notification.actions';
import {Axios} from '../../../utils';
import { CircularProgress } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: "bold"
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const SubCheckbox = withStyles(() => ({
  root: {
    borderColor: '#fff',
    '&$checked': {
      color: '#000'
    }
  },
  checked: {}
}))(Checkbox)

const MainCheckbox = withStyles(() => ({
  root: {
    borderColor: MobileTheme.primaryColor,
    '&$checked': {
      color: MobileTheme.secondaryColor
    },
    '&$indeterminate': {
      color: MobileTheme.secondaryColor
    }
  },
  checked: {},
  indeterminate: {}
}))(Checkbox)

const EmailInput = withStyles({
  root: {
    border: '1px solid #A9A9A9',
    padding: '3px 10px',
    fontSize: '12px',
    width: '100%',
    maxWidth: '380px'
  }
})(InputBase)

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ContainerDiv = styled.div`
  display: flex;
  font-size: 14px;
  height: ${props => props.height ? props.height : 'auto'};
  margin: ${props => props.margin ? props.margin : '3% 0'};
  width: 100%;
  flex-direction: ${props => props.flexDirection ? props.flexDirection : 'default'};
  align-items: ${props => props.alignItems ? props.alignItems : 'default'};
  justify-content: ${props => props.justifyContent ? props.justifyContent : 'default'};
  @media only screen and (min-width: 980px) {
    margin: 1% 0%;
  }
`

const StyledSubscribe = styled(StyledGreenButton)`
  margin: 0px;
  margin-left: 1%;
  text-transform: uppercase;
  pointer-events: ${props => props.Loading || props.subscribed ? 'none' : 'auto'};
  span {
    margin: 0px 10px;
  }
`

const Outofstock = ({header, outofstockproducts, MasterProductDetails}) => {
  const classes = useStyles()
  const [selected, setSelected] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [subscribed, setSubscribed] = React.useState(false)
  const dispatch = useDispatch()

  const {customerDto} = useSelector(state => state.checkoutReducer.userData)


  useEffect(() => {
    if(customerDto) {
      setEmail(customerDto.email)
    }
  }, [customerDto])


  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = outofstockproducts.map((product) => product);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const isSelected = (id) => selected.findIndex((item) => item.productId === id) !== -1;


  const selectitem = (product) => {
    const selectedIndex = selected.findIndex((item) => item.productId === product.productId)
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, product);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const makeApiToNotify = async (tag) => {
    try {
      let res;
      setLoading(true)
      if(tag === 'variant') {
        res = await Axios.post('/ecommerce/product/notifyWhenInStock', selected)
      } else {
        res = await Axios.post('/ecommerce/product/notifyWhenInStock', [{...MasterProductDetails, customerId: 1, email: email, active: true}])
      }
      if (res.status === 201) {
        dispatch(enqueueSnackbar({
          message: 'Subscribed successfully',
          options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
          },
      }))
      setSubscribed(true)
      setSelected([])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribeClick = async () => {
    //First Validating Email
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(mailformat)) {
      return dispatch(enqueueSnackbar({
        message: 'Invalid Email',
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'error',
        },
    }))
    } 
    if(outofstockproducts.length === 0) {
      makeApiToNotify('master')
    } else {
      if(selected.length === 0) {
        return dispatch(enqueueSnackbar({
          message: 'Please select atleast one item',
          options: {
              key: new Date().getTime() + Math.random(),
              variant: 'warning',
          },
      }))
      } else {
        selected.forEach((product) => Object.assign(product, {customerId: 1, email: email, active: true}))
        makeApiToNotify('variant')
      }
    }
  }


  return (
    <>
      <h4 css={`text-transform: uppercase; color: #5e5ee2;`}>Get notified when out of stock options are available</h4>
      {outofstockproducts.length > 0 && 
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <MainCheckbox
                  indeterminate={selected.length > 0 && selected.length < outofstockproducts.length}
                  checked={outofstockproducts.length > 0 && selected.length === outofstockproducts.length}
                  onClick={handleSelectAllClick}
                  inputProps={{ 'aria-label': 'select all desserts' }}
                />
              </TableCell>
              {header && header.map((head, index) => {
                return <StyledTableCell align={index === 0 ? 'left' : 'center'} key={index}>{head}</StyledTableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {outofstockproducts.map((variant, index) => {
              return (
                <TableRow key={index}>
                  <TableCell 
                    onClick={() => selectitem(variant)}
                    padding="checkbox">
                    <SubCheckbox
                      checked={isSelected(variant.productId)}
                    />
                  </TableCell>
                  {Object.keys(variant.productVariantLabelValues).map((key, index) => {
                      return (
                        <TableCell align={index === 0 ? 'left' : 'center'}  key={index} component="th" scope="row">
                          <ContainerDiv>
                            <div css={`
                              display: flex; 
                              flex-direction: column;
                              justify-content: center;
                              width: 100%;
                              `}>
                              <span>{variant.productVariantLabelValues[key]}</span>
                              {index === 0 && <span css={`font-size: 10px; color: #A9A9A9;`}>SKU: {variant.sku}</span>}
                            </div>
                          </ContainerDiv>
                        </TableCell>
                      )
                    })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      }
      <ContainerDiv>
        <span css={`font-weight: bold;`}>Subscribe to back in stock notification</span>
      </ContainerDiv>
      <ContainerDiv css={`padding-bottom: 3%; border-bottom: 1px dashed #414141;`}>
        <EmailInput onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" variant="outlined" value={email} />
        <StyledSubscribe subscribed={subscribed} Loading={loading} onClick={handleSubscribeClick}>{loading && <CircularProgress size={20} style={{color: '#fff'}}/>}<span>{subscribed ? 'Subscribed Successfully' : 'Subscribe'}</span></StyledSubscribe>
      </ContainerDiv>
    </>
  )
}

export default Outofstock
