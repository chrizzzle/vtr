import {Session} from '../entity/Session';

export interface SessionState {
    isLoading: boolean;
    data: Session[];
    error: string;
}

export const createInitialSessionState = (): SessionState => {
    return {
        isLoading: false,
        data: [],
        error: null
    };
};
