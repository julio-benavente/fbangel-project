import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  authRequestBegan,
  authRequestFailed,
  authRequestSucceded,
} from "../actions/auth";

const initialState = () => ({
  user: {
    firstName: "Jose",
    lastName: "Luis",
    id: "609eb3b0bc713531e40391c3",
    email: "jose.luis",
    authLevel: "user",
  },
  loading: false,
  errors: {
    email: "",
    password: "",
    other: "",
  },
});

const request = (auth, action) => {
  auth.loading = true;

  return auth;
};

const authenticate = (auth, action) => {
  const { _id, firstName, lastName, email, authLevel } = action.payload.user;
  auth = initialState();
  auth.user.firstName = firstName || initialState().user.firstName;
  auth.user.lastName = lastName || initialState().user.lastName;
  auth.user.email = email || initialState().user.email;
  auth.user.id = _id || initialState().user._id;
  auth.user.authLevel = authLevel || initialState().user.authLevel;

  return auth;
};

const error = (auth, action) => {
  const { email, password } = action.payload.error;
  auth = initialState();
  auth.loading = false;
  auth.errors.email = email || initialState().errors.email;
  auth.errors.password = password || initialState().errors.password;

  return auth;
};

const slice = createSlice({
  name: "auth",
  initialState: initialState(),
  reducers: {
    authRequested: request,
    authSucceeded: authenticate,
    authFailed: error,
    loginRequested: request,
    loginSucceeded: authenticate,
    loginFailed: error,
    logoutRequested: request,
    logoutSucceeded: (auth, action) => {
      return initialState();
    },
    logoutFailed: error,
  },
});

export default slice.reducer;

export const {
  authRequested,
  authSucceeded,
  authFailed,
  loginRequested,
  loginSucceeded,
  loginFailed,
  logoutRequested,
  logoutSucceeded,
  logoutFailed,
} = slice.actions;

// Actions
const url = "/auth";

export const getAuth = () => (dispatch, getState) => {
  return dispatch(
    authRequestBegan({
      url,
      onStart: authRequested,
      onSuccess: authSucceeded,
      onFailure: authFailed,
    })
  );
};

export const logIn = (data) => (dispatch, getState) => {
  return dispatch(
    authRequestBegan({
      url: `${url}/login`,
      method: "POST",
      data,
      onStart: loginRequested,
      onSuccess: loginSucceeded,
      onFailure: loginFailed,
    })
  );
};

export const logOut = () => (dispatch, getState) => {
  return dispatch(
    authRequestBegan({
      url: `${url}/logout`,
      onStart: logoutRequested,
      onSuccess: logoutSucceeded,
      onFailure: logoutFailed,
    })
  );
};

// Selector

export const getUser = createSelector(
  (state) => state.auth,
  (auth) => auth.user
);

export const getErrors = createSelector(
  (state) => state.auth,
  (auth) => auth.errors
);
