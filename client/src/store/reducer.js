import { combineReducers } from "redux";
import auth from "./auth/auth";
import entities from "./entities/entittiesReducer";

export default combineReducers({
  auth,
  entities,
});
