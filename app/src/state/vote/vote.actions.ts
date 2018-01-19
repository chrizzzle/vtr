import {Vote} from '../../entity/Vote';

export const VOTE_ACTIONS = {
    VOTE_RESPONSE_SUCCESS: 'VOTE_RESPONSE_SUCCESS',
    VOTE_RESPONSE_ERROR: 'VOTE_RESPONSE_ERROR',
    VOTES_LOADING_SUCCESS: 'VOTES_LOADING_SUCCESS'
};

export const voteResponseSuccess = (vote: Vote) => {
    return {
        type: 'VOTE_RESPONSE_SUCCESS',
        payload: vote
    };
};

export const voteResponseError = (errorMessage: string) => {
    return {
        type: 'VOTE_RESPONSE_ERROR',
        payload: errorMessage
    };
};

export const votesLoadingSuccess = (votes: Vote[]) => {
    return {
        type: 'VOTES_LOADING_SUCCESS',
        payload: votes
    };
};
