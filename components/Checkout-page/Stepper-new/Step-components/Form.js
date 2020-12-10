import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import {Axios} from '../../../../utils';
import axios from 'axios';
import { enqueueSnackbar } from '../../../../store/actions/notification.actions';
import { asyncGetUserData } from '../../../../store/asyncActions/asyncActions';

const NavBtn = styled.button`
  background: ${props => props.background ? props.background : 'none'};
  border: none;
  color: ${props => props.color ? props.color : '#000'};
  font-size: 15px;
  margin: 10px;
  margin-left: 0px;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  outline: none;
  &:hover {
    background: ${props => props.hoverBackground ? props.hoverBackground : '#f5f5f5'};
  }
`

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
  input, select {
    padding: 10px 10px;
    border: 1px solid ${props => props.theme.primaryColorV3};
    outline: none;
    color: ${props => props.theme.primaryColorV2};
    border-radius: 2px;
    margin-bottom: 10px;
  }
`

const StyledErrorMessage = styled.div`
    margin-bottom: 10px;
    font-style: italic;
    font-size: 12px;
    color: ${props => props.theme.secondaryColor};
`

export default function AddressForm(props) {
  const activeStep = useSelector(state => state.checkoutReducer.activeStep)



  const [saved, setSaved] = React.useState(false);
  const [states, setStates] = React.useState([]);
  const dispatch = useDispatch()


  const renderChildStates = () => {
    if(states.length > 0) {
      return states.map((state, index) => {
          return (
            <option key={index} value={state.name}>{state.name}</option>
          )
        })
    } else {
      return (
        <div></div>
      )
    }
  }

  const getStates = async () => {
    try {
      const {data} = await axios.get('/api/state')
      setStates(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    getStates()
  },[])

  const handleSubmitToDb = async (reqObj) => {
    try {
      const res = await axios.post('/api/customer/address', {
        ...reqObj
      })
      if (res.status === 201) {
        dispatch(enqueueSnackbar({
          message: 'Address added to address book!',
          options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
          },
      }))
      dispatch(asyncGetUserData({form: true, storeId: props.storeId, addressId: res.data.id, billing: props.billing || false}))
      // dispatch(setBillingStoreId(props.storeId))
      // dispatch(setBillingAddressId(res.data.id))
      props.setStoreId(props.storeId)
      if(props.billing) {
        props.setBillingAddressIdForm(res.data.id)
        props.setShipping('diff')
      } else {
        props.setShippingAddressIdForm(res.data.id)
      }
      }
    } catch (error) {
      console.log(error)
    }
  }
  


  return (
    <Formik
      initialValues={{ 
        address1: '',
        address2: '',
        vatNumber: '',
        country: '',
        stateProvince: '',
        city: '',
        zipPostal: '',
        mobile: '', }}
      validationSchema={Yup.object({
        address1: Yup.string()
          .max(100, 'Must be 100 characters or less')
          .required('Required'),
        address2: Yup.string()
          .max(100, 'Must be 100 characters or less'),
        vatNumber: Yup.string().max(50, 'Must be 50 characters or less'),
        country: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        stateProvince: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        city: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        zipPostal: Yup.number()
          .typeError('Must Be Number')
          .required('Required'),
        mobile: Yup.number().typeError('Must Be Number')
          .test('length', 'Must be of 10 characters', val => val.toString().length === 10)
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
          const reqObj = {
            "customerStoreId": props.storeId,
            "address1": values.address1,
            "address2": values.address2,
            "city": values.city,
            "state": values.stateProvince,
            "country": values.country,
            "zip": values.zipPostal,
            "phone": values.mobile,
            "defaultBillingAddress": true,
            "defaultShippingAddress": true
          }
          handleSubmitToDb(reqObj)
          setSubmitting(false);
      }}
    >
      <Form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StyledContainer>
              <label htmlFor="address1">Address<span css={`color: ${props => props.theme.secondaryColor};`}>*</span></label>
              <Field name="address1" type="text" placeholder="Address"/>
              <ErrorMessage name="address1">{msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}</ErrorMessage>
              <Field name="address2" type="text" />
              <ErrorMessage name="address2">{msg => <div>{msg}</div>}</ErrorMessage>
            </StyledContainer>
          </Grid>
          <Grid item xs={12}>
            <StyledContainer>
              <label htmlFor="vatNumber">VAT Number<span css={`color: ${props => props.theme.secondaryColor};`}>*</span></label>
              <Field name="vatNumber" type="tel" placeholder="VAT Number"/>
              <ErrorMessage name="vatNumber">{msg => {
                return (
                  <StyledErrorMessage>{msg}</StyledErrorMessage>
                )
              }}</ErrorMessage>
            </StyledContainer>
          </Grid>
          <Grid item xs={6}>
            <StyledContainer>
              <label htmlFor="country">Country<span css={`color: ${props => props.theme.secondaryColor};`}>*</span></label>
              <Field name="country" type="text" placeholder="Country"/>
              <ErrorMessage name="country">{msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}</ErrorMessage>
            </StyledContainer>
          </Grid>
          <Grid item xs={6}>
            <StyledContainer>
              <label htmlFor="stateProvince">State/Province<span css={`color: ${props => props.theme.secondaryColor};`}>*</span></label>
              <Field name="stateProvince" as="select" placeholder="State/Province">
                {renderChildStates()}
              </Field>
              <ErrorMessage name="stateProvince">{msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}</ErrorMessage>
            </StyledContainer>
          </Grid>
          <Grid item xs={6}>
            <StyledContainer>
              <label htmlFor="city">City<span css={`color: ${props => props.theme.secondaryColor};`}>*</span></label>
              <Field name="city" type="text" placeholder="City"/>
              <ErrorMessage name="city">{msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}</ErrorMessage>
            </StyledContainer>
          </Grid>
          <Grid item xs={6}>
            <StyledContainer>
              <label htmlFor="zipPostal">ZIP/Postal<span css={`color: ${props => props.theme.secondaryColor};`}>*</span></label>
              <Field name="zipPostal" type="tel" placeholder="Zip/Postal"/>
              <ErrorMessage name="zipPostal">{msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}</ErrorMessage>
            </StyledContainer>
          </Grid>
          <Grid item xs={6}>
            <StyledContainer>
              <label htmlFor="mobile">Mobile<span css={`color: ${props => props.theme.secondaryColor};`}>*</span></label>
              <Field name="mobile" type="tel" placeholder="Mobile Number"/>
              <ErrorMessage name="mobile">{msg => <StyledErrorMessage>{msg}</StyledErrorMessage>}</ErrorMessage>
            </StyledContainer>
          </Grid>
        </Grid>
        {saved ? <span css={`color: green; font-style: italic;`}>New Address is saved!</span>: <NavBtn background="#414141" hoverBackground="#9c0000" color="#fff" type="submit">Submit</NavBtn>}
      </Form>
    </Formik>
  );
};
