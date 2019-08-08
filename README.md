## Displaying real time data using  Rechart, GraphQL, Material-UI

### See demo at [https://l2cq0.csb.app/](https://l2cq0.csb.app/)

Different metrics data is fetched from react.eogresources.com/graphql via an websocket connection.

urql library is used to create websocket client and register for a subscription.

Received data is being stored in redux and displayed on graph using recharts.
