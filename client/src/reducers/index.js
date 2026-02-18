import { combineReducers } from "redux";

import authReducer from "./authReducer.js";
import travelRequestReducer from "./travelRequestReducer.js"

export const reducers = combineReducers({
  auth: authReducer,
  travelRequest: travelRequestReducer
});
