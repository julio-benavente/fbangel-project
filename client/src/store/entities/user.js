import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/api";
import { createSelector } from "reselect";

const initialState = () => ({
  loading: false,
  list: [],
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
      user.list = userResponse;
      user.loading = false;

      return user;
    },
    userRequestFailed: (user, action) => {
      user = initialState();

      return user;
    },
  },
});

export default slice.reducer;
export const { userRequestFailed, userRequestSucceeded, userRequested } =
  slice.actions;

// Actions
const url = "/api/users/";

export const requestUser = () => (dispatch, getState) => {
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
  (state) => state.entities.user.list,
  (list) => list
);

export const getUserState = createSelector(
  (state) => state.entities.user,
  (userState) => userState
);
