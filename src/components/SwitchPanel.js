import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Switch from "@material-ui/core/Switch";
import { useSelector, useDispatch } from "react-redux";
import {
  getLatestMetricDataSelector,
  setMetricVisibilityAction,
  getMetricVisibility
} from "../store/actions";

const SingleSwitchComp = ({ text, mkey, data, checked }) => {
  const dispatch = useDispatch();
  const onChangeSwitch = (e, checked) =>
    dispatch(setMetricVisibilityAction(e.target.name, checked));
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          {text}
        </Typography>
        <Typography variant="h5" color="textSecondary" component="p">
          {data[mkey] || 0}
        </Typography>
      </CardContent>
      <CardActions>
        <Switch
          name={mkey}
          color="primary"
          onChange={onChangeSwitch}
          checked={checked}
        />
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    height: 180,
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
    gridGap: 8,
    padding: 15
  }
}));

const SwitchPanel = () => {
  const { root } = useStyles();
  const latestData = useSelector(getLatestMetricDataSelector);
  const visibility = useSelector(getMetricVisibility);
  return (
    <div className={root}>
      <SingleSwitchComp
        text="Tubing Pressure"
        mkey="tubingPressure"
        data={latestData}
        checked={visibility.tubingPressure}
      />
      <SingleSwitchComp
        text="Casing Pressure"
        mkey="casingPressure"
        data={latestData}
        checked={visibility.casingPressure}
      />
      <SingleSwitchComp
        text="Oil Temp"
        mkey="oilTemp"
        data={latestData}
        checked={visibility.oilTemp}
      />
      <SingleSwitchComp
        text="Flare Temp"
        mkey="flareTemp"
        data={latestData}
        checked={visibility.flareTemp}
      />
      <SingleSwitchComp
        text="Watrer Temp"
        mkey="waterTemp"
        data={latestData}
        checked={visibility.waterTemp}
      />
      <SingleSwitchComp
        text="Inj Valve Open"
        mkey="injValveOpen"
        data={latestData}
        checked={visibility.injValveOpen}
      />
    </div>
  );
};
export default SwitchPanel;
