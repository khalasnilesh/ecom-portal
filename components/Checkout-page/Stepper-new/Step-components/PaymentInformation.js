import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import styled from 'styled-components'
import { setPaymentInfo, addToCompleted } from '../../../../store/actions/checkout.action';
import CreditForm from './CreditForm';
import {NavBtn, StyledInput, StyledFormControlLabel, StyledDescription, StyledFormControl, RedRadio} from '../../../../lib/Themes/StyledComponents'


const PaymentInformation = ({next, prev}) => {
  const paymentInfo = useSelector(state => state.checkoutReducer.paymentInfo)
  const [value, setValue] = React.useState(paymentInfo || 'PayPal');
  const dispatch = useDispatch()

  const paymentInfoRef = React.useRef()

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  React.useEffect(() => {
    paymentInfoRef.current = value;
  },[value])

  React.useEffect(() => {
    return () => {
      dispatch(setPaymentInfo(paymentInfoRef.current))
      dispatch(addToCompleted(5))
    }
  },[])


  return (
    <>
    <StyledFormControl component="fieldset">
      <RadioGroup aria-label="ShippingMethod" name="Shipping1" value={value} onChange={handleChange}>
        <div css={`display: flex; width: 100%; align-items: center; margin: 0px 0px 10px -10px; color: ${props => props.theme.primaryColorV2}; hr { height: 1px; background: #000;width: 100%; margin-left: 10px;}`}><em>Payment</em> <hr></hr></div>
        <StyledFormControlLabel value="PayPal" control={<RedRadio />} label="PayPal" />
        {value === 'PayPal' && <p css={`font-size: 12px; font-style: italic; color: ${props => props.theme.primaryColorV1}; margin: 0px 0px 40px auto;`}>You will complete your payment with PayPal</p>}
        <StyledFormControlLabel value="Credit Card" control={<RedRadio />} label="Credit Card" />
        {value === 'Credit Card' && <CreditForm />}
        <br />
        {/* <div css={`display: flex; width: 100%; align-items: center; margin: 0px 0px 10px -10px; color: ${props => props.theme.primaryColorV2}; hr { height: 1px; background: #000;width: 100%; margin-left: 10px;}`}><em>Finance</em> <hr></hr></div>
        <StyledFormControlLabel value="Behalf - Buy Now Pay Later" control={<RedRadio />} label="Behalf - Buy Now Pay Later" />
        <StyledFormControlLabel value="FundBoxPay - Revolving Line Of Credit" control={<RedRadio />} label="FundBoxPay - Revolving Line Of Credit" /> */}
      </RadioGroup>
    </StyledFormControl>
    {
      <div>
        <NavBtn
          active={true}
          onClick={() => prev()}
        >Back</NavBtn>
        <NavBtn 
          next
          active={true}
          color="#fff"
          onClick={() => next()}
          >Next</NavBtn>
      </div>
      }
      </>
  )
}

export default PaymentInformation
