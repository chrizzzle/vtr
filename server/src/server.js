import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import * as Schema from './schema';
import cors from 'cors';
import config from './config';
import {createServer} from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';


const server = express();
const ws = createServer(server);

const schemaFunction =
  Schema.schemaFunction ||
  function() {
    return Schema.schema;
  };
let schema;
const rootFunction =
  Schema.rootFunction ||
  function() {
    return schema.rootValue;
  };
const contextFunction =
  Schema.context ||
  function(headers, secrets) {
    return Object.assign(
      {
        headers: headers,
      },
      secrets
    );
  };

server.use(cors());

server.use('/graphql', bodyParser.json(), graphqlExpress(async (request) => {
  if (!schema) {
    schema = schemaFunction(process.env);
  }
  const context = await contextFunction(request.headers, process.env);
  const rootValue = await rootFunction(request.headers, process.env);

  return {
    schema: await schema,
    rootValue,
    context,
    tracing: true,
  };
}));

ws.listen(config.ws.port, () => {
    console.log(`GraphQL WS server is now running on http://localhost:${config.ws.port}`);
    if (!schema) {
        schema = schemaFunction(process.env);
    }

    new SubscriptionServer({
        execute,
        subscribe,
        schema
    }, {
        server: ws,
        path: '/subscriptions'
    });
});

server.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: 'ws://localhost:4000/subscriptions',
    query: ``,
}));

server.listen(config.server.port, () => {
  console.log(`GraphQL Server is now running on http://localhost:${config.server.port}/graphql`);
  console.log(`View GraphiQL at http://localhost:${config.server.port}/graphiql`);
});
