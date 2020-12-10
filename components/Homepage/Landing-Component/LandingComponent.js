import React from 'react'

const LandingComponent = (props) => {
  return (
    <>
      <div css={`
        background: #000;
        z-index: 4;
        position: absolute;
        display: flex;
        width: 100vw;
        top: 0px;
        height: 100vh;
      `}>
        <div css={`width: 50vw; height: 100%; position: relative;`}>
          <div css={`position: absolute; width: 100%; height: 100%; background: rgba(0,0,0,0.5);`}></div>
          <img src="/smoke.jpg" css={`width: 100%; height: 100%; object-fit: cover;`} />
          <button onClick={() => props.hideLanding()} css={`transition: background 1s ease; font-size: ${props => props.theme.p}; width: 250px; background: none; border: 1px solid #fff; color: #fff; padding: 20px 20px; position: absolute; top: 50%; z-index: 5; left: 0; right: 0; margin: 0 auto; &:hover{ background: #000; color: #fff; cursor: pointer;}`}>Enter Smoke Shop</button>
        </div>
        <div css={`width: 50vw; height: 100%; position: relative;`}>
          <div css={`position: absolute; width: 100%; height: 100%; background: rgba(0,0,0,0.5);`}></div>
          <img src="/vape.jpg" css={`width: 100%; height: 100%; object-fit: cover;`} />
          <button onClick={() => props.hideLanding()} css={`transition: background 1s ease; font-size: ${props => props.theme.p}; width: 250px; background: none; border: 1px solid #fff; color: #fff; padding: 20px 20px; position: absolute; top: 50%; z-index: 5; left: 0; right: 0; margin: 0 auto; &:hover{ background: #000; color: #fff; cursor: pointer;}`}>Enter Vape Shop</button>
        </div>
      </div>
    </>
  )
}

export default LandingComponent
