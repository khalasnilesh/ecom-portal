import React, {useEffect, useState, useRef} from 'react'
import {useDispatch} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import InputBase from '@material-ui/core/InputBase';
import Hidden from "@material-ui/core/Hidden";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import DeleteIcon from '@material-ui/icons/Delete';
import styled, {keyframes} from 'styled-components';
import { enqueueSnackbar } from '../../store/actions/notification.actions';
import useDidMountEffect from '../Custom-UseEffect/UseDidMountEffect';

const QuantityInput = withStyles({
  root: {
    border: '1px solid #A9A9A9',
    padding: '10px',
    fontSize: '12px',
    width: '45px',
    height: '40px',
    background: '#fff'
  }
})(InputBase)

const SubCheckbox = withStyles(() => ({
  root: {
    borderColor: '#fff',
    '&$checked': {
      color: '#000'
    }
  },
  checked: {}
}))(Checkbox)


const SlideUp = keyframes`
 0% {
   opacity: 1;
   transform: translateY(0px);
 }
 25% {
   opacity: 0;
   transform: translateY(-20px);
 }
 50% {
   opacity: 0;
   transform: translateY(20px);
 }
 100% {
   opacity: 1;
   transform: translateY(0px);
   color: #B71C1C;
 }
`

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const DescriptionTableCell = withStyles({
  root: {
    verticalAlign: 'center'
  }
})(TableCell)

const StyledImage = styled(LazyLoadImage)`
  width: 50px;
  height: 50px;
  @media only screen and (min-width: 600px) {
    width: 70px;
    height: 70px;
  }
`

const StyledDelete = styled(DeleteIcon)`
  color: ${props => props.theme.primaryColorV1};
`

const TableItem = (props) => {
  const dispatch = useDispatch()

  let [quantity, setQuantity] = useState()

  const {product, isItemSelected, labelId} = props

  useDidMountEffect(() => {
    if (quantity === 0) {
      dispatch(enqueueSnackbar({
        message: 'Quantity should be more than 0',
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'warning',
        },
    }))
    }
  if(quantity !== product.quantity) {
    props.updateQuantity({...product, quantity: quantity, insertedTimestamp: "2020-06-10 17:58:17", updatedBy: 1, customerId: 1})
  } 
  }, [quantity])

  useEffect(() => {
    setQuantity(product.quantity)
  },[product.quantity])

  const handleItemQuantity = (operator) => {
    if (operator === 'add') {
      if(quantity === product.availableQuantity) {
        dispatch(enqueueSnackbar({
          message: `Max available quantity ${product.availableQuantity}!`,
          options: {
              key: new Date().getTime() + Math.random(),
              variant: 'warning',
          },
      }))
      return
      }
      setQuantity(quantity + 1)
    } else if (operator === 'subtract') {
      if(quantity <= 0) return
      setQuantity(quantity - 1)
    } else {
      return 
    }
  }

  const handleInputChange = (e) => {
    if(Number(e.target.value) > product.availableQuantity){
      dispatch(enqueueSnackbar({
        message: `Max available quantity ${product.availableQuantity}!`,
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

  return (
    <StyledTableRow key={product.id}>
        <TableCell 
          onClick={() => props.selectitem(product)}
          padding="checkbox">
          <SubCheckbox
            checked={isItemSelected}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </TableCell>
        <TableCell align="left">
          <StyledImage src={product.imageUrl ? product.imageUrl : 'https://image.shutterstock.com/image-vector/photo-coming-soon-symbol-600w-161251868.jpg'} effect="blur" />
        </TableCell>
        <DescriptionTableCell>
          <p css={`
            font-weight: bold; 
            font-size: 12px;
            @media only screen and (min-width: 600px) {
              font-size: 14px;
            }
            `}>{product.productName}</p>
            {product.cartLineItemUpdated === false && <p css={`color: red; font-weight: bold;`}>Maximum available quantity is {product.availableQuantity}</p>}
          <Hidden smUp>
            <div css={`width: 100%; margin-top: 10px; display: flex; align-items: center; justify-content: space-between;`}>
              <input onChange={(e) => handleInputChange(e)} css={`width: 40px; height: 30px; text-align: center;`} type="tel" value={quantity}/>
              <div>
                <p>Price</p>
                <p css={`white-space: nowrap;`}>$ {product.standardPrice}</p>
              </div>
              <div>
                <p>Subtotal</p>
                <h4 css={`white-space: nowrap;`}>$ {parseFloat(+(Math.round((product.standardPrice * product.quantity) + "e+2")  + "e-2"))}</h4>
              </div>
              <DeleteIcon size="small" style={{ fill:"#B71C1C" }}/>
            </div>
          </Hidden>
        </DescriptionTableCell>
        <Hidden xsDown>
          <TableCell align="right"><h3 css={`white-space: nowrap;`}>$ {product.standardPrice}</h3></TableCell>
          <TableCell align="right">
            <div css={`display: flex; justify-content: flex-end; align-items: center; margin-right: 5px;`}>
            <QuantityInput onChange={(e) => handleInputChange(e)} type="text" value={quantity} />
              <div css={`display: flex; flex-direction: column; margin-left: 5px;`}>
                <button onClick={() => handleItemQuantity('add')} css={`
                    background: #fff;
                    border: 1px solid #A9A9A9; 
                    padding: 1px 4px;
                    cursor: pointer;
                    outline: none;
                    `}>+</button>
                <button onClick={() => handleItemQuantity('subtract')} css={`
                    background: #fff;
                    border: 1px solid #A9A9A9; 
                    padding: 1px 4px;
                    cursor: pointer;
                    outline: none;`}>-</button>
              </div>
            </div>
          </TableCell>
          <TableCell align="right">
            <h3 css={`white-space: nowrap;`}>$ {parseFloat(+(Math.round((product.standardPrice * product.quantity) + "e+2")  + "e-2"))}</h3>
          </TableCell>
          <TableCell align="right">
            <div onClick={() => props.deleteitem(product)} css={`
              cursor: pointer;
              &:hover {
                  .icon {
                    animation: ${SlideUp} 0.5s ease forwards;
                  }
                }
            `}>
              <StyledDelete size="large" className="icon"/>
            </div>
          </TableCell>
        </Hidden>
      </StyledTableRow>
  )
}

export default TableItem
