import React, {useState, useEffect} from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import useDidMountEffect from '../../Custom-UseEffect/UseDidMountEffect';

const Image = styled.img`
  width: 60px;
  object-fit: contain;
`

const QuantityInput = withStyles({
  root: {
    border: '1px solid #A9A9A9',
    padding: '10px',
    fontSize: '12px',
    width: '45px',
    height: '35px'
  }
})(InputBase)

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

const StyledTableRow = styled(TableRow)`
  &:hover {
    background: #f7f7f7;
  }
`

const TableItem = (props) => {
  let [quantity, setQuantity] = useState(0)

  const handleInputChange = (e) => {
    if(e.target.value === '' || Number(e.target.value) >= 0) {
      setQuantity(Number(e.target.value))
    }
  }

  const {variant, resetInput} = props

  useDidMountEffect(() => {
      props.updateQuantity({...variant, quantity: quantity, insertedTimestamp: "2020-06-10 17:58:17", updatedBy: 1, customerId: 1})
  },[quantity])
  useEffect(() => {
    if (resetInput) {
      setQuantity(0)
    }
  },[resetInput])
  return (
    <StyledTableRow>
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
      <TableCell align="center">${variant.standardPrice}</TableCell>
      <TableCell align="right">
          {variant.availableQuantity < 1 ? <Image src="/outofstock.jpg" /> : 
          <div css={`display: flex; justify-content: flex-end;`}>
          <QuantityInput onChange={(e) => handleInputChange(e)} type="text" value={quantity} />
          <div css={`display: flex; flex-direction: column; margin-left: 5px;`}>
            <button onClick={() => {
              return setQuantity(quantity + 1);
            }} css={`
                background: #fff; 
                border-radius: 4px; 
                border: 1px solid #A9A9A9; 
                padding: 1px 4px;`}>+</button>
            <button onClick={() => {
              if(quantity === 0) return
              setQuantity(quantity - 1)
            }} css={`
                background: #fff; 
                border-radius: 4px; 
                border: 1px solid #A9A9A9; 
                padding: 1px 4px;`}>-</button>
          </div>
        </div>
        }
      </TableCell>
    </StyledTableRow>
  )
}

export default TableItem
