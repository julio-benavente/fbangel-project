import { combineReducers } from "redux";
import payments from "./payments";
import users from "./users";

export default combineReducers({
  payments,
  users,
});
