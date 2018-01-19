import {connect} from 'react-redux';
import {AppState} from '../../state/AppState';
import {Option} from '../../entity/Option';
import {vote} from '../../thunk/vote';
import {OptionListComponent} from '../../component/option/OptionListComponent';
import {getOptionsBySession, getSessionById, getVotesBySession} from '../dashboard/DashboardHelper';
import {startSession} from '../../thunk/start-session';
import {Session} from '../../entity/Session';

export const mapStateToProps = (state: AppState, props) => {
    const sessionId = props.match.params.id;
    const session = getSessionById(state.sessions.data, sessionId);
    const options = getOptionsBySession(state.options.data, session);
    const votes = getVotesBySession(state.votes.data, session);

    return {
        optionList: options,
        votes: votes,
        session: session,
        error: state.votes.error
    };
};

export const mapDispatchToProps = (dispatch, props) => {
    return {
        onOptionClick: (option: Option) => dispatch(vote(option)),
        startSession: (session: Session) => dispatch(startSession(session))
    };
};

export const OptionListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OptionListComponent);
