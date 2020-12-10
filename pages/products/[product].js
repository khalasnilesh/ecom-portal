import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import dynamic from "next/dynamic";
import BreadCrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Panel from '../../components/Product-page/Panel/Panel';
import Tabs from '../../components/Product-page/Tabs/Tabs';
import { StyledGreenButton } from '../../lib/Themes/StyledComponents';
import Grid from '@material-ui/core/Grid';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Divider from '@material-ui/core/Divider';
import Rating from '@material-ui/lab/Rating';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { CONTENT_WIDTH } from '../../lib/Themes/Mobile';
import styled from 'styled-components';
import { Hidden, CircularProgress } from '@material-ui/core';
import TableItem from '../../components/Product-page/Table-view-item/TableItem'
import { asyncAddToCart } from '../../store/asyncActions/asyncActions';
import { enqueueSnackbar } from '../../store/actions/notification.actions';
import VapeMenu from '../../components/Header/Vape-Menu/VapeMenu';
import { REQUEST_START } from '../../store/constants';
import Outofstock from '../../components/Product-page/OutOfStock/Outofstock';
import { Axios } from '../../utils';
import SingleProduct from '../../components/Product-page/SingleProductComponent/SingleProduct';
import { motion } from 'framer-motion';
import AddToCartOptions from '../../components/Product-page/AddToCartOptions/AddToCartOptions';
import { localAddToCart, loadSavedLocalCart } from '../../utils/localCart';
import { loadLocalCart } from '../../store/actions/cart.action';

const ImageSlider = dynamic(
  () =>
    import("../../components/Product-page/Product-image/Product-image"),
  {
    ssr: false,
  }
);


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

const ContainerDiv = styled.div`
  display: flex;
  font-size: 14px;
  height: ${props => props.height ? props.height : 'auto'};
  margin: ${props => props.margin ? props.margin : '30px 0px'};
  width: 100%;
  flex-direction: ${props => props.flexDirection ? props.flexDirection : 'column'};
  align-items: ${props => props.alignItems ? props.alignItems : 'default'};
  justify-content: ${props => props.justifyContent ? props.justifyContent : 'default'};
  padding: 0px 15px;
  /* @media only screen and (min-width: 980px) {
    margin: 1% 0%;
  } */
`

const StyledTitleContainer = styled.div`
  max-width: 400px;
  color: ${props => props.theme.secondaryColor};
  width: 100%;
  margin: 15px 0px;
  font-size: ${props => props.theme.h4};
  padding: 0px 15px;
`


/**
 * This function returns a new array with all the products that are out of stock
 * 
 * @param products
 * all the products that we get from the productDetails
 * productDetails > body > content
 * 
 * 
 */
const getOutOfStockItems = (products) => {
   if(products.length > 0) {
    return products.filter((item) => item.availableQuantity === 0);
   } else {
     return []
   }
}

