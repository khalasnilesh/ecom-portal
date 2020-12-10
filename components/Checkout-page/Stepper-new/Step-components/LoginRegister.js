import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Grid from "@material-ui/core/Grid";
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import {addToCompleted} from '../../../../store/actions/checkout.action';
import styled from 'styled-components';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { StyledContainerForm, CheckoutBtn } from '../../../../lib/Themes/StyledComponents';
import { asyncLoginUser } from '../../../../store/asyncActions/asyncActions';


const StyledDescription = styled.p`
  font-size: ${props => props.theme.span};
  color: ${props => props.theme.primaryColorV2};
`

const StyledInputLabel = styled(InputLabel)`
  &&.MuiFormLabel-root {
    font-size: 12px;
  }
  margin-bottom: 5px;
`
const StyledInputBase = styled(InputBase)`
  &&.MuiInputBase-root {
    font-size: 12px;
  }
  padding: 3px 10px;
  width: 100%;
  border: 1px solid #A9A9A9;
`

const LoginRegisterBtn = styled.button`
  color: ${props => props.theme.primaryOnColor};
  padding: 10px;
  margin: 10px 0px;
  width: 100px;
  border: none;
  background: ${props => props.theme.secondaryColor};
`

const LoginRegister = (props) => {

  const dispatch = useDispatch()
  const {customerDto} = useSelector(state => state.checkoutReducer.userData)

  const login = async (user) => {
    if (user) {
      dispatch(asyncLoginUser(user))
    }
  }

  React.useEffect(() => {
    if (customerDto) {
      dispatch(addToCompleted(1))
      props.next()
    }
  }, [customerDto])

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <section>
          <p css={`margin-bottom: 10px; color: ${props => props.theme.secondaryColor};`}>Register to create an account</p>
          <h5>Register and save time</h5>
          <StyledDescription>Register with us for future convinience</StyledDescription>
          <br />
          <StyledDescription>Fast and easy checkout</StyledDescription>
          <StyledDescription>Easy access to your order history and status</StyledDescription>
          <CheckoutBtn onClick={() => props.next()}>Register</CheckoutBtn>
        </section>
      </Grid>
      <Grid item xs={6}>
        <p css={`margin-bottom: 10px; color: ${props => props.theme.secondaryColor};`}>Login</p>
        <h5>Already Registered?</h5>
        <StyledDescription>Please log in below:</StyledDescription>
        <br />
        <Formik
          initialValues={{
            username: '',
            password: ''
          }}
          validationSchema={Yup.object({
            username: Yup.string()
              .email('Invalid email address')
              .required('Required'),
            password: Yup.string()
              // .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]$")
              .required('Required')
          })}
          onSubmit={(values, { setSubmitting }) => {
            login(values)
            setSubmitting(false)
          }}
        >
          <Form>
            <Grid container justify="center">
              <Grid item xs={12}>
                <StyledContainerForm>
                  <label htmlFor="username">Username<span css={`color: ${props => props.theme.secondaryColor};`}>*</span></label>
                  <Field name="username" type="email" placeholder="Username"/>
                  <ErrorMessage name="username">{msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}</ErrorMessage>
                </StyledContainerForm>
                <StyledContainerForm>
                  <label htmlFor="password">Password<span css={`color: ${props => props.theme.secondaryColor};`}>*</span></label>
                  <Field name="password" type="password" placeholder="Password"/>
                  <ErrorMessage name="password">{msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}</ErrorMessage>
                </StyledContainerForm>
              </Grid>
              <Grid item xs={12}>
                <CheckoutBtn type="submit">Login</CheckoutBtn>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Grid>
    </Grid>
  )
}

export default LoginRegister
