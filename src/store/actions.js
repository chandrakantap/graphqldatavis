import { createSelector } from "reselect";

export const API_ERROR = "EVENT/API_ERROR_RECEIVED";
export const WEATHER_DATA_RECEIVED = "EVENT/WEATHER_DATA_RECEIVED";
export const UPDATE_METRICS_DATA = "UPDATE_METRICS_DATA";
export const SET_METRIC_VISIBILITY = "SET_METRIC_VISIBILITY";

export const updateMetricData = data => ({
  type: UPDATE_METRICS_DATA,
  data
});

export const setMetricVisibilityAction = (metricName, isVisible) => ({
  type: SET_METRIC_VISIBILITY,
  data: { [metricName]: isVisible }
});

const stateSelector = state => state.metrics;

export const getReducedMetricDataSelector = createSelector(
  [stateSelector],
  state => state.reducedMetricData
);
export const getLatestMetricDataSelector = createSelector(
  [stateSelector],
  state => state.latestMetricData
);
export const getMetricVisibility = createSelector(
  [stateSelector],
  state => state.metricVisibilityMap
);
export const getDataCount = createSelector(
  [stateSelector],
  state => state.dataSize
);
