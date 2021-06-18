import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/api";
import { createSelector } from "reselect";
import moment from "moment";

const initialState = () => ({
  loading: false,
  tier: "tierOne",
  firstRentPaid: false,
  list: [],
  lastFetch: null,
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
      const {
        payments: { list, firstRentPaid, tier },
      } = action.payload;
      payments.list = list || payments.list;
      payments.tier = tier || payments.tier;
      payments.firstRentPaid = firstRentPaid || payments.firstRentPaid;
      payments.lastFetch = Date.now();
      payments.loading = false;

      return payments;
    },
    paymentsRequestFailed: (payments, action) => {
      payments.loading = false;
    },
  },
});

export default slice.reducer;
export const { paymentsRequestFailed, paymentsRequestSucceeded, paymentsRequested } = slice.actions;

// Actions
const url = "/api/payments";

const stopRequest = (getState) => {
  const { lastFetch } = getState().entities.payments;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  return diffInMinutes < 10;
};

export const requestUserPayments =
  ({ id }) =>
  (dispatch, getState) => {
    if (stopRequest(getState)) {
      return;
    }

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
  if (stopRequest(getState)) {
    return;
  }

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
