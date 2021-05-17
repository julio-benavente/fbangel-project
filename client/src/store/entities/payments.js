import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/api";
import { createSelector } from "reselect";

const initialState = () => ({
  loading: false,
  list: [],
});

const slice = createSlice({
  name: "payments",
  initialState: initialState(),
  reducers: {
    paymentsRequested: (payments, action) => {
      payments.loading = true;

      return payments;
    },
    paymentsRequestSucceeded: (payments, action) => {
      const { payments: paymentsResponse } = action.payload;
      payments.list = paymentsResponse;
      payments.loading = false;

      return payments;
    },
    paymentsRequestFailed: (payments, action) => {
      payments = initialState();
    },
  },
});

export default slice.reducer;
export const {
  paymentsRequestFailed,
  paymentsRequestSucceeded,
  paymentsRequested,
} = slice.actions;

// Actions
const url = "/api/payments";

export const requestUserPayments =
  ({ id }) =>
  (dispatch, getState) => {
    return dispatch(
      apiCallBegan({
        url: `${url}/${id}`,
        onStart: paymentsRequested,
        onSuccess: paymentsRequestSucceeded,
        onFailure: paymentsRequestFailed,
      })
    );
  };

export const requestPayments = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url,
      onStart: paymentsRequested,
      onSuccess: paymentsRequestSucceeded,
      onFailure: paymentsRequestFailed,
    })
  );
};

// Selectors
export const getUserPayments = createSelector(
  (state) => state.entities.payments.list,
  (list) => list
);

export const getPaymentsState = createSelector(
  (state) => state.entities.payments,
  (paymentsState) => paymentsState
);
