import React from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import SearchDropdown from './SearchDropdown';
import styled from 'styled-components';

const StyledContainer = styled.div`
width: ${props => props.width ? props.width : '40%'};
            position: relative;
            input {
              width: 100%;
              border: none;
              border-radius: ${props => props.borderRadius ? props.borderRadius : '20px'};
              padding: 15px 20px;
              outline: none;
              background: ${props => props.background ? props.background : props.theme.searchBoxBackground};
              color: ${props => props.theme.primaryColorV2};
            }
`

const Searchbox = ({width, borderRadius, background}) => {
  const [value, setValue] = React.useState('');
  const [showDrop, setShowDrop] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleOptionSelected = () => {
    setValue('')
    setShowDrop(false)
  }
  React.useEffect(() => {
    if (value.length > 1) {
      setShowDrop(true);
    } else {
      setShowDrop(false)
    }
  }, [value])
  return (
    <ClickAwayListener onClickAway={() => setShowDrop(false)}>
      <StyledContainer 
        width={width ? width : null} 
        background={background ? background : null}
        borderRadius={borderRadius ? borderRadius : null} >
        <input onFocus={() => setShowDrop(true)} onChange={(e) => setValue(e.target.value)} value={value} type="text" placeholder="Search Entire Store..."/>
        {loading && <CircularProgress size={30} style={{position: 'absolute', top: '20%', right: '20%', color: '#A9A9A9'}}/>}
        <Divider orientation="vertical" style={{position: 'absolute', height: '30px', top: '20%', right: '12%', borderLeft: '1px solid #A9A9A9'}} flexItem />
        <SearchIcon  style={{fontSize: '30px', position: 'absolute', top: '18%', right: '3%', color: '#A9A9A9'}}/>
        {showDrop && <SearchDropdown Loading={(state) => setLoading(state)} text={value} optionSelected={() => handleOptionSelected()}/>}
      </StyledContainer>
    </ClickAwayListener>
  )
}

export default Searchbox
