import React from 'react';
import {useSelector} from 'react-redux';

export default (props) => {

  const isBottomOfWindow = () => {
    function getDocHeight() {
      const D = document;
      return Math.max(
          D.body.scrollHeight, D.documentElement.scrollHeight,
          D.body.offsetHeight, D.documentElement.offsetHeight,
          D.body.clientHeight, D.documentElement.clientHeight
      )
  }
    let docheight = getDocHeight()
    let winheight = window.innerHeight || (document.documentElement || document.body).clientHeight
    let scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
    let trackLength = docheight - winheight
    let pctScrolled = Math.floor(scrollTop/trackLength * 100)
    return (
      pctScrolled > 90
    )
  }

  const handleScroll = () => {
    if(isBottomOfWindow()) {
      props.onRunFunction()
    } else {
      return;
    }
  }
  
  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  },[])


  return (
    <>
      {props.children}
    </>
  )
}