import React, {useState} from 'react';
import Router from 'next/router'
import {useDispatch} from 'react-redux';
import {setActiveCategory} from '../../../store/actions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';

const DropdownContainerDiv = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
  border-left: ${props => props.border ? `1px solid ${props.theme.sidemenuDropdownInsideBorderColor}` : 'none'};
  margin-left: ${props => props.border ? '10px' : '0'};
  ul {
    padding-top: 10px;
    list-style: none;
  }
`
const PrimaryNameDiv = styled.div`
  align-items: center;
  display: flex;
  font-size: 15px;
  justify-content: space-between;
  padding: 4%;
  text-transform: uppercase;
  transition: all 0.3s linear;
  background: ${props => props.isActive ? props.theme.sidemenuActiveDropdownBackground : 'transparent'};
  color: ${props => props.isActive ? props.theme.sidemenuActiveDropdownColor : props.theme.primaryOnColorV2};
  && svg {
    font-size: ${props => props.theme.h3};
    transform: ${props => props.isActive ? 'rotate(180deg)' : 'unset'};
    transition: all 0.3s linear;
  }
`

const SecondaryNameDiv = styled.div`
  display: flex;
  text-transform: uppercase;
  font-size: ${props => props.theme.span};
  background: ${props => props.isActive ? props.theme.sidemenuActiveDropdownBackground : 'transparent'};
  color: ${props => props.isActive ? props.theme.sidemenuActiveDropdownColor : props.theme.primaryOnColorV2};
  && svg {
    font-size: ${props => props.theme.span};
    transform: ${props => props.isActive ? 'rotate(180deg)' : 'unset'};
    transition: all 0.3s linear;
  }
  justify-content: space-between;
  padding: 5% 10%;
`

export const Dropdown = (props) => {

  const dispatch = useDispatch();

  const [isOpen, setOpen] = useState(false)
  function handleClick(id, name, alias) {
    dispatch(setActiveCategory({id, name}))
    Router.push(`/categories/${alias}?id=${id}&name=${name}`);
  }

  const renderPrimaryName = () => {
    if (props.mainMenuItem.subCategories.length > 0) {
      return (
        <PrimaryNameDiv onClick={() => setOpen(!isOpen)} isActive={isOpen}>
          <div>{props.mainMenuItem.name}</div>
          <ExpandMoreIcon />
        </PrimaryNameDiv>
      )
    }
    return (
      <PrimaryNameDiv>{props.mainMenuItem.name}</PrimaryNameDiv>
    )
  }

  const renderName = () => {
    if (props.mainMenuItem.subCategories.length > 0) {
      return (
        <SecondaryNameDiv onClick={() => setOpen(!isOpen)} isActive={isOpen}>
          <div>{props.mainMenuItem.name}</div>
          <ExpandMoreIcon />
        </SecondaryNameDiv>
      )
    }
      return (
        <SecondaryNameDiv onClick={() => handleClick(props.mainMenuItem.id, props.mainMenuItem.name, props.mainMenuItem.alias)}>{props.mainMenuItem.name}</SecondaryNameDiv>
      )
  }

  return (
    <div css={`border-bottom: ${props => `1px solid ${props.theme.sidemenuDropdownItemBorderColor}`};`}>
      {props.primary ? renderPrimaryName() : renderName()}
      <DropdownContainerDiv show={isOpen} border={isOpen}>
        {props.mainMenuItem.subCategories !== null  && props.mainMenuItem.subCategories.length > 0 ? (
            <ul>
              {props.mainMenuItem.subCategories.map((mainMenuItem, index) => {
                return (
                  <li key={index}>
                    {<Dropdown mainMenuItem={mainMenuItem} />}
                  </li>
                )
              })}
            </ul>
          ) : null}
      </DropdownContainerDiv>
    </div>
  )
}

export default Dropdown;