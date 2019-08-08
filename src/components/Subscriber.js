import { useDispatch } from "react-redux";
import { updateMetricData } from "../store/actions";

export default ({ data = {} }) => {
  const dispatch = useDispatch();
  if (data.newMeasurement) {
    dispatch(updateMetricData(data.newMeasurement));
  }
  return null;
};
