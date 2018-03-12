import {StorageService} from './StorageService';

export class DEVStorageService implements StorageService {
    constructor(private storage: Storage) {}

    increaseVoteCount(sessionId: string) {
        const voteCount = this.getVoteCount(sessionId);
        const voteCountIncreased = voteCount + 1;
        this.storage.setItem(sessionId, voteCountIncreased + '');
        return Promise.resolve(voteCountIncreased);
    }

    getVoteCount(sessionId: string) {
        return parseInt(this.storage.getItem(sessionId), 10) || 0;
    }

    createUserId() {
        const existingUserId = this.getUserId();

        if (Boolean(existingUserId)) {
            return Promise.resolve(existingUserId);
        }

        const userId = this.generateRandomId();
        this.storage.setItem('user', userId);
        return Promise.resolve(userId);
    }

    getUserId() {
        return this.storage.getItem('user');
    }

    private generateRandomId() {
        const S4 = function() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
    }
}
