import React, {useEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { addToCompleted, setShippingAddressId } from '../../../../store/actions/checkout.action';
import Form from './Form';
import {NavBtn, StyledDescription, StyledFormControl, StyledInput} from '../../../../lib/Themes/StyledComponents'


const ShippingInfo = ({addressData, next, prev}) => {
  const dispatch = useDispatch()
  const selectedStoreIdStore = useSelector(state => state.checkoutReducer.selectedStoreId)
  const selectedShippingAddressIdStore = useSelector(state => state.checkoutReducer.selectedShippingAddressId)
  const [selectedShippingAddressId, setSelectedShippingAddressId] = React.useState(selectedShippingAddressIdStore || '');

  const handleChange = (event) => {
    setSelectedShippingAddressId(event.target.value);
  };

  const renderStoreAddresses = () => {
    const store = addressData.find((store) => store.id === selectedStoreIdStore)

    const getAddress = (add) => {
      const {address1, address2, city, state, country, zip} = add;
      let str = ''
      str += `${address1}, `;
      if(address2) {
        str += `${address2}, `
      }
      str += `${city}, ${state}, ${country}, ${zip}`
      return str;
    }

    return <>
    <StyledDescription>Select a shipping address from your address book or enter a new address</StyledDescription>
    <StyledFormControl>
      <Select
        labelId="demo-simple-select-placeholder-label-label"
        id="demo-simple-select-placeholder-label"
        value={selectedShippingAddressId}
        onChange={(e) => handleChange(e)}
        input={<StyledInput />}
        displayEmpty
      >
        {store.customerStoreAddressList.map((address, index) => {
          return (
            <MenuItem key={index} value={address.id} >{getAddress(address)}</MenuItem>
          )
        })}
        <MenuItem value="new"><em>New Address</em></MenuItem>
      </Select>
    </StyledFormControl>
    </>
  } 

  useEffect(() => {
    if (selectedShippingAddressId) {
      dispatch(setShippingAddressId(selectedShippingAddressId))
      dispatch(addToCompleted(3))
    }
  },[selectedShippingAddressId, selectedStoreIdStore])

  return (
    <div css={`padding-top: 40px;`}>
      {renderStoreAddresses()}
      {selectedShippingAddressId === 'new' && <Form 
      storeId={selectedStoreId}
      setStoreId={(id) => setSelectedStoreId(id)}
      setShippingAddressIdForm={(id) => setSelectedShippingAddressId(id)} />}
      {
        <div>
          <NavBtn
            active={true}
            onClick={() => prev()}
          >Back</NavBtn>
          <NavBtn 
              next
              active={!selectedStoreIdStore || !selectedShippingAddressId || selectedShippingAddressId === 'new' ? false : true}
              hoverBackground="#2828f5"
              color="#fff"
              onClick={() => next()}
              >Next</NavBtn>
        </div>
        }
    </div>
  )
}

export default ShippingInfo
