import React from 'react';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import LoginRegister from './Step-components/LoginRegister';
import BillingInfo from './Step-components/BillingInfo';
import ShippingInfo from './Step-components/ShippingInfo';
import ShippingMethod from './Step-components/ShippingMethod';
import PaymentInfo from './Step-components/PaymentInformation';
import OrderReview from './Step-components/OrderReview';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { EditIcon } from '../../../lib/Themes/icons';



const getAddressList = (userData, addressData) => {
  const addressList = [];
  let str = ''
  addressData.forEach((store) => {
    store.customerStoreAddressList.forEach((address) => {
      addressList.push({address: `${userData.name}, ${address.address1 || ''}, ${address.address2 || ''}, ${address.city || ''}, ${address.state || ''} ${address.zip || ''}, ${address.country || ''}`,
    company: userData.company,
  name: userData.name})
    })
  })
  return addressList;
}

const ContentContainer = styled.div`
  margin: 0px 0px 0px 15px;
  padding-left: 25px;
  border-left: 1px dashed #A9A9A9;
  min-height: ${props => props.last ? 'auto' : '20px'};
`;

const StepContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0px;
  width: 100%;
  button {
    background: none;
    border: none;
    color: ${props => props.completed ? props.theme.secondaryColor : 'grey'};
    cursor: ${props => props.completed ? 'pointer' : 'default'};
    pointer-events: ${props => props.completed ? 'auto' : 'none'};
    margin-left: auto;
    outline: none;
  }

  & svg {
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.linkHoverColor};
    }
    pointer-events: ${props => props.completed ? 'auto' : 'none'};
  }

  span.label, & svg {
    font-size: 17px;
    color: ${props => props.theme.labelColor};
    margin-right: 40px;
  }
  div.tag-numb {
    background: ${props => props.completed ? props.theme.secondaryColor : props.theme.initialColor};
    border-radius: 50%;
    border: 3px solid ${props => props.active ? props.theme.secondaryColor : props.theme.numberLabelBorder};
    color: ${props => props.completed ? props.theme.primaryOnColor : props.theme.primaryOnColorV2};
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 30px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  }
`;

const Step = ({step, last, nextStep, prevStep, resetStep, editStep}) => {

  const activeStep = useSelector(state => state.checkoutReducer.activeStep);
  const userData = useSelector(state => state.checkoutReducer.userData) || {}
  const {customerDto, customerStoreDtoList} = userData;
  const completed = useSelector(state => state.checkoutReducer.completed)

  const {label, id, tag} = step;

  const handleEdit = () => {
    editStep(id)
  }

  const getContent = (id) => {
    switch (id) {
      case 1:
        return <LoginRegister id={1} next={() => nextStep()} />
      case 2:
        return <BillingInfo id={2} next={() => nextStep()} prev={() => prevStep()} skip={() => editStep(activeStep + 2)} addressData={customerStoreDtoList} />
      case 3:
        return <ShippingInfo id={3} next={() => nextStep()} prev={() => prevStep()} addressData={customerStoreDtoList} />
      case 4:
        return <ShippingMethod id={4} next={() => nextStep()} prev={() => prevStep()} />
      case 5:
        return <PaymentInfo id={5} next={() => nextStep()} prev={() => prevStep()}/>
      case 6:
        return <OrderReview id={6} reset={() => resetStep()} prev={() => prevStep()}/>
      default:
        return null;
    }
  }

  return (
    <>
    <StepContainer active={activeStep === id} completed={completed.includes(id)}>
      <div className="tag-numb"><span>{id}</span></div>
      <span className="label">{label}</span>
      <div completed={completed.includes(id)} css={`pointer-events: ${props => props.completed ? 'auto' : 'none'};`} onClick={handleEdit}><EditIcon fontSize="small" /></div>
    </StepContainer>
    <ContentContainer last={last}>
      {activeStep === id && getContent(id)}
    </ContentContainer>
    </>
  )
}

export default Step
