import { combineReducers } from "redux";

import entitiesReducer from "./entities";

const rootReducer = combineReducers({
  entities: entitiesReducer,
  //   auth: authReducer,
  //   ui: uiReducer,
});

export default rootReducer;
