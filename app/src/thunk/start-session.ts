import {AppFactory} from '../factory/AppFactory';
import {Session} from '../entity/Session';

export const startSession = (session: Session) => {
    return (dispatch, getState, factory: AppFactory) => {
        return factory.getWsService().emit('START', JSON.stringify(session));
    };
};
