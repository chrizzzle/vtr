import {AppFactory} from '../factory/AppFactory';
import {optionLoadingSuccess} from '../state/option/option.actions';

export const getOptions = () => {
    return (dispatch, getState, factory: AppFactory) => {
        return factory.getApiService().getOptions()
            .then(results => dispatch(optionLoadingSuccess(results)));
    };
};
