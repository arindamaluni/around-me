import { combineReducers } from "redux";
import authState from "./auth";
import promotions from "./promotions";

export default combineReducers({
  authState,
  promotions
});
