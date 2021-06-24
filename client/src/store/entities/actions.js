import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../actions/api";
import { createSelector } from "reselect";
import { usersStatusChanged } from "../entities/users";
import moment from "moment";

const initialState = () => ({
  loading: false,
  list: [],
  lastFetch: null,
});

const slice = createSlice({
  name: "actions",
  initialState: initialState(),
  reducers: {
    actionsRequested: (actions, action) => {
      actions.loading = true;

      return actions;
    },
    actionsRequestSucceeded: (actions, action) => {
      const { actions: actionsResponse } = action.payload;
      actions.list = actionsResponse;
      actions.loading = false;
      actions.lastFetch = Date.now();

      return actions;
    },
    actionsRequestFailed: (actions, action) => {
      actions.loading = false;

      return actions;
    },
    newActionCreated: (actions, action) => {
      const { action: newAction } = action.payload;
      actions.list.push(newAction);

      return actions;
    },
  },
});

export default slice.reducer;
export const { actionsRequestFailed, actionsRequestSucceeded, actionsRequested, newActionCreated } = slice.actions;

// Actions
const url = "/api/actions";

const stopRequest = (getState) => {
  const { lastFetch } = getState().entities.actions;
  const diffInMinutes = moment().diff(moment(lastFetch), "minutes");
  return diffInMinutes < 10;
};

export const requestActions = () => (dispatch, getState) => {
  if (stopRequest(getState)) {
    return;
  }

  return dispatch(
    apiCallBegan({
      url,
      onStart: actionsRequested,
      onSuccess: actionsRequestSucceeded,
      onFailure: actionsRequestFailed,
    })
  );
};

export const changeUserStatus = (data) => async (dispatch, getState) => {
  try {
    const actionResponse = await dispatch(
      apiCallBegan({
        url: `${url}/change-user-status/`,
        method: "POST",
        data,
        onSuccess: newActionCreated,
      })
    );

    if (actionResponse.type === newActionCreated.type) {
      await dispatch(usersStatusChanged(actionResponse.payload.action.details));
    }

    return actionResponse;
  } catch (error) {
    return error;
  }
};

// Selectors
export const getActions = createSelector(
  (state) => state.entities.actions.list,
  (list) => list.slice().sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
);

export const getActionsState = createSelector(
  (state) => state.entities.actions,
  (actionsState) => actionsState
);
