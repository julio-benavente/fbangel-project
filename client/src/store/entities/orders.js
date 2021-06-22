import { createSlice, current } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/api";
import { createSelector } from "reselect";
import { paymentsStatusChanged } from "./payments";
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
    orderStatusChanged: (orders, action) => {
      const { order: orderResponse, status } = action.payload;
      const { payments: paymentsResponse } = orderResponse;

      const index = current(orders).list.findIndex((order) => {
        return order._id === orderResponse._id;
      });
      orders.list[index].status = status;

      orders.list[index].payments.map((payment) => {
        const paymentIndex = paymentsResponse.findIndex((paymentResponse) => paymentResponse === payment._id);
        orders.list[index].payments[paymentIndex].status = status;
      });

      return orders;
    },
  },
});

export default slice.reducer;
export const { ordersRequestFailed, ordersRequestSucceeded, ordersRequested, orderStatusChanged } = slice.actions;

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

export const changeOrderStatus =
  ({ status, order }) =>
  async (dispatch, getState) => {
    try {
      const response = await dispatch(
        apiCallBegan({
          url: `${url}/change-status/${status}`,
          method: "PUT",
          onSuccess: orderStatusChanged,
          data: { order },
        })
      );

      if (response.type === orderStatusChanged.type) {
        const {
          order: { payments },
          status,
        } = response.payload;
        await dispatch(paymentsStatusChanged({ payments, status }));
      }
      return response;
    } catch (error) {
      console.log("error change order status", error);
      return error;
    }
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
