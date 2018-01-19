import {VOTE_ACTIONS} from './vote.actions';
import {VoteState} from '../VoteState';

export const votes = (state: VoteState = null, action) => {
    switch (action.type) {
        case VOTE_ACTIONS.VOTE_RESPONSE_SUCCESS:
            return {
                ...state,
                data: [...state.data, action.payload]
            };
        case VOTE_ACTIONS.VOTE_RESPONSE_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case VOTE_ACTIONS.VOTES_LOADING_SUCCESS:
            return {
                ...state,
                data: [...action.payload]
            };
        default:
            return state;
    }
};
