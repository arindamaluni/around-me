import { combineReducers } from "redux";
import authState from "./auth";
import events from "./events";

export default combineReducers({
  authState,
  events
});
