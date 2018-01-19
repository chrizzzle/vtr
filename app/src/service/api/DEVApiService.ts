import {Option} from '../../entity/Option';
import {ApiService} from './ApiService';
import {Vote} from '../../entity/Vote';
import {Session} from '../../entity/Session';

export class DEVApiService implements ApiService {
    constructor(private apiBaseUrl: string) {}

    getOptions(): Promise<Option[]> {
        return fetch(`${this.apiBaseUrl}/option`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => response.json());
    }

    getVotes(): Promise<Vote[]> {
        return fetch(`${this.apiBaseUrl}/vote`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => response.json());
    }

    getSessions(): Promise<Session[]> {
        return fetch(this.apiBaseUrl + '/session', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => response.json());
    }
}
