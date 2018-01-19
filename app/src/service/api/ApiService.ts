import {Option} from '../../entity/Option';
import {Session} from '../../entity/Session';
import {Vote} from '../../entity/Vote';

export interface ApiService {
    getOptions(): Promise<Option[]>;
    getSessions(): Promise<Session[]>;
    getVotes(): Promise<Vote[]>;
}
