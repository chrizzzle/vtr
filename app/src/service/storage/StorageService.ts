export interface StorageService {
    increaseVoteCount: (sessionId: string) => void;
    getVoteCount: (sessionId: string) => number;
    createUserId: () => Promise<string>;
    getUserId: () => string;
}
