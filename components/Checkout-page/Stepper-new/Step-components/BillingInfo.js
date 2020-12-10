import React from 'react'
import {connect} from 'react-redux';
import styled from 'styled-components';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box';
import RadioGroup from '@material-ui/core/RadioGroup';
import { setBillingAddressId, addToCompleted, setNewAddress, setStoreId, setShippingAddressId, setShippingStoreId } from '../../../../store/actions/checkout.action';
import Form from './Form';
import {NavBtn, StyledInput, StyledFormControlLabel, StyledDescription, StyledFormControl, RedRadio} from '../../../../lib/Themes/StyledComponents'


class BillingInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedStoreId: props.selectedStoreId || '',
      selectedBillingAddressId: props.selectedBillingAddressId || '',
      newAddress: this.props.newAddress || '',
      shippingAddress: 'this',
    }
  }

  handleNext = () => {
    this.props.setStoreId(this.state.selectedStoreId);
    this.props.setBillingAddressId(this.state.selectedBillingAddressId);
    this.props.addToCompleted(2)
    if (this.state.shippingAddress === "this") {
      this.props.setShippingAddressId(this.state.selectedBillingAddressId)
      this.props.skip()
    } else {
      this.props.next()
    }
  }

  handleStoreChange = (event) => {
    this.setState({selectedStoreId: event.target.value});
  };

  handleChange = (event) => {
    this.setState({selectedBillingAddressId: event.target.value});
    this.props.setNewAddress('')
  };

  handleRadioChange = (event) => {
    this.setState({shippingAddress: event.target.value})
  };

  renderStoreAddresses = () => {
    const {addressData} = this.props
    const {selectedStoreId, selectedBillingAddressId} = this.state
    const store = addressData.find((store) => store.id === selectedStoreId)

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
    <StyledDescription>Select a billing address from your address book or enter a new address</StyledDescription>
    <StyledFormControl>
      <Select
        labelId="demo-simple-select-placeholder-label-label"
        id="demo-simple-select-placeholder-label"
        value={selectedBillingAddressId}
        onChange={(e) => this.handleChange(e)}
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

  componentDidMount() {
    if(this.props.selectedStoreId === this.props.selectedShippingStoreId && this.props.selectedBillingAddressId === this.props.selectedShippingAddressId) {
      this.setState({shippingAddress: 'this'})
    }
    else {
      this.setState({shippingAddress: 'different'})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {newAddress} = prevProps
    const {addressData} = this.props
    const {selectedStoreId} = prevState
    if(selectedStoreId !== this.state.selectedStoreId) {
      const index = addressData.findIndex((store) => store.id === this.state.selectedStoreId)
      const billingAddress = addressData[index].customerStoreAddressList.find((address) => address.defaultBillingAddress === true)
      this.setState({selectedBillingAddressId: billingAddress.id})
    }
  }

  render() {
    const {selectedStoreId, selectedBillingAddressId, shippingAddress} = this.state;
    const {addressData, next, prev} = this.props;
    return (
      <div css={`padding-top: 40px;`}>
        <StyledDescription>Select a store from your address book</StyledDescription>
        <StyledFormControl>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={selectedStoreId}
            onChange={(e) => this.handleStoreChange(e)}
            input={<StyledInput />}
            displayEmpty
          >
            {addressData.map((store, index) => {
              return (
                <MenuItem key={index} value={store.id} >{store.storeName}</MenuItem>
              )
            })}
          </Select>
        </StyledFormControl>
        {selectedStoreId !== '' 
        ?
        this.renderStoreAddresses()
        :
        null 
        }
        {selectedBillingAddressId === 'new' && <Form 
        storeId={selectedStoreId} 
        setStoreId={(id) => this.setState({selectedStoreId: id})}
        setBillingAddressIdForm={(id) => this.setState({selectedBillingAddressId: id})}
        setShipping={() => this.setState({shippingAddress: 'different'})}
        billing
        />}
        <StyledFormControl component="fieldset">
          <RadioGroup aria-label="gender" name="gender1" value={shippingAddress} onChange={this.handleRadioChange}>
            <StyledFormControlLabel value="this" control={<RedRadio />} label={<Box component="div" fontSize={14}>Ship to this address</Box>} />
            <StyledFormControlLabel value="different" control={<RedRadio />} label={<Box component="div" fontSize={14}>Ship to a different address</Box>} />
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
              active={!selectedStoreId || !selectedBillingAddressId || selectedBillingAddressId === 'new' ? false : true}
              hoverBackground="#2828f5"
              color="#fff"
              onClick={() => this.handleNext()}
              >Next</NavBtn>
          </div>
          }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedStoreId: state.checkoutReducer.selectedStoreId,
    selectedBillingAddressId: state.checkoutReducer.selectedBillingAddressId,
    selectedShippingAddressId: state.checkoutReducer.selectedShippingAddressId,
    shippingInfo: state.checkoutReducer.shippingInfo,
    newAddress: state.checkoutReducer.newAddress
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStoreId: (id) => dispatch(setStoreId(id)),
    setShippingAddressId: (id) => dispatch(setShippingAddressId(id)),
    setBillingAddressId: (data) => dispatch(setBillingAddressId(data)),
    addToCompleted: (id) => dispatch(addToCompleted(id)),
    setNewAddress: (address) => dispatch(setNewAddress(address))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingInfo)
