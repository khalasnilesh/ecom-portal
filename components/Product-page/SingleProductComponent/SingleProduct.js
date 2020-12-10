import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import UseDidMountEffect from '../../Custom-UseEffect/UseDidMountEffect';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from '../../../store/actions/notification.actions';
import { PositiveIcon, NegativeIcon } from '../../../lib/Themes/icons';

const QuantityInput = withStyles({
  root: {
    fontSize: '15px',
    borderRight: '1px solid rgba(211, 48, 47, 0.5)',
    borderLeft: '1px solid rgba(211, 48, 47, 0.5)',
    width: '30%',
    height: '25px'
  },
  input: {
    textAlign: 'center'
  }
})(InputBase)

const StyledButtons = styled.button`
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  color: #3d3d3d;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  border: none;
  height: 20px;
  width: 30%;
  /* min-width: 40px; */
  font-size: 20px;
  opacity: ${props => props.disabled ? 0.5 : 'none'};
  background: none;
  outline-color: transparent;
  outline: none;
  &:hover {
    color: ${props => props.theme.secondaryColor};
  }
` 

// const StyledButtons = styled.button`
//   cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
//   border: none;
//   opacity: ${props => props.disabled ? 0.5 : 'none'};
//   background: none;
//   outline: none;
// ` 
// const QuantityInput = withStyles({
//   root: {
//     border: '1px solid #A9A9A9',
//     padding: '10px',
//     fontSize: '14px',
//     width: '45px',
//     height: '40px',
//     '& .MuiInputBase-input': {
//       textAlign: 'center'
//     }
//   }
// })(InputBase)

const SingleProduct = ({MasterProductDetails, updateQuantity, resetInput}) => {

  const [quantity, setQuantity] = useState(1)
  const {standardPrice} = MasterProductDetails;
  const dispatch = useDispatch()


  const handleInputChange = (e) => {
    if(Number(e.target.value) > MasterProductDetails.availableQuantity){
      dispatch(enqueueSnackbar({
        message: `Max available quantity ${MasterProductDetails.availableQuantity}!`,
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'warning',
        },
    }))
    return
    }
    if(e.target.value === '' || Number(e.target.value) >= 0) {
      setQuantity(Number(e.target.value))
    }
  }

  useEffect(() => {
    updateQuantity({...MasterProductDetails, quantity: quantity, insertedTimestamp: "2020-06-10 17:58:17", updatedBy: 1, customerId: 1})
},[quantity])

  useEffect(() => {
    if (resetInput) {
      setQuantity(1)
    }
  },[resetInput])

  return (
    <div css={`display: flex; align-items: center; padding-bottom: 30px;`}>
      <div css={`
        font-size: 22px;
        font-weight: bold;
        color: ${props => props.theme.secondaryColor};
        text-decoration: ${MasterProductDetails.availableQuantity > 0 ? 'none' : 'line-through'};
      `}>${standardPrice}</div>
      {/* <div css={`display: flex; justify-content: center; margin-left: 10px;`}>
          <StyledButtons disabled={MasterProductDetails.availableQuantity > 0 ? false : true} onClick={() => {
              return setQuantity(quantity + 1);
            }}>+</StyledButtons>
          <QuantityInput disabled={MasterProductDetails.availableQuantity > 0 ? false : true} style={{opacity: MasterProductDetails.availableQuantity > 0 ? 'none' : '0.5'}} onChange={(e) => handleInputChange(e)} type="text" value={quantity} />
          <StyledButtons disabled={MasterProductDetails.availableQuantity > 0 ? false : true} onClick={() => {
              if (quantity === 0) return
              setQuantity(quantity - 1);
            }}>-</StyledButtons>
        </div> */}
        <div css={`
              display: flex; 
              width: 180px;
              align-items: center;
              justify-content: space-between;
              padding: 6.5px 0px;
              margin-left: 30px;
              border-radius: 5px;
              background: #f9f9f9;
              box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
              `}>
          <StyledButtons disabled={MasterProductDetails.availableQuantity > 0 ? false : true} onClick={() => {
              return setQuantity(quantity + 1);
            }}><PositiveIcon /></StyledButtons>
          <QuantityInput disabled={MasterProductDetails.availableQuantity > 0 ? false : true} style={{opacity: MasterProductDetails.availableQuantity > 0 ? 'none' : '0.5'}} onChange={(e) => handleInputChange(e)} type="text" value={quantity} />
          <StyledButtons disabled={MasterProductDetails.availableQuantity > 0 ? false : true} onClick={() => {
              if (quantity === 0) return
              setQuantity(quantity - 1);
            }}><NegativeIcon /></StyledButtons>
        </div>
    </div>
  )
}

export default SingleProduct
