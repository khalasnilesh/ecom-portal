import React from 'react'
import AliceCarousel from 'react-alice-carousel'
import Grid from '@material-ui/core/Grid';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {SliderArrow} from '../../../lib/Themes/StyledComponents';
import styled from 'styled-components';
import GridItem from "../../Product-Grid/GridItem";
import { CONTENT_WIDTH } from '../../../lib/Themes/Mobile';


class ProductSlider2 extends React.Component {
  constructor(props) {
    super(props)
  }

  responsive = {
    0: { items: 1 },
    520: { items: 2 },
    820: { items: 3 },
    920: { items: 4 },
    1200: { items: 5 }
  }

  render() {
    const {productsData, title} = this.props;
    return (
      <Grid container justify="center">
        <Grid item 
        xs={CONTENT_WIDTH.BODY_CONTENT_WIDTH_XS} 
        sm={CONTENT_WIDTH.BODY_CONTENT_WIDTH_SM} 
        md={CONTENT_WIDTH.BODY_CONTENT_WIDTH_MD} 
        lg={CONTENT_WIDTH.BODY_CONTENT_WIDTH_LG}
        xl={CONTENT_WIDTH.BODY_CONTENT_WIDTH_XL}>
          <div css={`margin: 3% 0px;`}>
            <div css={`
                width: 100%;
                margin: 0 auto;
                p {
                width: 80%;
                margin: 0 auto;
                font-size: ${props => props.theme.p};
                padding-bottom: 5px;
                text-transform: uppercase;
                color: ${props => props.theme.secondaryColor};
                text-align: center;
                border-bottom: ${(props) => `1px solid #8d8d8d`};
                @media only screen and (min-width: 768px) {
                  width: 100%;
                  text-align: unset;
                  margin-left: 0px;
                }
              }`}>
              <p>{title}</p>
            </div>
            <div css={`position: relative; width: 100%; margin: 0 auto;`}>
              <AliceCarousel
                // stagePadding={{paddingRight: 10}}
                dotsDisabled={true}
                buttonsDisabled={true}
                responsive={this.responsive}
                fadeOutAnimation={true}
                ref={(el) => (this.Carousel = el)}
              >
              {productsData && productsData.length > 0 ? (
                productsData.map((item, index) => {
                  return <GridItem key={index} product={item} />
                })
              ): null}
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

export default ProductSlider2;