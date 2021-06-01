import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/api";
import { createSelector } from "reselect";
import moment from "moment";

const initialState = () => ({
  loading: false,
  list: [],
  lastFetch: null,
});

const slice = createSlice({
  name: "orders",
  initialState: initialState(),
  reducers: {
    ordersRequested: (orders, action) => {
      orders.loading = true;

      return orders;
    },
    ordersRequestSucceeded: (orders, action) => {
      const { orders: ordersResponse } = action.payload;
      orders.list = ordersResponse;
      orders.loading = false;
      orders.lastFetch = Date.now();

      return orders;
    },
    ordersRequestFailed: (orders, action) => {
      orders.loading = false;

      return orders;
    },
  },
});

export default slice.reducer;
export const { ordersRequestFailed, ordersRequestSucceeded, ordersRequested } =
  slice.actions;

// Actions
const url = "/api/orders";

const stopRequest = (getState) => {
  const { lastFetch } = getState().entities.orders;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  return diffInMinutes < 10;
};

export const requestOrders = () => (dispatch, getState) => {
  if (stopRequest(getState)) {
    return;
  }

  return dispatch(
    apiCallBegan({
      url,
      onStart: ordersRequested,
      onSuccess: ordersRequestSucceeded,
      onFailure: ordersRequestFailed,
    })
  );
};

// Selectors
export const getOrders = createSelector(
  (state) => state.entities.orders.list,
  (list) => list
);

export const getOrdersState = createSelector(
  (state) => state.entities.orders,
  (ordersState) => ordersState
);
