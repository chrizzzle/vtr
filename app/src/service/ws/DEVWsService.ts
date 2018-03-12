import {WsService} from './WsService';
import * as io from 'socket.io-client';

export class DEVWsService implements WsService {
    private wsBaseUrl: string;
    private ioClient: SocketIOClient.Socket;

    constructor(wsBaseUrl: string) {
        this.wsBaseUrl = wsBaseUrl;
    }

    connect(): Promise<void> {
        this.ioClient = io(this.wsBaseUrl);
        return Promise.resolve();
    }

    emit(message: string, value: string): Promise<void> {
        this.ioClient.emit(message, value);
        return Promise.resolve();
    }

    onVote(callback) {
        this.ioClient.on('VOTE', (message) => {
            const vote = JSON.parse(message);
            callback(vote);
        });
    }

    onVoteLimit(callback) {
        this.ioClient.on('VOTE_LIMIT', () => {
            callback();
        });
    }

    onCountdown(callback) {
        this.ioClient.on('SESSION_COUNT_DOWN', (response) => {
            callback(response.session);
        });
    }

    onSessionStart(callback) {
        this.ioClient.on('SESSION_START', (response) => {
            callback(response.session);
        });
    }

    onSessionEnd(callback) {
        this.ioClient.on('SESSION_END', (response) => {
            callback(response.session);
        });
    }

    onSessionTimer(callback) {
        this.ioClient.on('SESSION_TIMER', (response) => {
            callback(response.session);
        });
    }
}
