import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import Grid from '@material-ui/core/Grid';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {SliderArrow} from '../../../lib/Themes/StyledComponents';

class Gallery extends React.Component {
  constructor(props) {
    super(props)
  }

  responsive = {
    0: { items: 1 },
    420: { items: 1 },
    520: { items: 2 },
    720: { items: 3 },
    1200: { items: 5 }
  }

  render() {
    const {images} = this.props;
    return (
      <Grid container justify="center">
        <Grid item xs={12} md={10}>
          <div css={`width: 100%; margin: 3% 0px;`}>
            <div css={`width: 100%; text-align: center;`}>
              <h3>Some Popular Brands We Offer</h3>
            </div>
            <div css={`position: relative; width: 90%; margin: 0 auto;`}>
              <AliceCarousel
                dotsDisabled={true}
                buttonsDisabled={true}
                responsive={this.responsive}
                fadeOutAnimation={true}
                ref={(el) => (this.Carousel = el)}
              >
              {images.map((image, index) => {
                return (
                  <div key={index} css={`width: 100%; display: flex; justify-content: center;`}>
                    <img key={index} src={image.url} css={`width: 200px;`} alt="something here"/>
                  </div>
                )
              })}
              </AliceCarousel>
              <SliderArrow displayArrow className="arrow" left={true} onClick={() => this.Carousel.slidePrev()}>
                <ChevronLeftIcon fontSize="large" />
              </SliderArrow>
              <SliderArrow displayArrow className="arrow" left={false} onClick={() => this.Carousel.slideNext()}>
                <ChevronRightIcon fontSize="large" />
              </SliderArrow>
            </div>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default Gallery;