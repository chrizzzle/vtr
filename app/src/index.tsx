import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';

import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import {InMemoryCache} from 'apollo-cache-inmemory';
import AppComponent from './component/AppComponent';

export interface AppConfig {
    env?: 'DEV' | 'PROD';
    apiBaseURL?: string;
    wsBaseUrl?: string;
}

const httpLink = new HttpLink({
    uri: 'http://localhost:8000/graphql'
});

const wsLink = new WebSocketLink({
    uri: `ws://localhost:8001/subscriptions`,
    options: {
        reconnect: true
    }
});

const link = split(
    ({ query }) => {
        let definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink,
);

const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <AppComponent />
    </ApolloProvider>,
    document.getElementById('root')
);
