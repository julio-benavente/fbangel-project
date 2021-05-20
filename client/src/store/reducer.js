import { combineReducers } from "redux";
import auth from "./auth/auth";
import entities from "./entities/entitiesReducer";

const combinedReducer = combineReducers({
  auth,
  entities,
});

const rootReducer = (state, action) => {
  if (["auth/logoutSucceeded", "auth/logoutRequested"].includes(action.type)) {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
