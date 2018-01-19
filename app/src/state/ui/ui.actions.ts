import {Session} from '../../entity/Session';

export const UI_ACTIONS = {
    UI_SET_LOADING: 'UI_SET_LOADING'
};

export const uiSetLoading = (loading: boolean) => {
    return {
        type: 'UI_SET_LOADING',
        payload: loading
    }
};

export const uiCountDown = (number: number, session: Session) => {
    return {
        type: 'UI_COUNT_DOWN',
        payload: {
            number,
            session
        }
    }
};
