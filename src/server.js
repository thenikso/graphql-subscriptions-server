import express from 'express';
import bodyParser from 'body-parser';

import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { subscriptionManager, pubsub } from './subscriptions';

// Rest/control server

const server = express();
let nextCommentAutoId = 1;

server.set('port', (process.env.PORT || 8022));
server.use(bodyParser.json());

server.post('/comment', (req, res) => {
  const comment = Object.assign({
    content: 'no content',
  }, req.body, {
    id: nextCommentAutoId,
  });
  nextCommentAutoId += 1;
  pubsub.publish('commentAdded', comment);
  res.send(`Added comment with id: ${comment.id}`);
});

server.listen(server.get('port'), () => {
  console.log(`The server is running at http://0.0.0.0:${server.get('port')}`); // eslint-disable-line no-console
  if (process.send) {
    process.send('online');
  }
});

// Ws server

const WS_PORT = process.env.WS_PORT || 8002;

const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

websocketServer.listen(WS_PORT, () => console.log( // eslint-disable-line no-console
  `Websocket Server is now running on http://localhost:${WS_PORT}`,
));

// eslint-disable-next-line
new SubscriptionServer(
  {
    subscriptionManager,

    // the obSubscribe function is called for every new subscription
    // and we use it to set the GraphQL context for this subscription
    onSubscribe: (msg, params) => {
      console.log('Subscribed', msg, params);
      return Object.assign({}, params, {
        context: {
          Comments: {},
        },
      });
    },
  },
  websocketServer,
);
