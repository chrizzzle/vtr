export const WS_ACTIONS = {
    WS_SET_LOADING: 'WS_SET_LOADING',
    WS_SET_CONNECTED: 'WS_SET_CONNECTED'
};

export const wsSetLoading = (loading: boolean) => {
    return {
        type: 'WS_SET_LOADING',
        payload: loading
    };
};

export const wsSetConnected = (connected: boolean) => {
    return {
        type: 'WS_SET_CONNECTED',
        payload: connected
    }
};
