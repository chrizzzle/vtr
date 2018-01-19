import {connect} from 'react-redux';
import {AppState} from '../../state/AppState';
import DashboardComponent from '../../component/dashboard/DashboardComponent';
import {
    getOptionNames, getOptionsBySession, getOptionsSorted, getSessionById, getVoteCount, getVoteCountByOptions,
    getVotesBySession
} from './DashboardHelper';

export const mapStateToProps = (state: AppState, props) => {
    const sessionId = props.match.params.id;
    const session = getSessionById(state.sessions.data, sessionId);
    const options = getOptionsBySession(state.options.data, session);
    const votes = getVotesBySession(state.votes.data, session);

    return {
        session: session,
        votes: votes,
        optionNames: getOptionNames(options),
        optionsSorted: getOptionsSorted(options, votes),
        options: options,
        voteCount: getVoteCount(votes),
        voteCountByOption: getVoteCountByOptions(options, votes)
    };
};

export const mapDispatchToProps = (dispatch, props) => {
    return {
    };
};

export const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardComponent);
