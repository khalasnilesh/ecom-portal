import React from "react";
import { Carousel } from "react-responsive-carousel";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {SliderArrow} from '../../../lib/Themes/StyledComponents';
import styled from 'styled-components';

const Arrow = styled(SliderArrow)`
  left: ${props => props.left ? '10px' : 'unset'};
  right: ${props => props.left ? 'unset' : '10px'};
`



const items = [
  {
    alt: "first",
    link: "https://neocellularparts.com/pub/media/wysiwyg/magebig/layout03/1.jpg",
  },
  {
    alt: "third",
    link:
      "https://neocellularparts.com/pub/media/wysiwyg/magebig/layout03/5.jpg",
  },
  {
    alt: "forth",
    link: "https://neocellularparts.com/pub/media/wysiwyg/magebig/layout03/12.jpg",
  },
];

export default () => {

  const getConfigurableProps = () => ({
    showStatus: false,
    infiniteLoop: true,
    showThumbs: false,
    autoPlay: true,
    stopOnHover: false,
    renderArrowPrev: (onClickHandler, hasPrev, label) =>
      (
        <Arrow displayArrow className="arrow" left={true} onClick={onClickHandler}>
          <ChevronLeftIcon fontSize="large" />
        </Arrow>
      ),
    renderArrowNext: (onClickHandler, hasNext, label) =>
      (
        <Arrow displayArrow className="arrow" left={false} onClick={onClickHandler}>
          <ChevronRightIcon fontSize="large" />
        </Arrow>
      ),
    
    // transitionTime: number('transitionTime', 150, {}, valuesGroupId),
    // swipeScrollTolerance: number('swipeScrollTolerance', 5, {}, valuesGroupId),
  });

  return (
    <Carousel {...getConfigurableProps()}>
      {items.map((item, index) => {
              return (
                <LazyLoadImage effect="blur" src={item.link} alt={item.alt} key={index} /> 
              )
            })}
    </Carousel>
  );
}
