import React from 'react';
import {useDispatch} from 'react-redux';
import {setActiveCategory} from '../../../store/actions';
import Router from 'next/router'

export default (props) => {
  let dispatch = useDispatch();

  const changeActiveCategory = (data) => dispatch(setActiveCategory(data))
  
  function handleClick(id, name, alias) {
    changeActiveCategory({id, name})
    Router.push(`/categories/[category]?id=${id}&name=${name}`, `/categories/${alias}?id=${id}&name=${name}`);
    props.hideMenu()
  }

  function renderChildren(data) {
    return data.map((item, index) => {
      if (!item.subCategories || item.subCategories === null || item.subCategories.length === 0) {
          return (<li  onClick={() => handleClick(item.id, item.name, item.alias)} className="level3-name" key={index}><div>{item.name}</div></li>)
      }
      return (<li  onClick={() => handleClick(item.id, item.name, item.alias)} className="level3-name" key={index} onMouseOver={() => {
        renderChildren(item.subCategories)
      }}>{item.name}</li>)
    })
  }

  return (
    <div className="level2-container">
      <div className="level2-name"><div>{props.data.name}</div></div>
      <ul className="level2-subMenu">
      {renderChildren(props.data.subCategories)}
      </ul>
    </div>
  )
}