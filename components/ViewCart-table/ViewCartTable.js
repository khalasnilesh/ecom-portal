import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import TableItem from './TableItem';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Checkbox from '@material-ui/core/Checkbox';
import Hidden from "@material-ui/core/Hidden";
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { asyncRemoveSelectedFromCart, asyncUpdateCart, asyncfetchCartState } from '../../store/asyncActions/asyncActions';
import { enqueueSnackbar } from '../../store/actions/notification.actions';
import {Axios} from '../../utils';
import { loadSavedLocalCart, localRemoveFromCart, localUpdateCart } from '../../utils/localCart';
import { loadLocalCart } from '../../store/actions/cart.action';
import axios from 'axios';

const MainCheckbox = withStyles(() => ({
  root: {
    borderColor: '#fff',
    '&$checked': {
      color: '#fff'
    },
    '&$indeterminate': {
      color: '#fff'
    }
  },
  checked: {},
  indeterminate: {}
}))(Checkbox)

const HeadingTableRow = withStyles((theme) => ({
  root: {
      backgroundColor: '#B71C1C',
  },
}))(TableRow);

const HeadingTableCell = withStyles({
  root: {
    textTransform: 'uppercase',
    fontSize: '16px',
    color: '#fff'
  }
})(TableCell)

const DescriptionTableCell = withStyles({
  root: {
    verticalAlign: 'center'
  }
})(TableCell)

const useStyles = makeStyles({
  table: {
    width: '100%',
    overflowX: 'none'
  },
});

