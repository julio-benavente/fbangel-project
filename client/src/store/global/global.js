import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = () => ({
  emailDuplicated: false,
});

const slice = createSlice({
  name: "global",
  initialState: initialState(),
  reducers: {
    emailDuplicatedSet: (global, action) => {
      global.emailDuplicated = action.payload;
      return global;
    },
  },
});

export default slice.reducer;

export const { emailDuplicatedSet } = slice.actions;

// Selectors
export const getGlobal = createSelector(
  (state) => state.global,
  (global) => global
);
