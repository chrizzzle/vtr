import {USER_ACTIONS} from './user.actions';
import {UserState} from '../UserState';

export const user = (state: UserState = null, action) => {
    switch (action.type) {
        case USER_ACTIONS.SAVE_USER_ID_TO_STATE:
            return {
                ...state,
                userId: action.payload
            };
        default:
            return state;
    }
};
