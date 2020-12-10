import React from 'react'
import {useDispatch} from 'react-redux';
import Stepper from '../components/Checkout-page/Stepper-new/Stepper';
import Panel from '../components/Checkout-page/ReviewOrder/Panel';
import Grid from "@material-ui/core/Grid";
import {CONTENT_WIDTH} from '../lib/Themes/Mobile';
import styled from 'styled-components';
import { motion } from 'framer-motion';


const Heading = styled.p`
  color: ${props => props.theme.primaryOnColor};
  display: flex;
  align-items: center;
  height: 70px;
  font-size: ${props => props.theme.h3};
`

const OrderReviewContainer = styled.div`
  width: 100%;
  max-width: 500px;
  position: sticky;
  top: 55px;
  bottom: 5%;
  margin-bottom: 20px;
  padding: 0px 20px;
  margin: 10% 0;
`

const checkout = (props) => {

  return (
    <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
      <Grid container justify="center">
        <Grid item xs={12}>
          <Grid container justify="center" css={`background: ${props => props.theme.secondaryColor};`}>
            <Grid item xs={11} sm={10}>
              <Heading>Check out</Heading>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={11} sm={10}>
              <Grid container justify="space-between">
                <Grid item xs={12} sm={8}>
                  <Stepper />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <OrderReviewContainer>
                    <Panel />
                  </OrderReviewContainer>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </motion.div>
  )
}

export async function getStaticProps () {
  return { props : {}}
}

export default checkout;
