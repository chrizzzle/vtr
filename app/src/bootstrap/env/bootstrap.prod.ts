import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {AppConfig} from '../../index';
import {ProdAppFactory} from '../factory/app-factory.prod';
import {ws} from '../../state/ws/ws.reducer';
import {createInitialAppState} from '../../state/AppState';
import {ui} from '../../state/ui/ui.reducer';
import {options} from '../../state/option/option.reducer';
import {sessions} from '../../state/session/session.reducer';
import {votes} from '../../state/vote/vote.reducer';



export const createPRODBootstrap = (appConfig: AppConfig, window: Window) => {
    let factory = new ProdAppFactory(appConfig, window);
    return {
        createStore: () => {
            return createStore(
                combineReducers({
                    options,
                    ws,
                    ui,
                    sessions,
                    votes
                }),
                createInitialAppState(),
                composeWithDevTools(
                    applyMiddleware(
                        thunk.withExtraArgument(factory)
                    )
                ));
        }
    };
};
