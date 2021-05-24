import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/api";
import { createSelector } from "reselect";

const initialState = () => ({
  loading: false,
  list: [],
});

const slice = createSlice({
  name: "products",
  initialState: initialState(),
  reducers: {
    productsRequested: (products, action) => {
      products.loading = true;

      return products;
    },
    productsRequestSucceeded: (products, action) => {
      const { products: productsResponse } = action.payload;
      products.list = productsResponse;
      products.loading = false;

      return products;
    },
    productsRequestFailed: (products, action) => {
      products.loading = false;

      return products;
    },
  },
});

export default slice.reducer;
export const {
  productsRequestFailed,
  productsRequestSucceeded,
  productsRequested,
} = slice.actions;

// Actions
const url = "/api/products/";

export const requestProducts = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url,
      onStart: productsRequested,
      onSuccess: productsRequestSucceeded,
      onFailure: productsRequestFailed,
    })
  );
};

// Selectors
export const getProducts = createSelector(
  (state) => state.entities.products.list,
  (list) => list
);

export const getProductsState = createSelector(
  (state) => state.entities.products,
  (productsState) => productsState
);
