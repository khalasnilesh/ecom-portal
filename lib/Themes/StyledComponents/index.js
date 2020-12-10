import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//Check out components
export const CheckoutBtn = styled.button`
  background: none;
  border: 1px solid ${props => props.theme.primaryColorV2};
  padding: 5px 20px;
  border-radius: 4px;
  color: ${props => props.theme.primaryColorV2};
  cursor: pointer;
  margin: 10px 0px;
  &:hover {
    background: ${props => props.theme.secondaryColor};
    border-color: transparent;
    color: ${props => props.theme.primaryOnColor};
  }
`

export const RedRadio = styled(Radio)`
color: ${props => props.theme.primaryColorV3};
&&.Mui-checked {
  color: ${props => props.theme.secondaryColor};
}
`
export const StyledFormControlLabel = styled(FormControlLabel)`
  border: 1px solid ${props => props.theme.primaryColorV4};
  border-radius: 2px;
  color: ${props => props.theme.primaryColorV2}!important;
  margin: 10px 0px!important;
  & span.MuiTypography-root {
    width: 100%;
  }
`

export const StyledFormControl = styled(FormControl)` 
width: 80%;
`

export const StyledDescription = styled.p`
  font-size: ${props => props.theme.span};
  color: ${props => props.theme.primaryColorV2};
  margin-bottom: 10px;
`

export const StyledInput = styled(InputBase)`
  border: 1px solid ${props => props.theme.primaryColorV4};
  border-radius: 2px;
  color: ${props => props.theme.primaryColorV2}!important;
  padding: 5px 10px;
  width: 100%;
  margin-bottom: 30px;
  && input {
    padding: 10px;
  }
  && div.MuiSelect-root {
    &:focus {
      background: transparent;
    }
  }
  &:focus {
    border-color: '#80bdff';

  }
`

export const NavBtn = styled.button`
background: ${props => props.next ? props.active ? props.theme.secondaryColor : props.theme.primaryColorV3 : 'f2f2f2'};
border: none;
color: ${props => props.color ? props.color : '#000'};
font-size: 15px;
margin: 10px;
padding: 10px 20px;
cursor: pointer;
border-radius: 4px;
outline: none;
&:hover {
  opacity: 0.5;
}
pointer-events: ${props => props.active ? 'auto' : 'none'};
`

export const StyledContainerForm = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
width: 100%;
label {
  font-size: 13px;
  color: ${props => props.theme.primaryColorV2};
  margin-bottom: 5px;
}
input {
  padding: 10px 10px;
  border: 1px solid ${props => props.theme.primaryColorV3};
  border-radius: 2px;
  margin-bottom: 10px;
}
`

export const UpdateButton = styled.div`
align-items: center;
display: flex;
color: #fff;
cursor: pointer;
background: ${props => props.viewCart ? props.theme.primaryColor : props.theme.secondaryColor};
font-size: 12px;
border-radius: 4px;
justify-content: center;
height: 40px;
width: 100px;
margin: 5% auto;
transition: all 0.5s ease;
pointer-events: ${props => props.Loading ? 'none' : 'auto'};
&& svg, && a {
  color: #fff;
}
span {
  margin: 0px 10px;
}
&:hover {
  color: ${props => props.hoverColor ? props.hoverColor : props.theme.primaryColor};
  background: ${props => props.theme.primaryOnColor};
  border: 1px solid ${props => props.hoverColor ? props.hoverColor : props.theme.primaryColor};
  && svg, && a {
    color: ${props => props.hoverColor ? props.hoverColor : props.theme.primaryColor};
  }
}
@media only screen and (min-width: 768px) {
  width: 150px;
  font-size: 14px;
}
@media only screen and (min-width: 960px) {
  width: 200px;
}
`

export const SliderArrow = styled.div`
background: ${(props) => props.background ? props.background : 'transparent'};
cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
display: flex;
align-items: center;
justify-content: center;
color: ${(props) => props.color ? props.color : props.theme.primaryOnColorV3};
top: 0px;
bottom: 0px;
opacity: ${props => props.displayArrow ? '0.7' : '0'};
position: absolute;
left: ${(props) => (props.left ? "-5%" : "unset")};
right: ${(props) => (props.left ? "unset" : "-5%")};
transition: all 0.5s ease;
svg {

  font-size: ${props => props.fontSize ? props.fontSize : '35px'};
}
&:hover {
  background: ${(props) =>
    props.hoverBackground ? props.hoverBackground : 'transparent'};
    color: ${props => props.hoverColor ? props.hoverColor : props.theme.secondaryColor};
}
&:focus {
  outline: none;
  outline-style: none;
  box-shadow: none;
  border-color: transparent;
}
z-index: 1;
`;

export const StyledGreenButton = styled.button`
  align-items: center;
  background: ${props => props.theme.secondaryColor};
  color: #fff;
  display: flex;
  justify-content: center;
  padding: ${props => props.padding ? props.padding : '5px 15px'};
  border: none;
  outline: none;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? '0.5' : 'none'};
  width: ${props => props.width ? props.width : 'auto'};
  pointer-events: ${props => props.Loading ? 'none' : 'auto'};
  span {
    white-space: nowrap;
    font-size: ${props => props.fontSize ? props.fontSize : props.theme.span};
    margin-left: 10px;
  }
  &:hover {
    opacity: ${props => props.disabled ? '0.5' : '0.8'};;
  }
`

export const UlWrapper = styled.ul`
align-items: center;
border-radius: ${props => props.borderRadius ? props.borderRadius : 'none'};
display: ${props => props.display ? props.display : 'flex'};
list-style: ${props => props.listStyle ? props.listStyle : 'none'};
background: ${props => props.background ? props.background : 'transparent'};
box-shadow: ${props => props.boxShadow ? props.boxShadow : 'none'};
position: ${props => props.position ? props.position : 'static'};
top: ${props => props.top ? props.top : '0px'};
left: ${props => props.left ? props.left : '0px'};
z-index: ${props => props.zIndex ? props.zIndex : 'inherit'};
white-space: ${props => props.whiteSpace ? props.whiteSpace : 'normal'};
`

export const LiWrapper = styled.li`
display: ${props => props.display ? props.display : 'flex'};
align-items: center;
padding: ${props => props.padding ? props.padding : '0 10px'};
position: ${props => props.position ? props.position : 'static'};
border-right: ${props => `1px solid ${props.theme.primaryColorV3}`};
cursor: ${props => props.cursor ? props.cursor : "pointer"};
&& a,
&& svg {
  color: ${props => props.theme.primaryOnColorV2};
  font-size: ${props => props.theme.span};
  font-weight: ${props => props.fontWeight ? props.fontWeight : 'normal'}
}
&:hover {
  background: ${props => props.hoverBackground ? props.hoverBackground : 'transparent'};
}
&:hover a,
&:hover svg {
  color: ${props => props.linkHoverColor ? props.linkHoverColor : props.theme.linkHoverColor};
}
&:hover .dropdown {
  display: block;
}
`

export const ContentWrapper = styled.div`
display: ${props => props.display ? props.display : 'flex'};
align-items: center;
justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
color: ${props => props.color ? props.color : props.theme.primaryOnColorV2};
font-size: ${props => props.fontSize ? props.fontSize : props.theme.span};
padding: ${props => props.padding ? props.padding : props.theme.xsSize};
svg {
  font-size: ${props => props.theme.span};
}
`