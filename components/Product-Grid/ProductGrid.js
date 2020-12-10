import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Filters from './Filters';
import { CONTENT_WIDTH } from '../../lib/Themes/Mobile';
import BreadCrumbs from '../Breadcrumbs/Breadcrumbs';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Hidden from "@material-ui/core/Hidden";
import GridListTile from '@material-ui/core/GridListTile';
import Grid from '@material-ui/core/Grid';
import GridItem from './GridItem';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Skeleton from '@material-ui/lab/Skeleton';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import dynamic from 'next/dynamic';
import {setCurrentPage} from '../../store/actions/pagination.actions';
import {asyncFetchMoreProducts} from '../../store/asyncActions/asyncActions';
import { setBulk } from '../../store/actions/cart.action';



const AddToBulkBtn = styled.button`
    position: fixed;
    width: 100px;
    right: 0px;
    top: 400px;
    padding: 10px;
    cursor: pointer;
    border: none;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    color: ${props => props.theme.primaryOnColor};
    background: ${props => props.addToBulk ? props.theme.primaryColor : props.theme.secondaryColor};
    z-index: 2;
    outline: none;
`

const InfiniteScroll = dynamic(() => import('../../components/InfiniteScroll/InfiniteScroll'), {
  ssr: false
})

const GridTitleContainer = styled.div`
  border-bottom: 2px solid #ece8e8;
  padding: 1% 0;
  @media only screen and (min-width: 600px) {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  @media only screen and (min-width: 980px) {
    
  }
`

const GridTitleLeft = styled.div`
  text-align: center;
  svg {
    display: none;
  }
  h4 {
    font-size: ${props => props.theme.p};
    white-space: nowrap;
  }
  p {
    font-size: ${props => props.theme.p};
    color: ${props => props.theme.primaryColorV1};
    white-space: nowrap;
  }
  @media only screen and (min-width: ${props => props.theme.smBreakpoint}) {
    display: flex;
    align-items: center;
    h4 {
      font-size: ${props => props.theme.h4};
    }
    * {
      margin-right: 1%;
    }
    svg {
      display: block;
    }
  }
`

const GridTitleRight = styled.div`
  display: none;
  @media only screen and (min-width: 600px) {
    align-items: center;
    color: #414141;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    div.productGridTitle-sort-text {
      margin-right: 8%;
      white-space: nowrap;
    }
  }
`

const GridListCentered = withStyles({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    margin: '0px !important'
  }
})(GridList);

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: (props) => (props.minWidth ? props.minWidth : "80px"),
    width: '100%',
    borderRadius: '0px',
    marginRight: '10px',
  },
  icon: {
    top: '8px'
  },
  select: {
    fontSize: '10px'
  }
}));

/**
 * To Do
 * 
 * product grid height and width for desktop tabs and mobile
 * product image size for desktop tabs and mobile
 * number of products in one row 4 or 5 only for desktop
 * show left filter true or false
 * Button components :- Add Remove AddToCart
 */
