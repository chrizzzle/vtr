import {AppFactory} from '../factory/AppFactory';
import {connectWs} from './connect-ws';
import {getSessions} from './get-sessions';
import {getOptions} from './get-options';
import {getVotes} from './get-votes';
import {uiSetLoading} from '../state/ui/ui.actions';

export const initializeApp = () => {
    return (dispatch, getState, factory: AppFactory) => {
        dispatch(uiSetLoading(true));
        return Promise.all([
            factory.getStorage().createUserId(),
            dispatch(getSessions()),
            dispatch(getOptions()),
            dispatch(getVotes()),
            dispatch(connectWs())
        ]).then(() => dispatch(uiSetLoading(false)))
        .catch((e) => dispatch(uiSetLoading(false)));
    };
};
