import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { setActiveStep } from '../../../store/actions/checkout.action';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { EditIcon } from '../../../lib/Themes/icons';

export default function CustomizedExpansionPanels(props) {

  const dispatch = useDispatch()

  const [billingInfo, setBillingInfo] = React.useState(null);
  const [shippingInfo, setShippingInfo] = React.useState(null);

  const selectedBillingAddressId = useSelector(state => state.checkoutReducer.selectedBillingAddressId)
  const selectedStoreId = useSelector(state => state.checkoutReducer.selectedStoreId)
  const selectedShippingAddressId = useSelector(state => state.checkoutReducer.selectedShippingAddressId)
  const shippingMeth = useSelector(state => state.checkoutReducer.shippingMeth)
  const paymentInfo = useSelector(state => state.checkoutReducer.paymentInfo)
  const totalCartPrice = useSelector(state => state.cartReducer.cart.totalCartPrice);
  
  const userData = useSelector(state => state.checkoutReducer.userData) || {}
  const {customerDto, customerStoreDtoList} = userData;

  const getBillingInfo = () => {
    const index = customerStoreDtoList.findIndex((store) => store.id === selectedStoreId)
    const address = customerStoreDtoList[index].customerStoreAddressList.find((address) => address.id === selectedBillingAddressId) || {}
    const billingInfoObj = {
      name: customerDto.name,
      company: customerDto.company,
      address1: address.address1 || null,
      address2: address.address2 ? address.address2 : null,
      city: address.city || null,
      state: address.state || null,
      country: address.country || null,
      zip: address.zip || null
    }
    setBillingInfo(billingInfoObj);
  }

  const getShippingInfo = () => {
    const index = customerStoreDtoList.findIndex((store) => store.id === selectedStoreId)
    const address = customerStoreDtoList[index].customerStoreAddressList.find((address) => address.id === selectedShippingAddressId) || {}
    const shippingInfoObj = {
      name: customerDto.name,
      company: customerDto.company,
      address1: address.address1 || null,
      address2: address.address2 ? address.address2 : null,
      city: address.city,
      state: address.state,
      country: address.country,
      zip: address.zip
    }
    setShippingInfo(shippingInfoObj);
  }

  React.useEffect(() => {
    if(selectedBillingAddressId) {
      getBillingInfo()
    }
    if(selectedShippingAddressId) {
      getShippingInfo()
    }
  },[selectedBillingAddressId, selectedShippingAddressId])

  return (
    <div>
      <div css={`
            height: 50px; 
            width: 100%;
            background: ${props => props.theme.stepperBackground};
            border-radius: 10px;
            font-size: 17px;
            padding: 0px 17px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
              color: ${props => props.theme.secondaryColor};
            }
            `}><span>Subtotal</span> <span>${totalCartPrice}</span></div>
      <div css={`
            width: 100%;
            display: flex;
            align-items: center;
            font-size: 17px;
            margin: 20px 0px;
            color: ${props => props.theme.primaryColorV1};
            `}><span>Your Checkout Progress</span></div>
      <div css={`
            width: 100%; 
            background: ${props => props.theme.stepperBackground};
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;`}>
        <div css={`
              height: 50px; 
              width: 100%;
              font-size: 17px;
              padding: 0px 17px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              span, svg {
                color: ${props => props.theme.secondaryColor};
                cursor: pointer;
              }
              svg {
                & path {
                  fill: ${props => props.theme.secondaryColor};
                }
              }
              `}
              onClick={() => dispatch(setActiveStep(2))}
              ><span>Billing Information</span> {billingInfo && <EditIcon />}</div>
        <div css={`
                padding: 0px 26px;
                border-bottom: 1px solid ${props => props.theme.primaryColorV4};
              `}>
          {billingInfo &&
            <div css={`
                  font-size: 17px; 
                  color: ${props => props.theme.primaryColorV1}; 
                  white-space: pre-wrap;
                  padding-bottom: 20px;`}>
              <div css={`margin-bottom: 20px;`}>{billingInfo.name}</div>
              <div>{billingInfo.company}</div>
              <div>{billingInfo.address1}</div>
              {billingInfo.address2 && <div>{billingInfo.address2}</div>}
              <div>{billingInfo.city}, {billingInfo.state}, {billingInfo.zip}</div>
              <div>{billingInfo.country}</div>
            </div>}
        </div>
        <div css={`
              height: 50px; 
              width: 100%;
              font-size: 17px;
              padding: 0px 17px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              span, svg {
                color: ${props => props.theme.secondaryColor};
                cursor: pointer;
              }
              svg {
                & path {
                  fill: ${props => props.theme.secondaryColor};
                }
              }
              `}
              onClick={() => dispatch(setActiveStep(3))}
              ><span>Shipping Information</span> {shippingInfo && <EditIcon />}</div>
        <div css={`
                padding: 0px 26px;
                border-bottom: 1px solid ${props => props.theme.primaryColorV4};
              `}>
          {shippingInfo &&
            <div css={`
                  font-size: 17px; 
                  color: ${props => props.theme.primaryColorV1}; 
                  white-space: pre-wrap;
                  padding-bottom: 20px;`}>
              <div css={`margin-bottom: 20px;`}>{shippingInfo.name}</div>
              <div>{shippingInfo.company}</div>
              <div>{shippingInfo.address1}</div>
              {shippingInfo.address2 && <div>{shippingInfo.address2}</div>}
              <div>{shippingInfo.city}, {shippingInfo.state}, {shippingInfo.zip}</div>
              <div>{shippingInfo.country}</div>
            </div>}
        </div>
        <div css={`
              height: 50px; 
              width: 100%;
              font-size: 17px;
              padding: 0px 17px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              span, svg {
                color: ${props => props.theme.secondaryColor};
                cursor: pointer;
              }
              svg {
                & path {
                  fill: ${props => props.theme.secondaryColor};
                }
              }
              `}
              onClick={() => dispatch(setActiveStep(4))}
              ><span>Shipping Method</span> {shippingMeth && <EditIcon />}</div>
        <div css={`
                padding: 0px 26px;
                border-bottom: 1px solid ${props => props.theme.primaryColorV4};
              `}>
          {shippingMeth &&
            <div css={`
                  font-size: 17px; 
                  color: ${props => props.theme.primaryColorV1}; 
                  white-space: pre-wrap;
                  padding-bottom: 20px;`}>
              <div css={`font-size: ${props => props.theme.span}; color: '#696868';`}>
                {shippingMeth}
              </div>
            </div>}
        </div>
        <div css={`
              height: 50px; 
              width: 100%;
              font-size: 17px;
              padding: 0px 17px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              span, svg {
                color: ${props => props.theme.secondaryColor};
                cursor: pointer;
              }
              svg {
                & path {
                  fill: ${props => props.theme.secondaryColor};
                }
              }
              `}
              onClick={() => dispatch(setActiveStep(5))}
              ><span>Payment Info</span> {paymentInfo && <EditIcon />}</div>
        <div css={`
                padding: 0px 26px;
                border-bottom: 1px solid ${props => props.theme.primaryColorV4};
              `}>
          {paymentInfo &&
            <div css={`
                  font-size: 17px; 
                  color: ${props => props.theme.primaryColorV1}; 
                  white-space: pre-wrap;
                  padding-bottom: 20px;`}>
              <div css={`font-size: ${props => props.theme.span}; color: '#696868';`}>
                {paymentInfo}
              </div>
            </div>}
        </div>
      </div>
    </div>
  );
}
