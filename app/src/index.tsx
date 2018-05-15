import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';

import ApolloClient from 'apollo-client';
import {ApolloProvider, FetchResult} from 'react-apollo';
import AppComponent from './component/AppComponent';
import gql from 'graphql-tag';
import {withClientState} from 'apollo-link-state';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {WebSocketLink} from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { split, ApolloLink } from 'apollo-link';

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

const cache = new InMemoryCache();

const link = split(
    ({ query }) => {
        let definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    httpLink,
);

const stateLink = withClientState({
    cache,
    defaults: {
        user: {
            __typename: 'User',
            _id: window.localStorage.getItem('vtr-user-id') || null
        }
    },
    resolvers: {
        Mutation: {
            user: (_, args) => {
                const data = {
                    user: {
                        __typename: 'User',
                        _id: args._id
                    }
                };
                console.log(cache);
                cache.writeData({ data });
                return data;
            },
        },
    }
});

const apolloClient = new ApolloClient({
    cache,
    link: ApolloLink.from([
        stateLink,
        link
    ]),
});

Promise.resolve()
    .then((): Promise<string> => {
        if (!window.localStorage) {
            return Promise.reject('No localStorage found.');
        }
        return Promise.resolve(window.localStorage.getItem('vtr-user-id'));
    })
    .then((userId: string|null): Promise<string> => {
        if (!userId) {
            return apolloClient.mutate({
                mutation: gql`
                  mutation {
                    createUser {
                      _id
                    }
                  }
                `,
            })
            .then(result => {
                userId = result.data.createUser._id;
                window.localStorage.setItem('vtr-user-id', result.data.createUser._id);
                return Promise.resolve(userId);
            });
        }
        return Promise.resolve(userId);
    }).then((userId: string): Promise<FetchResult> => {
        return apolloClient.mutate({
            mutation: gql`
                mutation user($_id: ID!) {
                  user(_id: $_id) @client
                }`,
            variables: {
                _id: userId
            }
        });
    }).then((result: FetchResult) => {
        ReactDOM.render(
            <ApolloProvider client={apolloClient}>
                <AppComponent />
            </ApolloProvider>,
            document.getElementById('root')
        );
    });
