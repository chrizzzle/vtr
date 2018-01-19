import {OptionState} from '../OptionState';
import {OPTION_ACTIONS} from './option.actions';
import {Option} from '../../entity/Option';

export const options = (state: OptionState = null, action) => {
    switch (action.type) {
        case OPTION_ACTIONS.OPTION_SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case OPTION_ACTIONS.OPTION_LOADING_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case OPTION_ACTIONS.OPTION_LOADING_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case OPTION_ACTIONS.OPTION_SELECT_SESSION:
            return {
                ...state,
                session: action.payload
            };
        case OPTION_ACTIONS.OPTION_INCOMING_VOTE:
            return {
                ...state,
                data: state.data.map((option: Option) => {
                    if (option._id === action.payload._id) {
                        return {
                            ...action.payload
                        };
                    }

                    return option;
                })
            };
        default:
            return state;
    }
};