export default (props) => {
  console.log(props.productDetails)
  const [selected, setSelected] = React.useState([]);
  const [itemQuantity, setQuantity] = React.useState(1);
  const [itemSubtotal, setItemSubtotal] = React.useState(0);
  const [resetInput, setResetInput] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showOutOfStockComponent, setShowOutOfStockComponent] = React.useState(false);
  const [outofstockproducts, setoutofstockproducts] = React.useState([]);
  const [inStock, setInStock] = React.useState(true);


  const [localCart, setLocalCart] = React.useState({
    cartLineItems: [],
    totalCartPrice: 0,
    totalCartQuantity: 0
  })


  const loadLocalCartStore = useSelector(state => state.cartReducer.loadLocalCart);

  const dispatch = useDispatch()
  const {productDetails: { body: { content = [] }, header, masterProductDetails, masterProductDetails: {fullDescription, shortDescription, productName}} = {}}  = props

  const totalCartPrice = useSelector(state => state.cartReducer.cart.totalCartPrice);
  const reqStatus = useSelector(state => state.cartReducer.addToCartReqStatus);
  const user = useSelector(state => state.checkoutReducer.userData)
  const {customerDto} = user;

  

  const selectVariantToAdd = (variantItem) => {
    const selectedIndex = selected.findIndex((item) => item.productId === variantItem.productId)
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, variantItem);
      setSelected(newSelected)
    } else {
      if (variantItem.quantity === 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      setSelected(newSelected)
      } else {
        newSelected = [...selected]
        newSelected[selectedIndex].quantity = variantItem.quantity
        setSelected(newSelected)
      }
    }
  }

  const handleAddToCart = () => {
    if (itemQuantity > 0) {
      if(customerDto) {
        dispatch(asyncAddToCart(selected))
      } else {
        localAddToCart([...selected])
        dispatch(loadLocalCart())
        dispatch(enqueueSnackbar({
          message: 'Product added to cart!',
          options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
          },
      }))
      }
      if(props.productDetails.body.content.length !== 0) {
        setQuantity(0)
        setItemSubtotal(0)
        setSelected([])
        setResetInput(true)
      }

      setResetInput(true)
    } else {
      dispatch(enqueueSnackbar({
        message: 'Select atleast one item!',
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'warning',
        },
    }))
    }
  }

  useEffect(() => {
    let q = 0;
    let s = 0;
    selected.forEach((item) => {
      q += item.quantity
      s += item.quantity * item.standardPrice
    })
    setQuantity(q)
    setItemSubtotal(parseFloat(+(Math.round(s + "e+2")  + "e-2")))
  },[selected])

  useEffect(() => {
    if (resetInput) {
      setResetInput(false)
    }
  },[resetInput])

  useEffect(() => {
    if(reqStatus === REQUEST_START) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  },[reqStatus])

  useEffect(() => {
    const savedLocalCart = loadSavedLocalCart()
    setLocalCart(savedLocalCart)
  },[loadLocalCartStore])

  useEffect(() => {
    const arr = getOutOfStockItems(props.productDetails.body.content)
    if(arr.length > 0 || masterProductDetails.availableQuantity <= 0) setShowOutOfStockComponent(true)
    setoutofstockproducts(arr)
    if (arr.length === props.productDetails.body.content.length && masterProductDetails.availableQuantity <= 0) {
      setInStock(false)
    }
    if(props.productDetails.body.content.length === 0) {
      setQuantity(1)
      setItemSubtotal(1 * masterProductDetails.standardPrice)
    }
  },[])

  return (
    <>
    <motion.div exit={{ opacity: 0, y: 60 }} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}>
    {/* <div>Product Details Page</div> */}
    <Grid container justify="center">
      <Grid item
        xs={CONTENT_WIDTH.BODY_CONTENT_WIDTH_XS}
        sm={CONTENT_WIDTH.BODY_CONTENT_WIDTH_SM}
        md={CONTENT_WIDTH.BODY_CONTENT_WIDTH_MD}
        style={{ margin: '1% 0' }}
      >
        <Grid container>
          <Grid item xs={12}>
            <BreadCrumbs />
          </Grid>
        </Grid>
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12} sm={9} md={5}>
            <ImageSlider />
          </Grid>
          <Grid item xs={12} sm={9} md={7}>
            <StyledTitleContainer>
              <div>{productName ? productName : 'GEEKVAPE AEGIS POD'}</div>
            </StyledTitleContainer>
            <ContainerDiv>
              <span css={`font-size: 16px;`}>Brand</span>
            </ContainerDiv>
            <ContainerDiv>
              <span css={`font-size: 16px; margin-bottom: 10px;`}>Description</span>
              <p css={`color: #8d8d8d;`}>{!!shortDescription ? shortDescription : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}</p>
            </ContainerDiv>
            <ContainerDiv>
              <div css={`color: ${props => props.theme.secondaryColor}; font-size: 16px;`}>{inStock ?
                `IN STOCK: ${masterProductDetails.availableQuantity}`
              :
                  'OUT OF STOCK'
                  }</div>
            </ContainerDiv>
            <ContainerDiv>
                {content.length > 0 ? 

              <TableContainer>
                  <div css={`
                    width: 100%;
                    border: 1px solid #d3d3d3;
                    border-radius: 3px;
                    box-shadow: 1px 2px 5px 0px rgba(0,0,0,0.4);
                    margin: 3% 0%;
                    padding: 10px 20px;
                  `}>
                  <Table size="small" aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        {header && header.map((head, index) => {
                          return <StyledTableCell align={index === 0 ? 'left' : 'center'} key={index}>{head}</StyledTableCell>
                        })}
                        <StyledTableCell align="center">Price</StyledTableCell>
                        <StyledTableCell align="right">Quantity</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {content.map((variant, index) => {
                        return (
                          <TableItem
                          resetInput={resetInput}
                          variant={variant} 
                          key={index} 
                          updateQuantity={(variantItem) => selectVariantToAdd(variantItem)}/>
                        )
                      })}
                    </TableBody>
                  </Table>
                  </div>

              </TableContainer>
                :
                  <SingleProduct 
                    MasterProductDetails={masterProductDetails}
                    resetInput={resetInput}
                    updateQuantity={(product) => selectVariantToAdd(product)} />
                }
                <AddToCartOptions 
                  Loading={loading} 
                  disabledIfNotInStock={!inStock}
                  addToCart={() => handleAddToCart()}
                  totalCartPrice={customerDto ? totalCartPrice : localCart.totalCartPrice}
                  itemQuantity={itemQuantity}
                  itemSubtotal={itemSubtotal} />
                <div>
                  {showOutOfStockComponent && 
                  <div css={`
                    width: 100%;
                    border: 1px solid #d3d3d3;
                    border-radius: 3px;
                    box-shadow: 1px 2px 5px 0px rgba(0,0,0,0.4);
                    margin: 3% 0%;
                    padding: 10px 20px;
                  `}>
                    <Outofstock header={header} outofstockproducts={outofstockproducts} MasterProductDetails={masterProductDetails} />
                  </div>}
                </div>
            </ContainerDiv>
            <ContainerDiv>
              <Hidden mdUp>
                <Panel productFullDescription={fullDescription} />
              </Hidden>
            </ContainerDiv>
          </Grid>
        </Grid>
        <Hidden smDown>
          <Tabs productFullDescription={fullDescription} />
        </Hidden>
      </Grid>
    </Grid>
    </motion.div>
    </>
  )
}

export async function getServerSideProps(ctx) {
  // Fetch data from external API
  console.log('run server side props for Product Detail', ctx.query.id)
  let data = {}
  const id = ctx.query.id
  if(id !== null) {
    try {
      const res1 = await Axios.get(`/ecommerce/product/${id}`)
      const productDetails = await res1.data
      data = {productDetails}
    } catch (error) {
      console.log(error)
    }
  }

  // Pass data to the page via props
  return { props: { ...data } }
}
