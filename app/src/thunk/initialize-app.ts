import {AppFactory} from '../factory/AppFactory';
import {connectWs} from './connect-ws';
import {uiSetLoading} from '../state/ui/ui.actions';
import {saveUserIdToState} from '../state/user/user.actions';

export const initializeApp = () => {
    return (dispatch, getState, factory: AppFactory) => {
        dispatch(uiSetLoading(true));
        return dispatch(connectWs())
            .then(() => factory.getStorage().createUserId())
            .then((userId) => dispatch(saveUserIdToState(userId)))
            .then(() => dispatch(uiSetLoading(false)))
            .catch((e) => dispatch(uiSetLoading(false)));
    };
};
