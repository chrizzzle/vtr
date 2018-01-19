import {AppFactory} from '../factory/AppFactory';
import {sessionLoadingSuccess} from '../state/session/session.actions';

export const getSessions = () => {
    return (dispatch, getState, factory: AppFactory) => {
        return factory.getApiService().getSessions()
            .then(results => dispatch(sessionLoadingSuccess(results)))
    };
};
