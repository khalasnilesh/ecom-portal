import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import styled from 'styled-components';
import SendIcon from '@material-ui/icons/Send';
import {NavBtn} from '../../../../lib/Themes/StyledComponents'
import axios from 'axios';
import { enqueueSnackbar } from '../../../../store/actions/notification.actions';

const GrandTotal = styled(TableCell)` 
  font-weight: bold!important;
  color: ${props => props.theme.primaryOnColor}!important;
  border: none!important;
`
const TablePriceQuantitySum = styled(TableCell)`
  color: ${props => props.theme.secondaryColor}!important;
`

const StyledOrder = styled.button`
  outline: none;
  border: 1px solid;
  border-color: ${props => props.accepted ? props.theme.secondaryColor : 'grey'};
  pointer-events: ${props => props.accepted ? 'auto' : 'none'};
  background: none;
  border-radius: 4px;
  margin: 10px;
  margin-left: auto;
  padding: 10px 20px;
  display: inline-flex;
  align-items: center;
  justify-content: space-evenly;
  transition: background 0.5s ease;
  width: 200px;
  color: ${props => props.accepted ? props.theme.secondaryColor : 'grey'};
  text-transform: uppercase;
  svg {
    color: ${props => props.accepted ? props.theme.secondaryColor : 'grey'};
  }
  &:hover {
    cursor: pointer;
    background: ${props => props.theme.secondaryColor};
    color: #fff;
    svg {
      color: #fff;
    }
  }
`

// function subtotal(items) {
//   const total = items.reduce((acc, item) => item.quantity * item.standardPrice + acc, 0);
//   return +(Math.round((total) + "e+2")  + "e-2") 
// }

