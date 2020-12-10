import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import {CheckoutBtn} from '../../../../lib/Themes/StyledComponents'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  label {
    font-size: 13px;
    color: ${props => props.theme.primaryColorV2};
    margin-bottom: 5px;
  }
  input {
    padding: 10px 10px;
    border: 1px solid ${props => props.theme.primaryColorV3};
    border-radius: 2px;
    margin-bottom: 10px;
  }
`


const CreditForm = () => {

  const [saved, setSaved] = React.useState(false);
  return (
    <Grid container>
      <Grid xs={12}>
      <div className="we-accept">
        <img
          alt="card"
          className="we-accept-img"
          src="http://themesground.com/qmart-demo/V1/images/payment-1.png"
        />
        <img
          alt="card"
          className="we-accept-img"
          src="http://themesground.com/qmart-demo/V1/images/payment-2.png"
        />
        <img
          alt="card"
          className="we-accept-img"
          src="http://themesground.com/qmart-demo/V1/images/payment-3.png"
        />
        <img
          alt="card"
          className="we-accept-img"
          src="http://themesground.com/qmart-demo/V1/images/payment-4.png"
        />
      </div>
      </Grid>
      <Grid xs={12}>
        <Formik
        initialValues={{ 
          NameOnCard: '', 
          CreditCardNumber: '', 
          ExpMonth: '',
          ExpYear: '',
          Cvv: '' }}
        validationSchema={Yup.object({
          NameOnCard: Yup.string()
            .max(30, 'Must be 30 characters or less')
            .required('Required'),
          CreditCardNumber: Yup.number()
            .required('Required'),
          ExpMonth: Yup.string()
            .max(30, 'Must be 30 characters or less')
            .required('Required'),
          ExpYear: Yup.number()
            .max(4, 'Must be 4 characters or less')
            .required('Required'),
          Cvv: Yup.number()
            .max(5, 'Must be 5 characters or less')
            .required('Required')
        })}
        onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
        }}
      >
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <StyledContainer>
                <label htmlFor="NameOnCard">Name On Card<span css={`color: ${props => props.theme.secondaryColor};`}>*</span></label>
                <Field name="NameOnCard" type="text" placeholder="John Doe"/>
                <ErrorMessage name="NameOnCard" />
              </StyledContainer>
            </Grid>
            <Grid item xs={6}>
              <StyledContainer>
                <label htmlFor="CreditCardNumber">Credit Card Number<span css={`color: ${props => props.theme.secondaryColor};`}>*</span></label>
                <Field name="CreditCardNumber" type="tel" placeholder="1111-2222-3333-4444"/>
                <ErrorMessage name="CreditCardNumber" />
              </StyledContainer>
            </Grid>
            <Grid item xs={6}>
              <StyledContainer>
                <label htmlFor="ExpMonth">Expiry Month<span css={`color: ${props => props.theme.secondaryColor};`}>*</span></label>
                <Field name="ExpMonth" type="text" placeholder="Expiry Month"/>
                <ErrorMessage name="ExpMonth" />
              </StyledContainer>
            </Grid>
            <Grid item xs={6}>
              <StyledContainer>
                <label htmlFor="ExpYear">Expiry Year<span css={`color: ${props => props.theme.secondaryColor};`}>*</span></label>
                <Field name="ExpYear" type="text" placeholder="Expiry Year"/>
                <ErrorMessage name="ExpYear" />
              </StyledContainer>
            </Grid>
            <Grid item xs={6}>
              <StyledContainer>
                <label htmlFor="Cvv">CVV<span css={`color: ${props => props.theme.secondaryColor};`}>*</span></label>
                <Field name="Cvv" type="password" placeholder="123"/>
                <ErrorMessage name="Cvv" />
              </StyledContainer>
            </Grid>
          </Grid>
          {<CheckoutBtn type="submit">Submit</CheckoutBtn>}
        </Form>
      </Formik>
      </Grid>
    </Grid>
  )
}

export default CreditForm
