import React from "react";
import SwitchPanel from "./SwitchPanel";
import {
  Provider as UrqlProvider,
  createClient,
  Subscription,
  defaultExchanges,
  subscriptionExchange
} from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";
import Subscriber from "./Subscriber";
import Chart from "./Chart";

const subscriptionClient = new SubscriptionClient(
  "wss://react.eogresources.com/graphql",
  {
    reconnect: true,
    timeout: 20000
  }
);

const client = createClient({
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation)
    })
  ]
});

const newMessages = `
subscription {
  newMeasurement {metric, at, value, unit}
}
`;
export default () => (
  <UrqlProvider value={client}>
    <Subscription query={newMessages}>
      {({ data }) => <Subscriber data={data} />}
    </Subscription>
    <SwitchPanel />
    <Chart />
  </UrqlProvider>
);
