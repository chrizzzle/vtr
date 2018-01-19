import {Option} from '../../entity/Option';
import {Session} from '../../entity/Session';

export const OPTION_ACTIONS = {
    OPTION_SET_LOADING: 'OPTION_SET_LOADING',
    OPTION_LOADING_SUCCESS: 'OPTION_LOADING_SUCCESS',
    OPTION_LOADING_ERROR: 'OPTION_LOADING_ERROR',
    OPTION_INCOMING_VOTE: 'OPTION_INCOMING_VOTE',
    OPTION_SELECT_SESSION: 'OPTION_SELECT_SESSION',
    OPTION_VOTE_LIMIT: 'OPTION_VOTE_LIMIT'
};

export const setOptionLoading = (loading: boolean) => {
    return {
        type: 'OPTION_SET_LOADING',
        payload: loading
    };
};

export const optionLoadingSuccess = (options: Option[]) => {
    return {
        type: 'OPTION_LOADING_SUCCESS',
        payload: options
    };
};

export const optionLoadingError = (error) => {
    return {
        type: 'OPTION_LOADING_ERROR',
        payload: error
    };
};

export const optionVoteError = (e) => {
    return {
        type: 'OPTION_VOTE_ERROR',
        payload: e
    };
};

export const selectSession = (session: Session) => {
    return {
        type: 'OPTION_SELECT_SESSION',
        payload: session
    };
};

export const sessionVoteLimitReached = (session: Session) => {
    return {
        type: 'OPTION_VOTE_LIMIT',
        payload: session
    };
};
