import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { setValidAge } from '../../../store/actions/auth.action'

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  z-index: 5;
  display: ${props => props.show ? 'block': 'none'};
  background: rgba(0,0,0,0.6);
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

const Logo = styled.img`
  width: 300px;
  object-fit: contain;
  margin-left: auto;
  margin-right: auto;
  display: block;
`

const ButtonDock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 30px 0px;
`

const Buttons = styled.button`
  width: 150px;
  outline: none;
  background: ${props => props.enter ? props.theme.secondaryColor : 'grey'};
  color: ${props => props.theme.primaryOnColor};
  margin: 0 30px;
  border: none;
  padding: 10px;
  text-transform: uppercase;
  font-size: ${props => props.theme.p};
  cursor: pointer;
`

const AgeValidator = ({logo}) => {

  const dispatch = useDispatch()
  const validAge = useSelector(state => state.authReducer.validAge)

  useEffect(() => {
    const body = document.getElementsByTagName("BODY")[0];
    if (validAge === true) {
      body.style.overflow = 'auto'
    } else {
      body.style.overflow = 'hidden'
    }
  },[validAge])

  return (
    <StyledContainer show={!validAge}>
      <div css={`
        position: relative;
        width: 100%;
        height: 100%;
      `}>
        <div css={`
          width: 500px;
          height: 500px;
          position: absolute;
          left: 0; 
          right: 0;
          top: 0px;
          bottom: 0px;
          margin: auto;
          background: ${props => props.theme.primaryOnColor};
        `}>
          <Title>Age certification</Title>
          <Logo src={logo ? logo : "https://www.elementsdistribution.us/uploads/uploads/ELEMENTS-LOGO-2019-small.png"} />
          <section css={`padding: 0px 50px;`}>
            <p><strong>You must be 21 years of age or older to view this website.</strong>
            <span>By entering this website, you agree that you are 21 years of age or older.</span></p>
            <br/>
            <p>Falsifying your age for the purpose of purchasing products from this web site is illegal and punishable by law.</p>
          </section>
          <ButtonDock>
            <Buttons enter onClick={() => dispatch(setValidAge(true))}>Enter</Buttons>
            <Buttons onClick={() => window.location.href = "http://www.google.com"}>Under Age</Buttons>
          </ButtonDock>
        </div>
      </div>
    </StyledContainer>
  )
}

export default AgeValidator
