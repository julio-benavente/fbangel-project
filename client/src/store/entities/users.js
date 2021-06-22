import { createSlice, current } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/api";
import { createSelector } from "reselect";
import moment from "moment";
const initialState = () => ({
  loading: false,
  user: null,
  list: [],
  lastFetch: null,
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
      users.lastFetch = Date.now();

      return users;
    },
    usersRequestFailed: (users, action) => {
      users = initialState();

      return users;
    },

    // user (one user)
    userRequested: (users, action) => {
      users.loading = true;

      return users;
    },
    userRequestSucceeded: (users, action) => {
      const { user: userResponse } = action.payload;
      users.user = userResponse;
      users.loading = false;

      return users;
    },
    userRequestFailed: (users, action) => {
      users.loading = false;

      return users;
    },

    usersStatusChanged: (users, action) => {
      const details = action.payload;

      details.map((detail) => {
        const index = current(users).list.findIndex((user) => user._id === detail.item);
        users.list[index].status = detail.modification.status;
      });
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
  usersStatusChanged,
} = slice.actions;

// Actions
const url = "/api/users";

const stopRequest = (getState) => {
  const { lastFetch } = getState().entities.users;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  return diffInMinutes < 10;
};

export const requestUsers = () => (dispatch, getState) => {
  if (stopRequest(getState)) {
    return;
  }

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
  (list) => list.slice().sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
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
