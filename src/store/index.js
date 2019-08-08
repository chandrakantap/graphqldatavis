import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import metricReducer from "./reducers/Metric";

export default () => {
  const rootReducer = combineReducers({
    metrics: metricReducer
  });

  const composeEnhancers = composeWithDevTools({});
  const store = createStore(rootReducer, composeEnhancers());

  return store;
};
