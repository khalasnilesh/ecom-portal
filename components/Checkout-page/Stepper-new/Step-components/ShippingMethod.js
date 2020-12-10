import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { setShippingMethod, addToCompleted } from '../../../../store/actions/checkout.action';
import {NavBtn, StyledFormControlLabel, StyledFormControl, StyledInput, RedRadio} from '../../../../lib/Themes/StyledComponents'


const ShippingMethod = ({next, prev}) => {
  const dispatch = useDispatch()
  const shippingMeth = useSelector(state => state.checkoutReducer.shippingMeth)
  const [value, setValue] = React.useState(shippingMeth || 'FedEx Home Delhivery');


  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const shippingMethRef = useRef()

  useEffect(() => {
    shippingMethRef.current = value
  }, [value])

  useEffect(() => {
    return () => {
      dispatch(setShippingMethod(shippingMethRef.current))
      dispatch(addToCompleted(4))
    }
  },[])
  return (
    <>
      <StyledFormControl component="fieldset">
        <RadioGroup style={{width: '100%'}} aria-label="ShippingMethod" name="Shipping1" value={value} onChange={handleChange}>
          <StyledFormControlLabel 
            value="FedEx Home Delhivery" 
            control={<RedRadio />} 
            label={
              <Box component="div" fontSize={14} css={`display: flex; width: 100%; color: ${props => props.theme.primaryColorV1};`}>
                FedEx Home delivery
                <div css={`margin-left: auto; margin-right: 10%;`}>
                  <em css={`font-size: 12px; color: ${props => props.theme.secondaryColor};`}>FREE</em>
                  <em css={`margin-left: 40px; font-size: 12px;`}>EST. Delivery by WED 29th July</em>
                </div>
              </Box>}
              />
          <StyledFormControlLabel value="Reserve Stock For Future" control={<RedRadio />} label={
              <Box component="div" fontSize={14} css={`display: flex; width: 100%; color: ${props => props.theme.primaryColorV1};`}>
                Reserve Stock for Future
                <div css={`margin-left: auto; margin-right: 10%;`}>
                  <em css={`font-size: 12px; color: ${props => props.theme.secondaryColor};`}>FREE</em>
                  <em css={`margin-left: 40px; font-size: 12px;`}>EST. Delivery by WED 29th July</em>
                </div>
              </Box>} />
          <StyledFormControlLabel value="FedEx 2 day delivery" control={<RedRadio />} label={
              <Box component="div" fontSize={14} css={`display: flex; width: 100%; color: ${props => props.theme.primaryColorV1};`}>
                FedEx 2 day Delivery
                <div css={`margin-left: auto; margin-right: 10%;`}>
                  <em css={`font-size: 12px; color: ${props => props.theme.secondaryColor};`}>FREE</em>
                  <em css={`margin-left: 40px; font-size: 12px;`}>EST. Delivery by WED 29th July</em>
                </div>
              </Box>} />
          <StyledFormControlLabel value="Pickup from store" control={<RedRadio />} label={
              <Box component="div" fontSize={14} css={`display: flex; width: 100%; color: ${props => props.theme.primaryColorV1};`}>
                Pickup from store
                <div css={`margin-left: auto; margin-right: 10%;`}>
                  <em css={`font-size: 12px; color: ${props => props.theme.secondaryColor};`}>FREE</em>
                  <em css={`margin-left: 40px; font-size: 12px;`}>EST. Delivery by WED 29th July</em>
                </div>
              </Box>} />
          <StyledFormControlLabel value="disabled" disabled control={<RedRadio />} label={<Box component="div" fontSize={14}>Add to my existing order</Box>} />
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
              hoverBackground="#2828f5"
              color="#fff"
              onClick={() => next()}
              >Next</NavBtn>
        </div>
      }
      </>
  )
}

export default ShippingMethod
