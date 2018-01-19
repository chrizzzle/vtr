import {Vote} from '../entity/Vote';

export interface VoteState {
    data: Vote[];
    error: string;
}

export const createInitialVoteState = (): VoteState => {
    return {
        data: [],
        error: null
    };
};
