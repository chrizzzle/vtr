import {Vote} from '../../entity/Vote';
import {Session} from '../../entity/Session';

export interface WsService {
    connect: () => Promise<any>;
    emit: (message: string, value: string) => Promise<any>;
    onVote: (callback: (vote: Vote) => void) => void;
    onVoteLimit: (callback: () => void) => void;
    onCountdown: (callback: (timer: number, session: Session) => void) => void;
}
