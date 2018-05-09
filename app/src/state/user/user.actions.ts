export const USER_ACTIONS = {
    SAVE_USER_ID_TO_STATE: 'SAVE_USER_ID_TO_STATE'
};

export const saveUserIdToState = (userId: string) => {
    return {
        type: 'SAVE_USER_ID_TO_STATE',
        payload: userId
    };
};
