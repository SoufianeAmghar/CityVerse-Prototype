import { combineReducers } from "redux";
import FirstAuthReducer from './FirstAuthReducer'
import FileUploadReducer from "./FileUploadReducer";


const allReducers = combineReducers({
  FirstAuthReducer,
  FileUploadReducer,
});

export default (state, action) => {
  if (action.type === "RESET") {
    state = undefined;
  }
  return allReducers(state, action);
};