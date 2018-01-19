import {SESSION_ACTIONS} from './session.actions';
import {SessionState} from '../SessionState';
import {Session} from '../../entity/Session';

export const sessions = (state: SessionState = null, action) => {
    switch (action.type) {
        case SESSION_ACTIONS.SESSION_LOADING_SUCCESS:
            return {
                ...state,
                data: action.payload
            };

        case SESSION_ACTIONS.SESSION_START:
            return {
                ...state,
                data: state.data.map((session: Session) => {
                    if (session._id === action.payload._id) {
                        return {
                            ...session,
                            active: true
                        };
                    }

                    return session;
                })
            };

        case SESSION_ACTIONS.SESSION_END:
            return {
                ...state,
                data: state.data.map((session: Session) => {
                    if (session._id === action.payload._id) {
                        return {
                            ...session,
                            active: false
                        };
                    }

                    return session;
                })
            };

        case SESSION_ACTIONS.SESSION_COUNTDOWN:
            return {
                ...state,
                data: state.data.map((session: Session) => {
                    if (session._id === action.payload._id) {
                        return {
                            ...session,
                            countdown: action.payload.countdown
                        };
                    }

                    return session;
                })
            };

        case SESSION_ACTIONS.SESSION_TIMER:
            return {
                ...state,
                data: state.data.map((session: Session) => {
                    if (session._id === action.payload._id) {
                        return {
                            ...session,
                            timer: action.payload.timer,
                            percent: action.payload.percent
                        };
                    }

                    return session;
                })
            };

        default:
            return state;
    }
};
