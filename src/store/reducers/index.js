import { combineReducers } from "redux";
import authState from "./auth";
import events from "./events";
import location from './location';

export default combineReducers({
  authState,
  events,
  location
});
