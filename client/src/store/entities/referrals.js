import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/api";
import { createSelector } from "reselect";

const initialState = () => ({
  loading: false,
  list: [],
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

export const requestReferrals = (data) => (dispatch, getState) => {
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
