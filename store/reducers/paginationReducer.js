import update from 'immutability-helper';
import { SET_PAGINATION_DATA, SET_CURRENT_PAGE } from '../constants';

const initState = {
  first: false,
  last: false,
  totalPages: 0,
  currentPage: 0,
  pageable: {},
  size: 20
}

const setPaginationData = (state, action) =>
  update(state, {
    first: {
      $set: action.payload.first
    },
    last: {
      $set: action.payload.last
    },
    totalPages: {
      $set: action.payload.totalPages
    },
    size: {
      $set: action.payload.size
    },
    pageable: {
      $set: action.payload.pageable
    }
  })

  const setCurrentPage = (state, action) => 
    update(state, {
      currentPage: {
        $set: action.page
      }
    })
const paginationnReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return setCurrentPage(state, action)
    case SET_PAGINATION_DATA:
      return setPaginationData(state, action)
    default:
      return state;
  }
}
export default paginationnReducer;