import React from 'react';
import {Axios} from '../../../utils';
import styled from 'styled-components';
import Router from 'next/router';

const ListContainer = styled.ul`
padding: 5px 0px;
list-style: none;
`

const ListItemCateg = styled.li`
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  padding: 5px 10px;
  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
    margin-right: 10px;
  }
`



const SearchDropdown = ({text, Loading, optionSelected}) => {
  const [timer, setTimer] = React.useState(null)
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [showNoResults, setShowNoResults] = React.useState(false)
  const textRef = React.useRef('')
  const fetchResults = async () => {
    try {
      const res = await Axios.get(`/ecommerce/product/searchByProductOrCategory?searchInput=${textRef.current}`)
      if(res.status === 200) {
        const arr = Object.values(res.data)
        if(arr.every(item => item.length === 0)) {
          setShowNoResults(true)
        } else {
          setShowNoResults(false)
        }
        setResults(arr)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const cleanUp = () => {
    clearTimeout(timer)
  }

  React.useEffect(() => {
    Loading(loading)
  },[loading])
  
  React.useEffect(() => {
    textRef.current = text
    if(textRef.current.length > 1 && !loading) {
      setTimer(setTimeout(() => {
        setLoading(true)
        fetchResults()
      }, 800))
    }
    return () => {
      cleanUp()
    }
  },[text])

  const handleOptionSelect = (option) => {
    if (option.productId) {
      Router.push(`/products/[product]?id=${option.productId}`,`/products/${option.productId}?id=${option.productId}`)
    } else {
      Router.push(`/categories/[category]?id=${option.id}&name=${option.name}`, `/categories/${option.name}?id=${option.id}&name=${option.name}`)
    }
    optionSelected()
  }

  return (
    <div css={`
          width: 100%;
          position: absolute;
          background: #fff;
          /* padding: 0px 0px 10px; */
          color: ${props => props.theme.primaryColorV1};
          box-shadow: 0px 2px 5px #000;
          z-index: 5;
          max-height: 400px;
          overflow: auto;
          background: ${props => props.theme.primaryOnColor};
          `}>
          {showNoResults && <div css={`padding: 10px;`}>No results were found...</div>}
          {results.length !== 0 ? 
            <>
            {results[1] && results[1].length > 1 ?
            <ListContainer css={`border-bottom: 1px solid #A9A9A9;`}>
              {results[1].slice(0,5).map((option, index) => {
                return (
                  <ListItemCateg onClick={() => handleOptionSelect(option)} key={index}><p css={`&:hover {font-weight: bolder;}`}>{option.name}</p></ListItemCateg>
                )
              })}
            </ListContainer>
            :
            null
            }
            {results[0] && results[0].length > 0 ?
            <ListContainer>
              {results[0].slice(0,4).map((option, index) => {
                return (
                  <ListItemCateg onClick={() => handleOptionSelect(option)} css={`color: ${props => props.theme.primaryColorV2}; display: flex; align-items: center;`} key={index}>
                    <img src={option.imageUrl !== null ? option.imageUrl : 'https://image.shutterstock.com/image-vector/photo-coming-soon-symbol-600w-161251868.jpg'} alt="product" />
                    <div>
                      <p css={`&:hover {font-weight: bolder;}`}>{option.name}</p>
                      <p css={`color: #f16c21;`}>${option.standardPrice}</p>
                    </div>
                  </ListItemCateg>
                )
              })}
            </ListContainer>
            :
            null
            }
            {showNoResults ? null : <div css={`color: ${props => props.theme.secondaryColor}; width: 100%; padding: 5px 0px; text-align: center; position: sticky; bottom: 0px; background: ${props => props.theme.primaryOnColor}; border-top: 1px solid #A9A9A9; cursor: pointer;`}>View all {results[2]} results</div>}
            </>
            :
            null
          }
      
    </div>
  )
}

export default SearchDropdown
