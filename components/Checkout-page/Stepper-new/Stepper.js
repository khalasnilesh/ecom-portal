import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Step from './Step';
import { setActiveStep } from '../../../store/actions/checkout.action';
import styled from 'styled-components';

const StepperContainer = styled.div`
  margin: 5% 0;
  padding: 3%;
  background: ${props => props.theme.stepperBackground};
`

const Stepper = () => {
  const dispatch = useDispatch();
  const activeStep = useSelector(state => state.checkoutReducer.activeStep);
  const user = useSelector(state => state.checkoutReducer.userData)
  const {customerDto} = user

  const steps = [
    {
    label: customerDto ? `Logged In As ${customerDto.name}` : 'Login Or Register',
    tag: 'login',
    id: 1
  },
  {
    label: 'Billing Information',
    tag: 'selectedBillingAddressId',
    id: 2
  },
  {
    label: 'Shipping Information',
    tag: 'shippingInfo',
    id: 3
  },
  {
    label: 'Shipping Method',
    tag: 'shippingMeth',
    id: 4
  },
  {
    label: 'Payment Information',
    tag: 'paymentInfo',
    id: 5
  },
  {
    label: 'Order Review',
    tag: 'orderReview',
    id: 6
  }
  ];

  const handleNext = () => {
    dispatch(setActiveStep(activeStep + 1));
  };

  const handleBack = () => {
    dispatch(setActiveStep(activeStep - 1));
  };

  const handleEdit = (id) => {
    dispatch(setActiveStep(id))
  }

  const handleReset = () => {
    dispatch(setActiveStep(1));
  }

  return (
    <StepperContainer>
      {steps.map((step, index) => {
        return (
          <Step 
            last={steps.length - 1 === index} 
            activeStep={activeStep} 
            key={index} 
            step={step}
            nextStep={() => handleNext()}
            prevStep={() => handleBack()}
            resetStep={() => handleReset()}
            editStep={(id) => handleEdit(id)}
            />
        )
      })}
    </StepperContainer>
  )
}

export default Stepper
