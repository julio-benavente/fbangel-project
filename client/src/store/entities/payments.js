import { createSlice, current } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/api";
import { createSelector } from "reselect";
import moment from "moment";

const initialState = () => ({
  loading: false,
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
      payments.lastFetch = Date.now();
      payments.loading = false;

      return payments;
    },
    paymentsRequestFailed: (payments, action) => {
      payments.loading = false;
    },
    paymentsCreated: (payments, action) => {
      const paymentsResponse = action.payload;
      paymentsResponse.map((paymentResponse) => payments.list.push(paymentResponse));
    },

    paymentsStatusChanged: (payments, actions) => {
      const { payments: paymentsResponse, status } = actions.payload;

      paymentsResponse.map((paymentResponse) => {
        const index = current(payments).list.findIndex((payment) => {
          return payment._id === paymentResponse;
        });

        payments.list[index].status = status;
      });
    },
  },
});

export default slice.reducer;
export const {
  paymentsRequestFailed,
  paymentsRequestSucceeded,
  paymentsRequested,
  paymentsStatusChanged,
  paymentsCreated,
  tierAndFirstRentPaidAdded,
} = slice.actions;

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
export const getUsersPayments = createSelector(
  (state) => state.entities.payments.list,
  (list) => list.slice().sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
);

export const getUserPayments = (id) =>
  createSelector(
    (state) => state.entities.payments.list,
    (payments) =>
      payments
        .filter((payment) => payment.payee._id === id)
        .slice()
        .sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
  );

export const getPaymentsState = createSelector(
  (state) => state.entities.payments,
  (paymentsState) => paymentsState
);
