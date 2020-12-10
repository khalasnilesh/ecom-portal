import * as actions from "../actions";
import { setPaginationData } from "../actions/pagination.actions";
import {
  fetchCartState,
  fetchCartStateReset,
  setCartState,
  startAddToCart,
  successAddToCart,
  resetAddToCart,
  removeSelectedFromCartStart,
  removeSelectedFromCartReset,
  removeSelectedFromCart,
} from "../actions/cart.action";
import { enqueueSnackbar } from "../actions/notification.actions";
import {
  setUserData,
  setBillingAddressId,
  setStoreId,
  setShippingAddressId,
  addToCompleted,
  setNewAddress,
} from "../actions/checkout.action";
import Button from "@material-ui/core/Button";
import { Axios } from "../../utils";
import axios from "axios";
import { showLogin } from "../actions/auth.action";
import Cookie from "js-cookie";

export const asyncLoginUser = (user) => async (dispatch) => {
  try {
    user.type = "customer";
    const res = await axios.post("/api/authenticate", user);
    console.log(res);
    if (res.status === 200 && res.data.success === true) {
      // axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
      axios.defaults.withCredentials = true;
      Cookie.set("token", JSON.stringify(res.data.token));
      dispatch(
        enqueueSnackbar({
          message: "Logged in successfully!",
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
          },
        })
      );
      dispatch(asyncGetUserData());
      dispatch(asyncfetchCartState());
      dispatch(asyncAddToCart());
      dispatch(showLogin(false));
    } else {
      console.log("Invalid username or password");
      dispatch(
        enqueueSnackbar({
          message: "Invalid Credentials!",
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "error",
          },
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const asyncFetchMoreProducts = (id, page) => async (dispatch) => {
  dispatch(actions.fetchCategoryProducts());
  try {
    const res = await Axios.get(
      `/product/categoryId/${id}?page=${page}&size=20`
    );
    if (res.data && res.status === 200) {
      dispatch(setPaginationData(res.data));
      dispatch(actions.fetchMoreProductsSuccess(res.data));
    } else {
      dispatch(actions.fetchCategoryProductsError());
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actions.fetchCategoryProductsReset());
  }
};
export const asyncfetchCategoryProducts = (query) => async (dispatch) => {
  dispatch(actions.fetchCategoryProducts());

  try {
    const res = await Axios.get(`/product/categoryId/${query}?page=0&size=20`);
    if (res.data && res.status === 200) {
      dispatch(setPaginationData(res.data));
      dispatch(actions.fetchCategoryProductsSuccess(res.data));
    } else {
      dispatch(actions.fetchCategoryProductsError());
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(actions.fetchCategoryProductsReset());
  }
};

// Fetch the cart state in db and replace it in redux
export const asyncfetchCartState = () => async (dispatch) => {
  dispatch(fetchCartState());
  try {
    const { status, data } = await axios.get("/api/cartLineItem/search");
    console.log(data);
    if (status === 200 && data) {
      dispatch(setCartState(data.data));
    } else {
      console.log("Error while getting cart state");
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(fetchCartStateReset());
  }
};

// Add to cart
export const asyncAddToCart = (product) => async (dispatch) => {
  dispatch(startAddToCart());
  if (product) {
    try {
      const res = await axios.post("/api/cartLineItem/addtocart", [...product]);
      console.log(res);
      if (res.status === 201) {
        dispatch(
          enqueueSnackbar({
            message: "Product added to cart!",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "success",
            },
          })
        );
        await dispatch(asyncfetchCartState());
        dispatch(successAddToCart());
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(resetAddToCart());
    }
  } else {
    let getLocalCartLineItems = localStorage.getItem("cartLineItems");
    getLocalCartLineItems = JSON.parse(getLocalCartLineItems);
    try {
      const res = await axios.post("/api/cartLineItem/addtocart", [
        ...getLocalCartLineItems,
      ]);
      console.log(res, "local");
      if (res.status === 201) {
        dispatch(
          enqueueSnackbar({
            message: "Product added to cart!",
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "success",
            },
          })
        );
        localStorage.clear();
        await dispatch(asyncfetchCartState());
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(resetAddToCart());
    }
  }
};

// Remove from cart

export const asyncRemoveSelectedFromCart = (selected) => async (dispatch) => {
  dispatch(removeSelectedFromCartStart());
  try {
    const res = await axios.delete("/api/cartLineItem/deletefromcart", {
      data: selected,
    });
    console.log("Here", res);
    if (res.status === 200) {
      dispatch(removeSelectedFromCart(selected));
      dispatch(
        enqueueSnackbar({
          message: "Products removed from cart!",
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "warning",
          },
        })
      );
    } else {
      console.log("Could not delete item");
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(removeSelectedFromCartReset());
  }
};

export const asyncUpdateCart = (selected) => async (dispatch) => {
  try {
    const res = await Axios.put("/cartLineItem/updateAll", [...selected]);
  } catch (error) {
    console.log(error);
  }
};

//Get User data
export const asyncGetUserData = (condition) => async (dispatch) => {
  try {
    const {
      status,
      data: { data, success },
    } = await axios.get("/api/customer/1");
    console.log("Here", data);
    if (status === 200 && success === true) {
      dispatch(setUserData(data));
      if (condition) {
        if (condition.billing) {
          dispatch(setStoreId(condition.storeId));
          dispatch(setBillingAddressId(condition.addressId));
          dispatch(addToCompleted(2));
        } else {
          dispatch(setShippingAddressId(condition.addressId));
          dispatch(addToCompleted(3));
        }
        dispatch(setNewAddress(true));
      }
    }
  } catch (error) {
    console.log(error);
  }
};
