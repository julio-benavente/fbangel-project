import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/api";
import { createSelector } from "reselect";

const initialState = () => ({
  loading: false,
  user: null,
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
      users.loading = false;

      return users;
    },
    usersRequestFailed: (users, action) => {
      users = initialState();

      return users;
    },

    // user (one user)
    userRequested: (user, action) => {
      user.loading = true;

      return user;
    },
    userRequestSucceeded: (user, action) => {
      const { user: userResponse } = action.payload;
      user.user = userResponse;
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
export const {
  usersRequestFailed,
  usersRequestSucceeded,
  usersRequested,
  userRequestFailed,
  userRequestSucceeded,
  userRequested,
} = slice.actions;

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

export const getUsersState = createSelector(
  (state) => state.entities.users,
  (usersState) => usersState
);

// User (one user)

export const requestUser =
  ({ id }) =>
  (dispatch, getState) => {
    return dispatch(
      apiCallBegan({
        url: `${url}/get-user-information/${id}`,
        onStart: userRequested,
        onSuccess: userRequestSucceeded,
        onFailure: userRequestFailed,
      })
    );
  };

// Selectors
export const getUser = createSelector(
  (state) => state.entities.users.user,
  (user) => user
);

export const getUserState = createSelector(
  (state) => state.entities.users,
  (usersState) => usersState
);
