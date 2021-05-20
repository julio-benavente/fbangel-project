import { combineReducers } from "redux";
import payments from "./payments";
import users from "./users";
import referrals from "./referrals";

export default combineReducers({
  payments,
  users,
  referrals,
});