export default function SpanningTable({reset, prev}) {
  const [state, setState] = React.useState({
    checkedB: false,
  });

  const dispatch = useDispatch()

  const [shippingNotes, setShippingNotes] = React.useState('')

  const [accepted, setAccepted] = React.useState(false)

  
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleTextAreaChange = (e) => {
    setShippingNotes(e.target.value)
  }

  React.useEffect(() => {
    console.log(shippingNotes)
  },[shippingNotes]);

  // API DATA

  const selectedBillingAddressId = useSelector(state => state.checkoutReducer.selectedBillingAddressId)
  const selectedStoreId = useSelector(state => state.checkoutReducer.selectedStoreId)
  const selectedShippingAddressId = useSelector(state => state.checkoutReducer.selectedShippingAddressId)
  const shippingMeth = useSelector(state => state.checkoutReducer.shippingMeth)
  const paymentInfo = useSelector(state => state.checkoutReducer.paymentInfo)
  const userData = useSelector(state => state.checkoutReducer.userData) || {}
  const {customerDto, customerStoreDtoList} = userData;

  const cartLineItems = useSelector(state => state.cartReducer.cart.cartLineItemDtoList);
  const totalCartQuantity = useSelector(state => state.cartReducer.cart.totalCartQuantity);
  const totalCartPrice = useSelector(state => state.cartReducer.cart.totalCartPrice);

  // const subtotalAmount = subtotal(cartLineItems)

  const handleOrderSubmit = async () => {
    const orderObject = {
      "orderDto": {
        "storeId": selectedStoreId,
        "salesRepresentativeId": 1,
        "customerId": customerDto.id,
        "customerShippingAddressId": selectedShippingAddressId,
        "customerBillingAddressId": selectedBillingAddressId,
        "totalQuantity": totalCartQuantity,
        "discount": 12.0,
        "totalAmount": totalCartPrice,
        "shippingAmount": 10.0,
        "taxAmount": 0.0,
        "orderTagId": 1,
        "internalNotes": "notes",
        "customerNotes": "notes",
        "shippingNotes": shippingNotes,
        "status": "Pro Forma",
        "paymentTermsId": 1,
        "shipTimestamp": null,
        "invoiceTimestamp": null,
        "dueDate": "2020-02-14 22:16:47",
        "createdBy": 1
      }
    }
    try {
      const res = await axios.post('/api/order', orderObject)
      console.log(res)
      if(res.status === 201) {
        dispatch(enqueueSnackbar({
          message: 'Order placed successfully!',
          options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
          },
      }))
      Router.push(`/thankyou/[thankyou]?id=${res.data.data.orderDto.id}`, `/thankyou/${res.data.data.orderDto.id}?id=${res.data.data.orderDto.id}`)
      } else {
        dispatch(enqueueSnackbar({
          message: 'Error while placing order!',
          options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
          },
      }))
      }
      
    } catch (error) {
      console.log(error)
      dispatch(enqueueSnackbar({
        message: 'Error while placing order!',
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'error',
        },
    }))
    }
    
    // Router.push('/thankyou')
  }

  return (
    <div css={`padding: 30px;`}>
    <div css={`
          border: 1px solid #d3d3d3;
          border-radius: 4px;
          box-shadow: 1px 2px 5px 0px rgba(0,0,0,0.4);
    `}>
    <TableContainer component={Paper}>
      <Table aria-label="spanning table">
        <TableHead>
          <TableRow css={`background: #f2f2f2;`}>
            <TableCell>Product Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartLineItems.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.productName}</TableCell>
              <TablePriceQuantitySum align="right">${product.standardPrice}</TablePriceQuantitySum>
              <TablePriceQuantitySum align="right">{product.quantity}</TablePriceQuantitySum>
              <TablePriceQuantitySum align="right">${+(Math.round((product.quantity * product.standardPrice) + "e+2")  + "e-2")}</TablePriceQuantitySum>
            </TableRow>
          ))}

          <TableRow>
            {/* <TableCell rowSpan={3} /> */}
            <TableCell css={`border: none!important; width: 100%;`} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TablePriceQuantitySum align="right">${totalCartPrice}</TablePriceQuantitySum>
          </TableRow>
          <TableRow>
            <TableCell css={`width: 100%;`} />
            <TableCell colSpan={2}>Shipping Charges</TableCell>
            <TablePriceQuantitySum align="right">$25</TablePriceQuantitySum>
          </TableRow>
          <TableRow css={`background: ${props => props.theme.secondaryColor};`}>
            <TableCell css={`width: 100%; border: none!important;`} />
            <GrandTotal colSpan={2}>Grand Total</GrandTotal>
            <GrandTotal align="right">${totalCartPrice + 25}</GrandTotal>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    <article css={`padding: 30px 0px 0px; font-size: ${props => props.theme.span}; color: ${props => props.theme.primaryColorV1};`}>
            <p>TERMS & CONDITIONS</p>
      <p css={`
          max-height: 150px; 
          overflow: scroll; 
          margin-top: 10px;
          ::-webkit-scrollbar {
            -webkit-appearance: none;
            width: 10px;
          }

          ::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background-color: rgba(0,0,0,.5);
            -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);
          }`}>
1. CUSTOMER QUALIFICATION
In order to purchase products from https://www.elementsdistribution.us/.com you must be 21 years old or older.In order to purchase you must be a valid retail business. https://www.elementsdistribution.us/.com reserves the right to request additional documentation in support of business status. https://www.elementsdistribution.us/.com reserves the right to cancel any orders that are found to be placed by non-qualified accounts.

WARNING: Products sold on this site contain nicotine, a poisonous and addictive substance. Products sold on this site are only intended for committed smokers of legal smoking age and not by non-smokers, children, women who are pregnant or may become pregnant or any person with an elevated risk of, or preexisting condition of, any medical condition which includes, but is not limited to, heart disease, diabetes, high blood pressure or asthma. If you use a product purchased from us and experience any side effects or possible side effects, stop using the product immediately and consult a physician. Products sold on this site (a) may be poisonous if orally ingested, (b) are not smoking cessation products and have not been tested nor guaranteed as such, (c) have not been evaluated by the Food and Drug Administration, (d) are not intended to treat, prevent or cure any disease or condition, and (e) should be kept out of reach of children and pets.

If you think someone has been exposed to an e-cigarette or liquid nicotine, call your local poison center at 1-800-222-1222 immediately.

