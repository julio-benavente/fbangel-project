import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/api";
import { createSelector } from "reselect";
import moment from "moment";

const initialState = () => ({
  loading: false,
  user: null,
  lastFetch: null,
});

const slice = createSlice({
  name: "user",
  initialState: initialState(),
  reducers: {
    userRequested: (user, action) => {
      user.loading = true;

      return user;
    },
    userRequestSucceeded: (user, action) => {
      const { user: userResponse } = action.payload;
      user.user = userResponse;
      user.loading = false;
      user.lastFetch = Date.now();

      return user;
    },
    userRequestFailed: (user, action) => {
      user = initialState();

      return user;
    },
  },
});

export default slice.reducer;
export const { userRequestFailed, userRequestSucceeded, userRequested } = slice.actions;

// Actions
const url = "/api/users";

const stopRequest = (getState) => {
  const { lastFetch } = getState().entities.users;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  return diffInMinutes < 10;
};
export const requestUser = () => (dispatch, getState) => {
  if (stopRequest(getState)) {
    return;
  }

  return dispatch(
    apiCallBegan({
      url,
      onStart: userRequested,
      onSuccess: userRequestSucceeded,
      onFailure: userRequestFailed,
    })
  );
};

// Selectors
export const getUser = createSelector(
  (state) => state.entities.user.user,
  (user) => user
);

export const getUserState = createSelector(
  (state) => state.entities.user,
  (userState) => userState
);
