import { combineReducers } from "redux";
import FirstAuthReducer from './FirstAuthReducer'
import FileUploadReducer from "./FileUploadReducer";
import AssociationReducer from "./AssociationReducer";
import ProfileReducer from "./ProfileReducer";


const allReducers = combineReducers({
  FirstAuthReducer,
  FileUploadReducer,
  AssociationReducer,
  ProfileReducer
});

export default (state, action) => {
  if (action.type === "RESET") {
    state = undefined;
  }
  return allReducers(state, action);
};