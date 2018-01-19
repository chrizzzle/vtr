import {AppFactory} from '../factory/AppFactory';
import {Option} from '../entity/Option';
import {optionVoteError} from '../state/option/option.actions';

export const vote = (option: Option) => {
    return (dispatch, getState, factory: AppFactory) => {
        return factory.getWsService().emit('VOTE', JSON.stringify({
            userId: factory.getStorage().getUserId(),
            sessionId: option.sessionId,
            optionId: option._id
        }))
            .catch(e => {
                dispatch(optionVoteError(e));
            });
    };
};


