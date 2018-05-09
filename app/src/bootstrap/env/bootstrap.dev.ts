import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import {DevAppFactory} from '../factory/app-factory.dev';
import {AppConfig} from '../../index';
import {ws} from '../../state/ws/ws.reducer';
import {createInitialAppState} from '../../state/AppState';
import {ui} from '../../state/ui/ui.reducer';
import {options} from '../../state/option/option.reducer';
import {sessions} from '../../state/session/session.reducer';
import {votes} from '../../state/vote/vote.reducer';
import {user} from '../../state/user/user.reducer';

export const createDEVBootstrap = (appConfig: AppConfig, window: Window) => {
    let factory = new DevAppFactory(appConfig, window);

    return {
        createStore: () => {
            return createStore(
                combineReducers({
                    options,
                    ws,
                    ui,
                    sessions,
                    votes,
                    user,
                }),
                createInitialAppState(),
                composeWithDevTools(
                    applyMiddleware(
                        createLogger(),
                        thunk.withExtraArgument(factory)
                    )
                ));
        }
    };
};
