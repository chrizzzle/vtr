import {AppFactory} from '../factory/AppFactory';
import {wsSetConnected, wsSetLoading} from '../state/ws/ws.actions';
import {voteResponseError, voteResponseSuccess} from '../state/vote/vote.actions';
import {Vote} from '../entity/Vote';
import {Session} from '../entity/Session';
import {sessionCountdown, sessionEnd, sessionStart, sessionTimer} from '../state/session/session.actions';

export const connectWs = () => {
    return (dispatch, getState, factory: AppFactory) => {
        const wsService = factory.getWsService();
        dispatch(wsSetLoading(true));
        return wsService.connect()
            .then(() => dispatch(wsSetLoading(false)))
            .then(() => dispatch(wsSetConnected(true)))
            .then(() => {
                wsService.onVote((vote: Vote) => dispatch(voteResponseSuccess(vote)));
                wsService.onVoteLimit(() => dispatch(voteResponseError('Vote limit reached')));
                wsService.onCountdown((session: Session) => dispatch(sessionCountdown(session)));
                wsService.onSessionStart((session: Session) => dispatch(sessionStart(session)));
                wsService.onSessionEnd((session: Session) => dispatch(sessionEnd(session)));
                wsService.onSessionTimer((session: Session) => dispatch(sessionTimer(session)));
            })
            .catch(e => {
                dispatch(wsSetLoading(false));
                dispatch(wsSetConnected(false));
            });
    };
};
