import React from "react";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";


const StyledImageContainer = styled.div`
  background: #fff;
  width: 100%;
  margin: 1% 0%;
  position: relative;
  z-index: 1;
  padding: 10px;
  ul.thumbs {
    border-top: 1px solid #DfDfDf;
    display: flex;
    justify-content: center;
    padding-top: 20px;
    & li.selected {
      border: 3px solid ${props => props.theme.primaryColor};
    }
  }
  &:hover {
    div.arrow {
      opacity: 0.7;
    }
  }
  @media only screen and (min-width: 600px) {
    margin: 5% 0%;
  }
`

const StyledUl = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  .tns-nav-active {
    border: 4px solid #000;
  }
`
const StyledLi = styled.li`
  width: 50px;
  border: 1px solid #A9A9A9;
`

export default () => {
  const getConfigurableProps = () => ({
    showArrows: true,
    showIndicators: false,
    showStatus: false,
    infiniteLoop: true,
    showThumbs: true,
    useKeyboardArrows: false,
    autoPlay: false,
    thumbWidth: 80,
    renderThumbs: () => [1,2,3].map((item, index) => {
      return (
        <img key={index} src={`/${item}.jpg`} alt="thumb" />
      )
    }),
    selectedItem: 0,
});

  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      key="product-page-img"
    >
      <StyledImageContainer>
      <Carousel {...getConfigurableProps()}>
          <img src="/1.jpg" css={`width: 100%; height: 100%; object-fit: cover;`}  alt="product" />
          <img src="/2.jpg" css={`width: 100%; height: 100%; object-fit: cover;`}  alt="product" />
          <img src="/3.jpg" css={`width: 100%; height: 100%; object-fit: cover;`}  alt="product" />
      </Carousel>
      </StyledImageContainer>
    </motion.div>
  )
}