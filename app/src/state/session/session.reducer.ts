import {SESSION_ACTIONS} from './session.actions';
import {SessionState} from '../SessionState';

export const sessions = (state: SessionState = null, action) => {
    switch (action.type) {
        case SESSION_ACTIONS.SESSION_LOADING_SUCCESS:
            return {
                ...state,
                data: action.payload
            };

        default:
            return state;
    }
};
