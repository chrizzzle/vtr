
import {UIState} from '../UiState';
import {UI_ACTIONS} from './ui.actions';

export const ui = (state: UIState = null, action) => {
    switch (action.type) {
        case UI_ACTIONS.UI_SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state;
    }
};
