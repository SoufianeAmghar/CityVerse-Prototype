import { combineReducers } from "redux";
import FirstAuthReducer from './FirstAuthReducer'


const allReducers = combineReducers({

  FirstAuthReducer,
});

export default (state, action) => {
  if (action.type === "RESET") {
    state = undefined;
  }
  return allReducers(state, action);
};
