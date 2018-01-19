
import {UIState} from '../UiState';
import {UI_ACTIONS} from './ui.actions';

export const ui = (state: UIState = null, action) => {
    switch (action.type) {
        case UI_ACTIONS.UI_SWITCH_VIEW:
            return {
                ...state,
                view: action.payload
            };
        case UI_ACTIONS.UI_SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case UI_ACTIONS.UI_COUNT_DOWN:
            return {
                ...state,
                timer: {
                    number: action.payload.number,
                    sessionId: action.payload.session._id
                }
            };
        default:
            return state;
    }
};
