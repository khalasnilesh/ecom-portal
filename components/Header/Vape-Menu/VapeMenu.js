import React, {useState, useEffect, useRef} from 'react'
import {useDispatch} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Skeleton from '@material-ui/lab/Skeleton';
import Router from 'next/router'
import {setActiveCategory} from '../../../store/actions';
import styled from 'styled-components';
import { Cart } from '../../Cart/Cart';
import { CircularProgress } from '@material-ui/core';

const Placeholder = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  font-size: 12px;
  padding-top: 10px;
  text-align: center;
  justify-content: space-between;
`

const VapemenuLevel2 = (props) => {
  let dispatch = useDispatch();
  const changeActiveCategory = (data) => dispatch(setActiveCategory(data))
  function handleClick(id, name, alias) {
    props.hideMenu()
    changeActiveCategory({id, name})
    Router.push(`/categories/[category]?id=${id}&name=${name}`, `/categories/${alias}?id=${id}&name=${name}`);
  }
  const renderSubmenuSubCategories = (data) => {
    return data.map((item, index) => {
      return (
        <li onClick={() => handleClick(item.id, item.name, item.alias)} className="vapeMenu-level2-subMenu-item-text" key={index}>{item.name}</li>
      )
    })
  }
  
  return (
    <div className="vapeMenu-level2-div">
      {props.subMenuData.map((subMenu, index) => {
        return (
          <ul key={index} className="vapeMenu-level2-subMenu">
            <div className="vapeMenu-level2-subMenu-title">{subMenu.name}</div>
            {subMenu.subCategories.length !== 0 ?
              renderSubmenuSubCategories(subMenu.subCategories)
              :
              null
            }
          </ul>
        )
      })}
    </div>
  )
}
const VapemenuLevel1 = (props) => {
  let [showSubmenu, setShowSubmenu] = useState(false)
  const handleShowSubmenu = (state) => {
    props.hideMenu()
    setShowSubmenu(state)
  }

  const renderSubmenuData = () => {
    return (
      <VapemenuLevel2 hideMenu={() => handleShowSubmenu(false)} subMenuData={props.menuItem.subCategories}/>
    )
  }
  return (
    <div className="vapeMenu-level1-item-container"
    >
      <div  
        className="vapeMenu-level1-item-name"
        onMouseEnter={() => handleShowSubmenu(true)}
        onMouseLeave={() => handleShowSubmenu(false)}>
        <div className="vapeMenu-level1-item-text">{props.menuItem.name}</div>
        <ExpandMoreIcon className="vapeMenu-level1-item-icon"/>
      </div>
      <div 
        className={showSubmenu ? "vapeMenu-level2-container" : "vapeMenu-level2-container-hidden"}
        onMouseEnter={() => handleShowSubmenu(true)}
        onMouseLeave={() => handleShowSubmenu(false)} 
        >
        {showSubmenu ? renderSubmenuData() : null}
        </div>
    </div>
  )
}

export default (props) => {
  let [showSubmenu, setShowSubmenu] = useState(false)
  const [showCart, setShowCart] = useState(false)

  const {data} = props;

  const handleShowSubmenu = (state) => {
    setShowSubmenu(state)
    const body = document.getElementsByTagName('BODY')[0];
    if(state) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
  }

  const handleScroll = () => {
    const ele = document.querySelector('#vape-menu-trigger');
    if(ele !== null || ele !== undefined) {
      const top = ele.getBoundingClientRect().top
      if (top < 0) {
        setShowCart(true)
      } else {
        setShowCart(false)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      handleShowSubmenu(false)
    }
  },[])

  return (
      <>
        <div id="vape-menu-trigger" />
        <Grid container id="vape-primary-menubar" css={`position: sticky; top: 0px; z-index: 3;`}>
          <Grid item xs={12} className={showSubmenu ? "vapeMenuBackground-over" : "vapeMenuBackground"}>
            <Grid container justify="center">
              <Grid item xs={11} md={10}>
                <div className="vapeMenu-container">
                  <ul className="vapeMenu-level1-list">
                    {data && data.length > 0 ? 
                    data.map((menuItem, index) => {
                      return (
                        <div key={index}>
                          <li
                            className="vapeMenu-level1-item"
                            onMouseEnter={() => handleShowSubmenu(true)}
                            onMouseLeave={() => handleShowSubmenu(false)}
                            >
                            <VapemenuLevel1 hideMenu={() => handleShowSubmenu(false)} menuItem={menuItem}/>
                          </li>
                        </div>
                      )
                    })
                      :
                      <Placeholder>
                        <CircularProgress style={{color: '#525252'}} size={20} />
                        {[1,2,3,4,5,6,7].map((item) => {
                          return (
                            <Skeleton key={item} variant="text" width={100} height={20} style={{backgroundColor: '#525252'}} />
                          )
                        })}
                      </Placeholder>
                    }
                  </ul>
                  {showCart && <Cart small margin />}
                </div>
              </Grid>
            </Grid>
          </Grid>
          <div className={showSubmenu ? 'vapeMenuOverlay-display': 'vapeMenuOverlay-hidden'}></div>
        </Grid>
      </>
  )
}