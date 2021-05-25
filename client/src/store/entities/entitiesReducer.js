import { combineReducers } from "redux";
import payments from "./payments";
import users from "./users";
import referrals from "./referrals";
import products from "./products";
import orders from "./orders";

export default combineReducers({
  payments,
  users,
  referrals,
  products,
  orders,
});
