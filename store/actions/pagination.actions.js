import { SET_PAGINATION_DATA, SET_CURRENT_PAGE } from "../constants";


export const setPaginationData = (data) => ({
  type: SET_PAGINATION_DATA,
  payload: data
})

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  page
})