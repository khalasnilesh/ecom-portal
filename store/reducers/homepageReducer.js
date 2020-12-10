import { 
  SET_SLIDER_LISTS,
  SET_BUSINESS_TYPE
} from '../constants';
import update from 'immutability-helper';

const initState = {
  businessType: '',
  sliderLists: {
    primarySliderList: [],
    secondarySliderList: []
  }
}

const setBusinessType = (state, action) => 
  update(state, {
    businessType: {
      $set: action.payload
    }
  })


const setSliderLists = (state, action) => 
  update(state, {
    sliderLists: {
      $set: action.payload
    }
  })

const homepageReducer = (state = initState, action) => {
  switch(action.type) {
    case SET_BUSINESS_TYPE:
      return setBusinessType(state, action);
    case SET_SLIDER_LISTS:
      return setSliderLists(state, action);
    default: 
      return state;
  }
}

export default homepageReducer
