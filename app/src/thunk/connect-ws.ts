import {AppFactory} from '../factory/AppFactory';
import {wsSetConnected, wsSetLoading} from '../state/ws/ws.actions';
import {voteResponseError, voteResponseSuccess} from '../state/vote/vote.actions';
import {Vote} from '../entity/Vote';
import {uiCountDown} from '../state/ui/ui.actions';
import {Session} from '../entity/Session';

export const connectWs = () => {
    return (dispatch, getState, factory: AppFactory) => {
        const wsService = factory.getWsService();
        dispatch(wsSetLoading(true));
        wsService.connect()
            .then(() => dispatch(wsSetLoading(false)))
            .then(() => dispatch(wsSetConnected(true)))
            .catch(e => {
                dispatch(wsSetLoading(false));
                dispatch(wsSetConnected(false));
            });

        wsService.onVote((vote: Vote) => {
            dispatch(voteResponseSuccess(vote));
        });

        wsService.onVoteLimit(() => {
            dispatch(voteResponseError('Vote limit reached'));
        });

        wsService.onCountdown((number: number, session: Session) => {
            console.log(number, session);
            dispatch(uiCountDown(number, session));
        });
    };
};
