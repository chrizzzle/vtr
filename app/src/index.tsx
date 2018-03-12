import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import {bootstrapApp} from './bootstrap/index';
import {initializeApp} from './thunk/initialize-app';

import {AppContainer} from './container/AppContainer';

export interface AppConfig {
    env?: 'DEV' | 'PROD';
    apiBaseURL?: string;
    wsBaseUrl?: string;
}

const bootstrapper = bootstrapApp({
        env: 'DEV',
        apiBaseURL: 'http://192.168.2.147:8000',
        wsBaseUrl: 'http://192.168.2.147:8000'
    },
    window);

const store = bootstrapper.createStore();
store.dispatch(initializeApp());

ReactDOM.render(
    <Provider store={store}>
        <AppContainer/>
    </Provider>,
    document.getElementById('root')
);
