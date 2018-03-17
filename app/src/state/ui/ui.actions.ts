export const UI_ACTIONS = {
    UI_SET_LOADING: 'UI_SET_LOADING'
};

export const uiSetLoading = (loading: boolean) => ({
    type: 'UI_SET_LOADING',
    payload: loading
});
