import {AppFactory} from '../factory/AppFactory';
import {votesLoadingSuccess} from '../state/vote/vote.actions';

export const getVotes = () => {
    return (dispatch, getState, factory: AppFactory) => {
        return factory.getApiService().getVotes()
            .then(results => dispatch(votesLoadingSuccess(results)))
    };
};
