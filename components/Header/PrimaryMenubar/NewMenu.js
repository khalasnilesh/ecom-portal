import React from 'react';
import styled from 'styled-components';
import { Hidden, Grid } from "@material-ui/core";
import { CONTENT_WIDTH } from "../../../lib/Themes/Mobile";
import { Cart } from '../../Cart/Cart';
import Router from 'next/router'


const Level2ListTitleContainer = styled.div`
  min-width: 200px;
  max-width: 100%;
  white-space: nowrap;
  height: 60px;
  display: flex;
  align-items: center;
  color: ${props => props.theme.primaryMenubarColor};
  padding: 0px 30px;
  border-bottom: 1px solid ${props => props.theme.primaryMenubarColor};
  & div {
    white-space: no-wrap; 
    font-size: 15px; 
    padding: 10px;
  }
`

const Level2List = styled.ul`
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0,0,0,.5);
    box-shadow: 0 0 1px rgba(255,255,255,.5);
  }
  border-right: ${props => props.noBorder ? 'none' : `1px dashed ${props.theme.primaryMenubarColor}`}; 
  padding: 0px 30px; 
  list-style: none; 
  width: 100%; 
  height: 430px;
  overflow-y: scroll;

`
const Level2 = (props) => {

  function handleClick(id, name, alias) {
    Router.push(`/categories/[category]?id=${id}&name=${name}`, `/categories/${alias}?id=${id}&name=${name}`);
    props.hideOverlay()
  }

  /**
   * @function renderSubCategories
   * If you want to extend the primary menubar and make it more nested then
   * Convert the below function into a component and make a nested dropdown there
   */

  const renderSubCategories = () => {
    return props.subCategory.subCategories.map((subCategory, index) => {
      return (
        <li css={`width: 100%; color: ${props => props.theme.primaryMenubarColor}; font-size: 13px;`} key={index}>
          <div css={`padding: 10px; width: 100%; white-space: nowrap; &:hover {
            color: ${props => props.theme.secondaryColor};
            cursor: pointer;
          }`} onClick={() => handleClick(subCategory.id, subCategory.name, subCategory.alias)}>
          {subCategory.name}
          </div>
        </li>
      )
    })
  }
  return (
    <>
      <Level2ListTitleContainer>
        <div>{props.subCategory.name}</div>
      </Level2ListTitleContainer>
      <Level2List noBorder={props.noBorder}>
        {props.subCategory.subCategories.length > 0 ? renderSubCategories() : null}
      </Level2List>
    </>
  )
}

const Level1Container = styled.div`
  padding: 0px 10px;
  height: 100%;
  display: flex;
  align-items: center; 
  cursor: pointer;
  color: ${props => props.theme.secondaryColor};
  &:hover {
    background: ${props => props.theme.secondaryColor};
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    color: #fff;
  }
`

const Level1Overlay = styled.div`
  display: ${props => props.show ? 'block' : 'none'}; 
  max-width: 100%; 
  position: absolute; 
  top: 40px;
  height: 500px; 
  z-index: 2;
  left: 0;
  right: 0;
  margin-left: 0px;
  margin-right: 0px;
  padding: 10px 0px 0px;
`

const Level1SubmenuListContainer = styled.ul`
  overflow-y: hidden;
  overflow-x: scroll;
  height: 100%; 
  list-style: none;
  display: flex;
  box-shadow: 0px 1px 10px rgba(0,0,0,0.2);
  background: #fff; 
  opacity: 0.97; 
`

const Level1Name = styled.div`
  font-size: 14px; 
  font-weight: bold;
  position: relative; 
  display: flex;
  align-items: center;
  height: 30px;
`

const Level1 = (props) => {

  const [showOverlay, setShowOverlay] = React.useState(false)


  const renderLevel2 = () => {
    return props.menuItem.subCategories.map((subCategory, index) => {
      return (
        <li key={index}>
          <Level2 hideOverlay={() => setShowOverlay(false)} noBorder={index === (props.menuItem.subCategories.length - 1)} subCategory={subCategory} />
        </li>
      )
    })
  }
  return (
    <Level1Container
    onMouseEnter={() => setShowOverlay(true)}
    onMouseLeave={() => setShowOverlay(false)}
    >
      <Level1Name>
        <p>{props.menuItem.name}</p>
      </Level1Name>
      {props.menuItem.subCategories.length > 0 && 
        <Level1Overlay show={showOverlay} className="overlay">
          <Level1SubmenuListContainer>
            {renderLevel2()}
          </Level1SubmenuListContainer>
      </Level1Overlay>
      }
    </Level1Container>
  )
}


/**
 * 
 * This code controls the overall size and positioning of the primary menubar menubar 
 */


 // You can set a background here for the primary menubar
 const PrimaryMenubarBackground = styled(Grid)`
    position: sticky; 
    position: -webkit-sticky;
    height: 40px;
    background: #F9F9F9;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    top: 0px; 
    z-index: 2;
 `

 const PrimaryMenubarContainer = styled(Grid)`
  position: relative;
  display: flex;
 `

 const PrimaryMenubar = styled.ul`
  width: 100%; 
  list-style: none;
  display: flex;
  justify-content: space-between;
  position: relative;
 `

const NewMenu = ({data}) => {

  const [showCart, setShowCart] = React.useState(false)



  //This function sets the state to show hide the cart icon on the primary menubar
  const handleScroll = () => {
    const ele = document.querySelector('#stick-point');
    if(ele === null) {
      return
    } else {
      const top = ele.getBoundingClientRect().top
      if (top < 0) {
        setShowCart(true)
      } else {
        setShowCart(false)
      }
    }
  }


  //This function renders all the menubar names like (Samsung, Apple, LG, Motorola)
  const renderLevel1 = () => {
    return data.map((menuItem, index) => {
      return (
        <li key={index} >
          <Level1 menuItem={menuItem} />
        </li>
      )
    })
  }

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  },[])

  return (
    <Hidden xsDown>
      <div id="stick-point"></div>
      <PrimaryMenubarBackground container justify="center">
        <PrimaryMenubarContainer item 
          xs={CONTENT_WIDTH.HEADER_CONTENT_WIDTH_XS}
          sm={CONTENT_WIDTH.HEADER_CONTENT_WIDTH_SM}
          md={CONTENT_WIDTH.HEADER_CONTENT_WIDTH_MD}
          lg={CONTENT_WIDTH.HEADER_CONTENT_WIDTH_LG}
          xl={CONTENT_WIDTH.HEADER_CONTENT_WIDTH_XL}>
          <PrimaryMenubar>
            {renderLevel1()}
          </PrimaryMenubar>
          {showCart && <Cart small />}
        </PrimaryMenubarContainer>
      </PrimaryMenubarBackground>
      <div css={`height: 10px; width: 100%;`}></div>
    </Hidden>
  )
}

export default NewMenu
