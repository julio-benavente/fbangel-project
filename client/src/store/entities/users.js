import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/api";
import { createSelector } from "reselect";

const initialState = () => ({
  loading: false,
  list: [],
});

const slice = createSlice({
  name: "users",
  initialState: initialState(),
  reducers: {
    usersRequested: (users, action) => {
      users.loading = true;

      return users;
    },
    usersRequestSucceeded: (users, action) => {
      const { users: usersResponse } = action.payload;
      users.list = usersResponse;

      return users;
    },
    usersRequestFailed: (users, action) => {
      users = initialState();

      return users;
    },
  },
});

export default slice.reducer;
export const { usersRequestFailed, usersRequestSucceeded, usersRequested } =
  slice.actions;

// Actions
const url = "/api/users";

export const requestUsers = () => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url,
      onStart: usersRequested,
      onSuccess: usersRequestSucceeded,
      onFailure: usersRequestFailed,
    })
  );
};

// Selectors
export const getUsers = createSelector(
  (state) => state.entities.users.list,
  (list) => list
);
