import {Session} from '../../entity/Session';

export const UI_ACTIONS = {
    UI_SWITCH_VIEW: 'UI_SWITCH_VIEW',
    UI_SET_LOADING: 'UI_SET_LOADING',
    UI_COUNT_DOWN: 'UI_COUNT_DOWN'
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
