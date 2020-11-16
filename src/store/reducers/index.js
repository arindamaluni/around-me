import { combineReducers } from "redux";
import authState from "./auth";
import events from "./events";
import location from "./location";
import profile from "./profile";

export default combineReducers({
  authState,
  events,
  location,
  profile,
});