export default function SimpleTable(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);
  const {clearCart, setClearCartToFalse, updateCart, setUpdateCartToFalse} = props;
  const [localCart, setLocalCart] = React.useState({
    cartLineItems: [],
    totalCartPrice: 0,
    totalCartQuantity: 0
  })

  // API DATA
  const cartLineItems = useSelector(state => state.cartReducer.cart.cartLineItemDtoList);
  const {customerDto} = useSelector(state => state.checkoutReducer.userData)
  const loadLocalCartStore = useSelector(state => state.cartReducer.loadLocalCart);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = customerDto ? cartLineItems.map((product) => product) : localCart.cartLineItems.map((product) => product)
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (product) => {
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
  const isSelected = (id) => selected.findIndex((item) => item.productId === id) !== -1;

  const deleteCartItem = (product) => {
    const confirm = window.confirm('Are you sure you want to remove the item?')
    if(confirm) {
      if (customerDto) {
        dispatch(asyncRemoveSelectedFromCart([product]))
      }else {
        localRemoveFromCart([product])
        dispatch(loadLocalCart())
      }
    } else {
      return
    }
  }

  const updateCartItem = (product) => {
    const selectedIndex = selected.findIndex((item) => item.id === product.id)
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, product);
      setSelected(newSelected)
    } else {
      selected[selectedIndex].quantity = product.quantity
    }
  }

  const handleClearCart = async () => {
    if (selected.length === 0) {
      dispatch(enqueueSnackbar({
        message: 'Select atleast one item!',
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'warning',
        },
    }))
    } else {
      if (customerDto) {
        dispatch(asyncRemoveSelectedFromCart(selected))
      }else {
        localRemoveFromCart([...selected])
        dispatch(loadLocalCart())
      }
      setSelected([])
    }
    setClearCartToFalse()
  }

  const handleUpdateCart = async () => {
    if(selected.length === 0) {
      dispatch(enqueueSnackbar({
        message: 'Select atleast one item!',
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'warning',
        },
    }))
    } else {
      const shouldUpdate = selected.every((item) => item.quantity > 0)
      if(shouldUpdate) {
        if(customerDto) {
          try {
            const res = await axios.put('/api/cartLineItem/updatecart', [...selected])
            if(res.status === 200 && res.data) {
              res.data.forEach(element => {
                const index = cartLineItems.findIndex((item) => item.id === element.id)
                cartLineItems[index].cartLineItemUpdated = element.cartLineItemUpdated
                cartLineItems[index].quantity = element.quantity
              });
              if (res.data.every((item) => item.cartLineItemUpdated === true)) {
                dispatch(enqueueSnackbar({
                  message: 'Item(s) have been updated!',
                  options: {
                      key: new Date().getTime() + Math.random(),
                      variant: 'success',
                  },
              }))
                setSelected([])
                dispatch(asyncfetchCartState())
              } else {
                dispatch(enqueueSnackbar({
                  message: 'Item(s) not updated!',
                  options: {
                      key: new Date().getTime() + Math.random(),
                      variant: 'error',
                  },
              }))
              }
            } else {
              dispatch(enqueueSnackbar({
                message: 'Item(s) not updated!',
                options: {
                    key: new Date().getTime() + Math.random(),
                    variant: 'error',
                },
            }))
            }
          } catch (error) {
            console.log(error)
            dispatch(enqueueSnackbar({
              message: 'Item(s) not updated!',
              options: {
                  key: new Date().getTime() + Math.random(),
                  variant: 'error',
              },
            }))
          }

        } else {
          localUpdateCart([...selected])
          dispatch(enqueueSnackbar({
            message: 'Items have been updated!',
            options: {
                key: new Date().getTime() + Math.random(),
                variant: 'success',
            },
        }))
        setSelected([])
        dispatch(loadLocalCart())
        }
        // dispatch(asyncUpdateCart(selected))
      } else {
        dispatch(enqueueSnackbar({
          message: 'Item(s) count should be more than 0!',
          options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
          },
      }))
      }
    }
    setUpdateCartToFalse()
  }

  useEffect(() => {
    if(clearCart) {
      handleClearCart()
    }
    if(updateCart) {
      handleUpdateCart()
    }
  },[clearCart, updateCart])
  useEffect(() => {
    const savedLocalCart = loadSavedLocalCart()
    setLocalCart(savedLocalCart)
  },[loadLocalCartStore])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <HeadingTableRow>
            <TableCell padding="checkbox">
              <MainCheckbox
                indeterminate={customerDto ?
                  selected.length > 0 && selected.length < cartLineItems.length
                  :
                  selected.length > 0 && selected.length < localCart.cartLineItems.length
                }
                checked={
                  customerDto ?
                  cartLineItems.length > 0 && selected.length === cartLineItems.length
                  :
                  localCart.cartLineItems.length > 0 && selected.length === localCart.cartLineItems.length
                }
                onClick={handleSelectAllClick}
                inputProps={{ 'aria-label': 'select all desserts' }}
              />
            </TableCell>
            <HeadingTableCell align="left">Item</HeadingTableCell>
            <HeadingTableCell align="right"></HeadingTableCell>
            <Hidden xsDown>
              <HeadingTableCell align="right">Price</HeadingTableCell>
              <HeadingTableCell align="right">Qty</HeadingTableCell>
              <HeadingTableCell align="right">Subtotal</HeadingTableCell>
              <HeadingTableCell align="right"></HeadingTableCell>
            </Hidden>
          </HeadingTableRow>
        </TableHead>
        <TableBody>
          { customerDto ? cartLineItems && cartLineItems.map((product, index) => {
            const isItemSelected = isSelected(product.productId);
            const labelId = `enhanced-table-checkbox-${product.productId}`;
            return (<TableItem 
                      key={product.productId} 
                      product={product} 
                      isItemSelected={isItemSelected} 
                      labelId={labelId} 
                      selectitem={(product) => handleClick(product)} 
                      deleteitem={(product) => deleteCartItem(product)}
                      updateQuantity={(product) => updateCartItem(product)}
                      />)
          })
          :
          localCart.cartLineItems && localCart.cartLineItems.map((product, index) => {
            const isItemSelected = isSelected(product.productId);
            const labelId = `enhanced-table-checkbox-${index}`;
            return (<TableItem 
                      key={index} 
                      product={product} 
                      isItemSelected={isItemSelected} 
                      labelId={labelId} 
                      selectitem={(product) => handleClick(product)} 
                      deleteitem={(product) => deleteCartItem(product)}
                      updateQuantity={(product) => updateCartItem(product)}
                      />)
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
