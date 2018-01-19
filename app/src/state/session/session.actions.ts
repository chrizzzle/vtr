import {Session} from '../../entity/Session';

export const SESSION_ACTIONS = {
    SESSION_LOADING_SUCCESS: 'SESSION_LOADING_SUCCESS',
};

export const sessionLoadingSuccess = (sessions: Session[]) => {
    return {
        type: 'SESSION_LOADING_SUCCESS',
        payload: sessions
    };
};
