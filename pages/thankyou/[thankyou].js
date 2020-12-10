import React from 'react'
import { Grid, Hidden } from '@material-ui/core'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import {motion} from 'framer-motion';

const StyledOrder = styled.button`
  outline: none;
  border: 1px solid;
  border-color: ${props => props.theme.secondaryColor};
  background: none;
  border-radius: 4px;
  padding: 10px 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.5s ease;
  width: 200px;
  color: ${props => props.theme.secondaryColor};
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
    background: ${props => props.theme.secondaryColor};
    color: #fff;
  }
`

const thankyou = (props) => {
  const router = useRouter()
  const _id = router.query.id;
  return (
    <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
      <Grid container justify="center">
        <Grid item xs={10}>
          <div css={`display: flex; height: 600px; padding: 50px 0px; flex-direction: column; align-items: center;`}>
            <CheckCircleRoundedIcon style={{fontSize: '150px', color: 'green', marginBottom: '40px'}} />
            <h1 css={`font-size: 40px; margin-bottom: 20px;`}>Thank you.</h1>
            <h2 css={`margin-bottom: 50px;`}>Your order number {_id} was placed successfully.</h2>
            <div css={`display: flex; align-items: center; margin-bottom: 40px;`}>
              <MailOutlineIcon style={{fontSize: '50px'}} />
              <div css={`margin-left: 20px;`}>
                <p>An email receipt including the details about the order has been</p>
                <p>sent to the email address provided. Please keep it for your records.</p>
              </div>
            </div>
            <StyledOrder onClick={() => router.push('/')}>Continue Shopping</StyledOrder>
          </div>
        </Grid>
      </Grid>
    </motion.div>
  )
}

export default thankyou
