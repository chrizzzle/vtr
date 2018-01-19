
import {WsState} from '../WsState';
import {WS_ACTIONS} from './ws.actions';

export const ws = (state: WsState = null, action) => {
    switch (action.type) {
        case WS_ACTIONS.WS_SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case WS_ACTIONS.WS_SET_CONNECTED:
            return {
                ...state,
                connected: action.payload
            };
        default:
            return state;
    }
};
