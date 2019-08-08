import * as actions from "../actions";

const allowedDataSize = 250;

const initialState = {
  reducedMetricData: [],
  metricVisibilityMap: {
    tubingPressure: true,
    casingPressure: true,
    flareTemp: true,
    injValveOpen: true
  },
  latestMetricData: {},
  dataSize: 0
};

const updateMetricData = (state, action) => {
  const { metric, at, value } = action.data;
  const nextReducedMetricData = [...state.reducedMetricData];
  let nextDataSize = state.dataSize;

  const topData = nextReducedMetricData.pop() || { at, [metric]: value };
  if (topData.at === at) {
    nextReducedMetricData.push({ ...topData, [metric]: value });
  } else {
    nextReducedMetricData.push(topData);
    nextReducedMetricData.push({ at, [metric]: value });
    if (state.dataSize > allowedDataSize) {
      nextReducedMetricData.shift();
    } else {
      nextDataSize = nextReducedMetricData.length;
    }
  }

  return {
    ...state,
    reducedMetricData: nextReducedMetricData,
    dataSize: nextDataSize,
    latestMetricData: {
      ...state.latestMetricData,
      [metric]: value
    }
  };
};

const setMetricVisibility = (state, action) => {
  return {
    ...state,
    metricVisibilityMap: { ...state.metricVisibilityMap, ...action.data }
  };
};

const handlers = {
  [actions.UPDATE_METRICS_DATA]: updateMetricData,
  [actions.SET_METRIC_VISIBILITY]: setMetricVisibility
};
export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
