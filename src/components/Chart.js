import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";
import { useSelector } from "react-redux";
import {
  getReducedMetricDataSelector,
  getDataCount,
  getMetricVisibility
} from "../store/actions";

const CustomizedLabel = ({ x, y, payload }) => {
  const dateObj = new Date(payload.value);
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16}>
        {dateObj.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })}
      </text>
    </g>
  );
};
const useStyles = makeStyles({
  root: {
    flex: 1,
    margin: "0 15px 30px 15px"
  }
});
const calDataMax = dataCount => dataMax =>
  dataCount > 250 ? dataMax : dataMax + (250 - dataCount) * 1000;
export default () => {
  const { root } = useStyles();
  const data = useSelector(getReducedMetricDataSelector);
  const dataCount = useSelector(getDataCount);
  const visibility = useSelector(getMetricVisibility) || {};
  return (
    <Card className={root}>
      <ResponsiveContainer width="100%">
        <LineChart
          data={data}
          margin={{
            top: 15,
            right: 90,
            left: 0,
            bottom: 15
          }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis
            dataKey="at"
            type="number"
            domain={["dataMin", calDataMax(dataCount)]}
            tick={<CustomizedLabel />}
          />
          <YAxis />
          {visibility.tubingPressure && (
            <Line
              type="monotone"
              dataKey="tubingPressure"
              stroke="#f44336"
              strokeWidth={2}
            />
          )}
          {visibility.casingPressure && (
            <Line
              type="monotone"
              dataKey="casingPressure"
              stroke="#9c27b0"
              strokeWidth={2}
            />
          )}
          {visibility.oilTemp && (
            <Line
              type="monotone"
              dataKey="oilTemp"
              stroke="#3f51b5"
              strokeWidth={2}
            />
          )}
          {visibility.flareTemp && (
            <Line
              type="monotone"
              dataKey="flareTemp"
              stroke="#009688"
              strokeWidth={2}
            />
          )}
          {visibility.waterTemp && (
            <Line
              type="monotone"
              dataKey="waterTemp"
              stroke="#ff9800"
              strokeWidth={2}
            />
          )}
          {visibility.injValveOpen && (
            <Line
              type="monotone"
              dataKey="injValveOpen"
              stroke="#795548"
              strokeWidth={2}
            />
          )}
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
