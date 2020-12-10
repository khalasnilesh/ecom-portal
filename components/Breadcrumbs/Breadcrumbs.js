import React from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin: 0px 0px 10px;
`

const StyledLink = styled.a`
    color: ${props => props.primary ? props.theme.secondaryColor : props.theme.primaryColorV3};
    text-decoration: none;
    font-size: 12px;
    pointer-events: ${props => props.primary ? 'none' : 'auto'};
    &:hover {
      cursor: pointer;
      color: ${props => props.theme.secondaryColor};
    }
`

const splitUrlToBreadCrumbsArray = (url) => {
  return url.split('?')[0].split('/').map((location, index, arr) => {
    return {
      path: (location === '' ? '/' : `/${location}`),
      name: (location === '' ? 'HOME' : location.toUpperCase()),
      isActive: (index === arr.length - 1 ? true : false)
    }
  })
}


export default () => {
  const router = useRouter()
  const breadCrumbArr = splitUrlToBreadCrumbsArray(router.asPath)

  return (
  <StyledContainer>
    <Breadcrumbs separator={<NavigateNextIcon css={`color: ${props => props.theme.primaryColorV3};`} fontSize="small" />} aria-label="breadcrumb">
      {breadCrumbArr.map((breadcrumb, index) => {
        return (
          <Link key={index} href={breadcrumb.path} passHref><StyledLink primary={breadcrumb.isActive}>{breadcrumb.name}</StyledLink></Link>
        )
      })}
    </Breadcrumbs>
  </StyledContainer>
  )
}