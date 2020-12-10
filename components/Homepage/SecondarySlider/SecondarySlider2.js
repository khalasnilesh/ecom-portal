import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import Grid from '@material-ui/core/Grid';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {SliderArrow} from '../../../lib/Themes/StyledComponents';
import styled from 'styled-components';

const Arrow = styled(SliderArrow)`
  left: ${props => props.left ? '10px' : 'unset'};
  right: ${props => props.left ? 'unset' : '10px'};
`

class SecondarySlider2 extends React.Component {
  constructor(props) {
    super(props)
  }

  responsive = {
    0: { items: 1 },
    420: { items: 1 },
    520: { items: 2 },
    920: { items: 3 }
  }

  render() {
    const {images} = this.props;
    return (
      <Grid container justify="center">
        <Grid item xs={12}>
          <div css={`position: relative; width: 100%; margin: 3% auto;`}>
            <AliceCarousel
              // stagePadding={{paddingRight: 10}}
              dotsDisabled={true}
              buttonsDisabled={true}
              responsive={this.responsive}
              fadeOutAnimation={true}
              stopAutoPlayOnHover={false}
              autoPlay={true}
              autoPlayInterval={3000}
              ref={(el) => (this.Carousel = el)}
            >
            {images.map((image, index) => {
              return (
                <div key={index} css={`width: 100%; display: flex; justify-content: center;`}>
                  <img key={index} src={image.url} css={`width: 100%;`} alt="something here"/>
                </div>
              )
            })}
            </AliceCarousel>
            <Arrow displayArrow className="arrow" left={true} onClick={() => this.Carousel.slidePrev()}>
              <ChevronLeftIcon fontSize="large" />
            </Arrow>
            <Arrow displayArrow className="arrow" left={false} onClick={() => this.Carousel.slideNext()}>
              <ChevronRightIcon fontSize="large" />
            </Arrow>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default SecondarySlider2;