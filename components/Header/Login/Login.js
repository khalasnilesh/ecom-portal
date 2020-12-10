import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { enqueueSnackbar } from '../../../store/actions/notification.actions';
import * as Yup from 'yup';
import { Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { showLogin } from '../../../store/actions/auth.action';
import SpeedIcon from '@material-ui/icons/Speed';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { Axios } from '../../../utils';
import axios from 'axios';
import Cookie from 'js-cookie';
import {loginUser, logoutUser} from '../../../store/actions/auth.action';
import { asyncfetchCartState, asyncGetUserData, asyncGetState, asyncLoginUser } from '../../../store/asyncActions/asyncActions';
import { StyledContainerForm, CheckoutBtn } from '../../../lib/Themes/StyledComponents';

const StyledErrorMessage = styled.div`
    margin-bottom: 10px;
    font-style: italic;
    font-size: 12px;
    color: ${props => props.theme.secondaryColor};
`

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  z-index: 5;
  display: ${props => props.show ? 'block': 'none'};
  background: rgba(0,0,0,0.8);
`

const Title = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.primaryOnColor};
  text-align: center;
  width: 100%;
  height: 70px;
  background: ${props => props.theme.secondaryColor};
  text-transform: uppercase;
`

const Login = () => {

  const dispatch = useDispatch()
  const showLoginBool = useSelector(state => state.authReducer.showLogin)
  const [state, setState] = React.useState({
    checkedB: false,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const login = async (user) => {
    if (user) {
      dispatch(asyncLoginUser(user))
    }
  }

  return (
    <StyledContainer show={showLoginBool}>
      <div css={`
        position: relative;
        width: 100%;
        height: 100%;
      `}>
        <div css={`
          width: 60%;
          max-width: 800px;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          left: 0; 
          right: 0;
          top: 0px;
          bottom: 0px;
          margin: auto;
        `}>
          <div css={`
            width: 100%;
            height: 45%;
            border-radius: 4px;
            position: relative;
            background: ${props => props.theme.secondaryColor};
          `}>
            <div css={`
              width: 100%;
              background: #fff;
              height: 115%;
              border-radius: 4px;
              @media only screen and (min-width: 900px) {
                width: 40%;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 5%;
                margin: auto 0 auto auto;
              }
              
            `}>
              <div css={`width: 100%; text-align: right; padding: 10px 10px 0px 0px;`}>
                <CloseIcon onClick={() => dispatch(showLogin(false))} style={{cursor: 'pointer'}} />
              </div>
              <Grid container justify="center">
                <Grid item xs={11}>
                  <h2 css={`margin-bottom: 10px;`}>Login</h2>
                </Grid>
              </Grid>
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
                    <Grid item xs={11}>
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
                    <Grid item xs={11}>
                      <CheckoutBtn type="submit">Login</CheckoutBtn>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
              <Grid container justify="center">
                <Grid item xs={11}>
                    <div css={`display: flex; align-items: center; margin-bottom: 10px;`}>
                      <input type="checkbox" />
                      <span css={`
                        margin-left: 10px; 
                        color: ${props => props.theme.primaryColorV2}; 
                        font-size: ${props => props.theme.span};
                        `}>Mark this device as trusted.
                      </span>
                    </div>
                </Grid>
              </Grid>
              <Grid container justify="center">
                <Grid item xs={11}>
                  <section css={`padding-bottom: 10px; color: ${props => props.theme.primaryColorV2}; font-size: ${props => props.theme.span};`}>
                    <p><Link href="/"><a css={`cursor: pointer; color: ${props => props.theme.secondaryColor};`}>Forgot Password?</a></Link></p>
                    <p>Don't have an account? <Link href="/"><a css={`cursor: pointer; color: ${props => props.theme.secondaryColor};`}>Create</a></Link></p>
                  </section>
                </Grid>
              </Grid>
            </div>
            <div css={`
              display: none;
              @media only screen and (min-width: 900px) {
              display: block;
              width: 50%;
              height: 100%;
              padding: 50px 0px;
              padding-left: 30px;
              }
            `}>
              <div css={`
              height: 100%;
              display: flex;
              justify-content: space-between;
              flex-direction: column;
              color: ${props => props.theme.primaryOnColor};
              & p {
                font-size: 12px;
              }
              `}>
                <section css={`display: flex; align-items: center;`}>
                  <div css={`
                    min-width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 20px;
                  `}>
                    <SpeedIcon style={{color: '#414141'}} />
                  </div>
                  <p>We appreciate your business. As part of our security, 
                  we require everyone to create an account with us. 
                  It will also allow you to move faster through the checkout process!</p>
                </section>
                <section css={`display: flex; align-items: center;`}>
                <div css={`
                    min-width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 20px;
                  `}>
                    <ShoppingCartOutlinedIcon style={{color: '#414141'}} />
                  </div>
                  <p>Multiple stores? We have a whole suite of solutions for you! 
                  For a customized tutorial please contact us.</p>
                </section>
                <section css={`display: flex; align-items: center;`}>
                <div css={`
                    min-width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 20px;
                  `}>
                    <SpeedIcon style={{color: '#414141'}} />
                  </div>
                  <p>Your account will give you access to all our different programs. 
                  Some of the programs we have LCD buyback, SWAP, Dropshipping, and more.</p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledContainer>
  )
}

export default Login
