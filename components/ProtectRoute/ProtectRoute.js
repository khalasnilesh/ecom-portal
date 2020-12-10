import React from 'react'
import {useSelector} from 'react-redux'
import Router from 'next/router'

export function ProtectRoute(Component) {
  return () => {
    const isAuthenticated = useSelector(state => !!state.authReducer.user)

      React.useEffect(() => {
          if (!isAuthenticated) Router.push('/login')
      }, [isAuthenticated])

      return (isAuthenticated ? <Component {...arguments} /> : <p>Loading...</p>)
  }
}
