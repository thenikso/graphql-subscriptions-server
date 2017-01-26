# GraphQL Subscriptions over WebSocket Server

**This is very much a work in progress and experiment**

I'm trying to see if a server offering a WebSocket endpoint can be made to serve as the subscriptions
endpoint of a GraphQL api hosted somewhere else (ie serverless).

Here is some guidelines:

- There should be configurable way to inform the server of new updates (rest enpoints, AMQP and whatnot)
  These would be used by the GraphQL api to propagate a change
- This server should have no knowledge of GraphQL, just receive notifications and forward the
  notification content. At most it should be able to call back the GraphQL api to get a query result
- Support authentication
