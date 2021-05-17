import { combineReducers } from "redux";
import auth from "./auth/auth";
import entities from "./entities/entittiesReducer";

const combinedReducer = combineReducers({
  auth,
  entities,
});

const rootReducer = (state, action) => {
  if (["auth/logoutSucceeded", "auth/logoutRequested"].includes(action.type)) {
    state = undefined;
    return state;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
