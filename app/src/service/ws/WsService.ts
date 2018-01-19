import {Vote} from '../../entity/Vote';
import {Session} from '../../entity/Session';

export interface WsService {
    connect: () => Promise<any>;
    emit: (message: string, value: string) => Promise<any>;
    onVote: (callback: (vote: Vote) => void) => void;
    onVoteLimit: (callback: () => void) => void;
    onCountdown: (callback: (session: Session) => void) => void;
    onSessionStart: (callback: (session: Session) => void) => void;
    onSessionEnd: (callback: (session: Session) => void) => void;
    onSessionTimer: (callback: (session: Session) => void) => void;
}
