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
  name: "referrals",
  initialState: initialState(),
  reducers: {
    referralsRequested: (referrals, action) => {
      referrals.loading = true;

      return referrals;
    },
    referralsRequestSucceeded: (referrals, action) => {
      const { referrals: referralsResponse } = action.payload;
      referrals.list = referralsResponse;
      referrals.loading = false;
      referrals.lastFetch = Date.now();

      return referrals;
    },
    referralsRequestFailed: (referrals, action) => {
      referrals = initialState();

      return referrals;
    },
  },
});

export default slice.reducer;
export const {
  referralsRequestFailed,
  referralsRequestSucceeded,
  referralsRequested,
} = slice.actions;

// Actions
const url = "/api/users/get-referrals";

const stopRequest = (getState) => {
  const { lastFetch } = getState().entities.referrals;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  return diffInMinutes < 10;
};

export const requestReferrals = (data) => (dispatch, getState) => {
  if (stopRequest(getState)) {
    return;
  }

  return dispatch(
    apiCallBegan({
      url,
      data,
      method: "POST",
      onStart: referralsRequested,
      onSuccess: referralsRequestSucceeded,
      onFailure: referralsRequestFailed,
    })
  );
};

// Selectors
export const getReferrals = createSelector(
  (state) => state.entities.referrals.list,
  (list) => list
);

export const getReferralsState = createSelector(
  (state) => state.entities.referrals,
  (referralsState) => referralsState
);
