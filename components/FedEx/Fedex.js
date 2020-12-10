import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FedexIcon } from '../../lib/Themes/icons'

const FedexContainer = styled.div`
  background: rgba(0,0,0,0.4);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  display: flex;
  height: 100px;
  position: fixed;
  top: 70%;
  left: -240px;
  width: 320px;
  transition: all 1s ease;
  z-index: 2;
  &:hover {
    left: 0px;
    div.right-content {
      background: ${props => props.theme.secondaryColor};
    }
    div.left-content {
      background: #fff;
    }
  }
`

const FedexRightContent = styled.div`
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 90px;
  font-size: 14px;
  & * {
    margin: 5px 0px;
  }
`

const FedexLeftContent = styled.div`
  color: ${props => props.theme.secondaryColor};
  height: 100%;
  padding: 10px 15px;
  width: 230px;
  & div.timeDetails > span {
    font-weight: bold;
    font-size: 14px;
  }

  & div {
    font-size: 12px;
  }
`

const Fedex = () => {

  const [state, setState] = useState('');
  const [groundMessage, setGroundMessage] = useState('');

  useEffect(() => {
    let Timer = () => {
      // Get today's date and time
      var now = new Date().getTime();
      var currentdate = new Date(now);
      var currentday = currentdate.getDay();
      var currenthour = currentdate.getHours();

      // Find the distance between now and the count down date

      function getTimeRemaining () {
        var targetDate = new Date()
        targetDate.setHours(18)
        targetDate.setMinutes(0)
        targetDate.setSeconds(0)
        var distance = targetDate - now;
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return `${days ? days + ':' : '00:'}${hours ? hours + ':' : '00:'}${minutes ? minutes + ':' : '00:'}${seconds ? seconds < 10 ? '0' + seconds : seconds : '00'}`
      }

      if (currentday === 6 || currentday === 0) {
        return 'All further orders will ship on Monday'
      } else if (currentday === 5) {
        if(currenthour > 17) {
          return 'All further orders will ship on Monday'
        } else {
          return getTimeRemaining()
        }
      } else {
        return getTimeRemaining()
      }
    };
    setInterval(() => {
      setState(Timer());
    }, 1000);

    return () => {
      if (state) {
        clearInterval(state);
      }
    };
  }, []);


  return (
    <FedexContainer>
      <FedexLeftContent className="left-content">
        <div css={`width: 100%; height: 50%; border-bottom: 1px solid ${props => props.theme.secondaryColor};`}>
          <div className="timeDetails">
            {/* {state.days ? <span>{state.days}d </span> : ""}
            {state.hours ? <span>{state.hours}h </span> : ""}
            {state.minutes ? <span>{state.minutes}m </span> : ""}
            {state.seconds ? <span>{state.seconds}s </span> : ""} */}
            {state}
          </div>
          <div>FedEx Ground Shipping Cutoff</div>
        </div>
        <div css={`width: 100%; height: 50%; padding-top: 10px;`}>
          <div className="timeDetails">
            {/* {state.days ? <span>{state.days}d </span> : ""}
            {state.hours ? <span>{state.hours}h </span> : ""}
            {state.minutes ? <span>{state.minutes}m </span> : ""}
            {state.seconds ? <span>{state.seconds}s </span> : ""} */}
          </div>
          <div>FedEx Express Shipping Cutoff</div>
        </div>
      </FedexLeftContent>
      <FedexRightContent className="right-content">
        <FedexIcon />
        <div css={`white-space: pre-wrap; color: #fff;`}>{`FedEx\nCutoff`}</div>
      </FedexRightContent>
    </FedexContainer>
  )
}

export default Fedex