const SpacingGrid = (props) => {
  const classes = useStyles(props)



  const router = useRouter();
  const dispatch = useDispatch()
  const _id = router.query.id;
  const title = router.query.name;

  const [fetchMore, setFetchMore] = React.useState(false)
  const page = useSelector((state) => state.paginationReducer.currentPage)
  const last = useSelector((state) => state.paginationReducer.last)
  const fetchCategoryProductsReqStatus = useSelector((state) => state.categoryProductsReducer.fetchCategoryProductsReqStatus)
  const categoryProducts = useSelector((state) => state.categoryProductsReducer.categoryProducts)
  const totalCount = useSelector((state) => state.categoryProductsReducer.totalCount)
  const addToBulk = useSelector(state => state.cartReducer.addToBulk)

  React.useEffect(() => {
    const fetchMoreProducts = () => {
      if (!last && fetchCategoryProductsReqStatus === 'REQUEST_RESET'){
        let newpage = page + 1;
        dispatch(setCurrentPage(newpage))
        dispatch(asyncFetchMoreProducts(_id, newpage))
        console.log('Page fetching started')
      } else {
        console.log('DO Nothing')
      }
      setFetchMore(false)
    }
    if(fetchMore) {
      console.log('Effect')
      fetchMoreProducts()
    } else {
      console.log('Nothing')
    }
  }, [fetchMore])

  const getGridListTileWidth = () => {
    if (isWidthUp('lg', props.width)) {
      return '20%';
    }
    if (isWidthUp('md', props.width)) {
      return '23%';
    }
    if (isWidthUp('sm', props.width)) {
      return '30%';
    }

    return '47%';
  }

  const getGridListTileMargin = () => {
    if (isWidthUp('lg', props.width)) {
      return 0;
    }
    if (isWidthUp('md', props.width)) {
      return 8;
    }
    if (isWidthUp('sm', props.width)) {
      return 8;
    }

    return 3;
  }

  const getGridListCols = () => {

    if (isWidthUp('md', props.width)) {
      return 5;
    }
    if (isWidthUp('sm', props.width)) {
      return 3;
    }

    return 2;
  }

  const renderGridItems = () => {
    return categoryProducts.map((item, index) => (
      <GridListTile key={index} style={{ width: getGridListTileWidth(), height: 'auto', padding: 0, margin: getGridListTileMargin() }}>
        <GridItem grid product={item} />
      </GridListTile>
    ))
  }

  const renderGridPlaceholders = () => {
    return [0, 1, 2, 3, 4].map((item, index) => (
      <GridListTile key={index} style={{ width: getGridListTileWidth(), height: 'auto', padding: 0, margin: getGridListTileMargin() }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Skeleton variant="rect" width={200} height={150} />
          <Skeleton variant="text" width="80%" />
          <Skeleton variant="text" width="50%" />
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="20%" style={{ margin: '30px 0' }} />
          <Skeleton variant="rect" width={100} height={30} />
        </div>
      </GridListTile>
    ))
  }

  return (
    <>
    <Grid container justify="center">
      <Grid item
        xs={CONTENT_WIDTH.BODY_CONTENT_WIDTH_XS}
        sm={CONTENT_WIDTH.BODY_CONTENT_WIDTH_SM}
        md={CONTENT_WIDTH.BODY_CONTENT_WIDTH_MD}
        style={{ margin: '1% 0' }}>
        <AddToBulkBtn addToBulk={addToBulk}
        onClick={() => dispatch(setBulk(true))}>QUICK ADD</AddToBulkBtn>
        <Grid container justify="space-between">
          {/* <Hidden smDown>
            <Grid item md={3} lg={3} xl={2} css={`padding-right: 10px;`}>
              <Filters />
            </Grid>
          </Hidden> */}
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Grid item xs={12}>
              <BreadCrumbs />
              <h2 css={`
                  font-size: ${props => props.theme.h3};
              `}>{title ? title : 'Title'}</h2>
              {/* <p css={`padding: 10px 0px; font-size: ${props => props.theme.span}; color: ${props => props.theme.primaryColorV2};`}>Pulsar Offers world-class water pipes, hand pipes, vaporizers, silicone goods and other smoking supplies for both herb and oil. Your customers will love a large selection of smoking supplies at affordable prices.</p>
              <div css={`width: 100%; height: 300px; span { height: 300px; }`}>
                <LazyLoadImage effect="blur" css={`width: 100%; object-fit: cover; max-height: 100%;`} src="https://www.qualitymag.com/ext/resources/Default_Images/NewDefault0415/QM-DEPTs-900x550-NewProds.jpg?1544719037" />
              </div> */}
              <GridTitleContainer>
                <GridTitleLeft>
                  <FormatListBulletedOutlinedIcon />
                  <Hidden xsUp>
                    <h4>{title ? title : 'Title'}</h4>
                  </Hidden>
                  <p>{totalCount ? `${totalCount} item(s)` : '0 item(s)'}</p>
                </GridTitleLeft>
                <GridTitleRight>
                  <div className="productGridTitle-sort-text">Sort By</div>
                  <FormControl variant="outlined" size='small' className={classes.formControl}>
                    <Select
                      value="none"
                      classes={{
                        select: classes.select,
                        icon: classes.icon
                      }}
                    >
                      <MenuItem value="none">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Name</MenuItem>
                      <MenuItem value={20}>Price</MenuItem>
                    </Select>
                  </FormControl>
                </GridTitleRight>
              </GridTitleContainer>
            </Grid>
            <Grid item xs={12}>
              <GridListCentered cols={getGridListCols()}>
                {categoryProducts.length !== 0 ? renderGridItems() : null}
                {fetchCategoryProductsReqStatus === 'REQUEST_START' ? renderGridPlaceholders() : null}
              </GridListCentered>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <InfiniteScroll onRunFunction={() => setFetchMore(true)} />
    </>
  );
}

export default withWidth()(SpacingGrid);