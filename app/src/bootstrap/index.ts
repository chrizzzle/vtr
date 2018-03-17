import {createDEVBootstrap} from './env/bootstrap.dev';
import {createPRODBootstrap} from './env/bootstrap.prod';
import {Store} from 'redux';
import {AppConfig} from '../index';

export interface BootstrapResult {
    createStore: () => Store<{}>;
}

export const bootstrapApp = (config: AppConfig, window: Window): BootstrapResult => {
    switch (config.env) {
        case 'DEV':
            return createDEVBootstrap(config, window);
        case 'PROD':
            return createPRODBootstrap(config, window);
        default:
            console.warn('Unknown env', config.env);
    }
};