2. SHIPPING
https://www.elementsdistribution.us/.com will make the best effort to ship items in a timely manner.
https://www.elementsdistribution.us/.com cannot guarantee any shipping time-frames, and external forces can cause delays in shipping.
Processing time for orders can take up to 24 hours (1 Business Day)
Once a package has shipped, https://www.elementsdistribution.us/.com will take NO responsibility in the carriers shipping time-frame.
https://www.elementsdistribution.us/.com will take NO responsibility for items lost in transit, sent to the wrong address, nor international fees charged by your country or any involved third parties.

3. INCORRECT / DAMAGED / MISSING PRODUCTS
Incorrect, damaged, or missing products must be claimed within seven days of the delivery date as indicated by your tracking information.
Glass products (Including but not limited to Pipes, Spoons, Water Pipes, and Chillums) must have damage claims made within 48 Hours of delivery confirmation.
If the product is incorrect or damaged, please send a photo of the product to support@https://www.elementsdistribution.us/.com with your order number in the subject line and a brief description of the problem in the body of the email.

4. DROP SHIP PRODUCTS
In an effort to offer an unmatched selection of high quality products, we have created a drop shipping program to continue adding new products that we cannot stock in our warehouse. Drop shipping is a service provided by a select number of vendors.
Drop shippers may not have access to all shipping methods, and therefore may use a comparable service to what you have selected.
Drop shippers are excluded from the same day shipping policy.
Drop shipped products can take 24-48 hours to process after payment is completed.
If you have a questions about an order containing drop shipped products, or if an order arrived damaged or incorrect, please email support@https://www.elementsdistribution.us/.com with the follow information:

Your order number in the subject line. This can be found in your account or on the packing slip provided with the order.
A brief description of the problem.
If a product arrived incorrect or damaged, please send images of the product for our record.
Upon receiving notice that there has been an error with a drop shipped product, we will communicate to the vendor that shipped your order to get it corrected as quickly as possible.
Not all drop shippers are product manufacturers, please do not attempt to contact a manufacturer directly with a question or concern about a drop shipped product.

5. WARRANTY AND RETURNS
Defective items may be returned within thirty days of the delivery date as indicated by your tracking information. Items damaged by miss-use or improper care are not covered by our warranty policy. For sanitary reasons, as well as the general safety of our staff, we DO NOT accept returns of: atomizers, clearomizers, cartomizers, bottled liquid, drip tips, batteries, wick, or wire. All sales on E-Liquid are final without exception. E-Liquid cannot be returned or exchanged for another flavor.
Clearance Items: All clearance items are sold as is without warranty and are not returnable. 
Return shipping is the responsibility of the customer, unless the incorrect product is sent by error of    https://www.elementsdistribution.us/.com.
Upon receipt of a return, our Returns Department will inspect and test every product. If found defective, we will  issue a store credit or replacement depending on the requested resolution of the customer. If a replacement device is  not available, https://www.elementsdistribution.us/.com reserves the right to issue a credit.
Returns must include everything that came with the product. This includes starter kits and bundled products. We  must also have the original packaging returned to us.
All returns are subject to case by case exceptions. Please contact us if you are having a problem with a product  purchased from https://www.elementsdistribution.us/.com and we will do our best to assist you.

6. PRIVACY POLICY
Elementsdistribution  takes into account the privacy of our customers. When you sign up to purchase products from Elementsdistribution  Inc. and have an active account we will need to reach out to you regarding your orders, for account information updates, and for payment information if needed. Your information is only used internally and is never sold or shared with any other companies. Once signed up you are automatically subscribed to our email list. We send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided. You can un-subscribe from our Email List at any time by clicking the Unsubscribe link on each email we send. You can also send us an email requesting to be un-subscribed to support@https://www.elementsdistribution.us/.com. Because Elementsdistribution  Inc. also has subsidiary companies, we will also add your email address to any lists that we think you may find useful. If you do not wish to receive emails from our subsidiary companies please send an email to support@https://www.elementsdistribution.us/.com to be discluded. Please read our privacy policy for any other information about how we use your personal information.

7. DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY
NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. WE DO NOT WARRANT THAT THE SERVICES, INFORMATION, CONTENT, MATERIALS, PRODUCTS OR OTHER SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE SITE, OUR SERVERS OR ELECTRONIC COMMUNICATIONS SENT FROM US ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. THIS DISCLAIMER APPLIES TO ANY DAMAGES OR INJURY CAUSED BY ANY FAILURE OF PERFORMANCE, ERROR, OMISSION, INTERRUPTION, DELETION, DEFECT, DELAY IN OPERATION OR TRANSMISSION, COMPUTER VIRUS OR ANY FORM OF MALICIOUS CODE, COMMUNICATION LINE FAILURE, THEFT, OR DESTRUCTION OR UNAUTHORIZED ACCESS TO, ALTERATION OF, OR USE OF RECORDS. YOU SPECIFICALLY ACKNOWLEDGE THAT WE ARE NOT LIABLE FOR THE DEFAMATORY, OFFENSIVE OR ILLEGAL CONDUCT OF OTHER USERS OR THIRD PARTIES AND THAT THE RISK OF INJURY FROM THE FOREGOING RESTS ENTIRELY WITH YOU. WE WILL NOT BE LIABLE FOR ANY DAMAGES OF ANY KIND ARISING FROM THE USE OF THE SERVICES, OR FROM ANY INFORMATION, CONTENT, MATERIALS, PRODUCTS OR OTHER SERVICES INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE SITE, INCLUDING, BUT NOT LIMITED TO, DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES, WHETHER BASED ON CONTRACT, TORT, STRICT LIABILITY OR OTHERWISE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IF YOU ARE DISSATISFIED WITH ANY PORTION OF THE SERVICES, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE SERVICES.

CERTAIN STATE LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE DISCLAIMERS, EXCLUSIONS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MIGHT HAVE ADDITIONAL RIGHTS.

8. QUESTIONS ABOUT TERMS OF USE
Please send any questions about Terms of Use to us at support@https://www.elementsdistribution.us/.com.

9. CHANGES TO TERMS & CONDITIONS
You can review the most current version of the Terms of Use at any time at this page.

We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Use by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Services following the posting of any changes to these Terms of Use constitutes acceptance of those changes.

Elements distribution LLC
5730 Oakbrook Parkway
Suite #105
Norcross Ga 30093
(470) 336-7929
elementsdistro@gmail.com

Elementsdistribution Distribution Georgia is a Division of Elementsdistribution  Inc headquartered in Georgia , USA</p>
    </article>
    {/* <div css={`width: 100%; display: flex; justify-content: space-between;`}>
      <ConfirmBtn isAccept onClick={() => setAccepted(true)}>Accept</ConfirmBtn>
      <ConfirmBtn>Decline</ConfirmBtn>
    </div> */}
    <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedB}
            onChange={handleChange}
            name="checkedB"
            color="primary"
          />
        }
      />
      <span css={`color: ${props => props.theme.primaryColorV1};`}>I Accept the <Link href="/"><a css={`text-decoration: underline; cursor: pointer;`}>Terms and Conditions</a></Link> & <Link href="/"><a css={`text-decoration: underline; cursor: pointer;`}>Privacy Policy</a></Link></span>
    <div>
      <textarea onChange={(e) => handleTextAreaChange(e)} maxLength={200} rows={7} placeholder="Comments for the order..." css={`width: 100%; padding: 10px; margin-top: 20px; font-style: italic;`} />
    </div>
    {
      <div css={`display: flex; align-items: center;`}>
        <div css={`font-size: 15px; & a {color: ${props => props.theme.secondaryColor};}`}>Forgot an item? <span><Link href="/cart"><a>Edit your cart</a></Link></span></div>
        <NavBtn
        active={true}
          onClick={() => prev()}
        >Back</NavBtn>
        {<StyledOrder accepted={state.checkedB}
        onClick={() => handleOrderSubmit()}
      >

      <SendIcon style={{marginRight: '5px'}}/>
      Place Order
      </StyledOrder>}
      </div>
      }
    </div>
  );
}
