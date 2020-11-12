import { combineReducers } from "redux";

import { journalReducer } from "reduxStore/reducers/journalReducer";

// Root reducer
export const rootReducer = combineReducers({
  journalReducer,
});
