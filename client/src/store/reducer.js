import { combineReducers } from "redux";
import auth from "./auth/auth";
import entities from "./entities/entitiesReducer";
import global from "./global/global";

const combinedReducer = combineReducers({
  auth,
  entities,
  global,
});

const rootReducer = (state, action) => {
  if (["auth/logoutSucceeded", "auth/logoutRequested"].includes(action.type)) {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
