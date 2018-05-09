export interface UserState {
    userId: string;
}

export const createInitialUserState = (): UserState => {
    return {
        userId: null
    };
};
