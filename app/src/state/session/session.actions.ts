import {Session} from '../../entity/Session';

export const SESSION_ACTIONS = {
    SESSION_LOADING_SUCCESS: 'SESSION_LOADING_SUCCESS',
    SESSION_START: 'SESSION_START',
    SESSION_END: 'SESSION_END',
    SESSION_COUNTDOWN: 'SESSION_COUNTDOWN',
    SESSION_TIMER: 'SESSION_TIMER',
};

export const sessionLoadingSuccess = (sessions: Session[]) => {
    return {
        type: 'SESSION_LOADING_SUCCESS',
        payload: sessions
    };
};

export const sessionStart = (session: Session) => {
    return {
        type: 'SESSION_START',
        payload: session
    }
};

export const sessionEnd = (session: Session) => {
    return {
        type: 'SESSION_END',
        payload: session
    }
};

export const sessionCountdown = (session: Session) => {
    return {
        type: 'SESSION_COUNTDOWN',
        payload: session
    }
};

export const sessionTimer = (session: Session) => {
    return {
        type: 'SESSION_TIMER',
        payload: session
    }
};
