import {connect} from 'react-redux';
import {AppState} from '../../state/AppState';
import {SessionListComponent} from '../../component/session/SessionListComponent';

export const mapStateToProps = (state: AppState, props) => {
    return {
        sessions: state.sessions.data
    };
};

export const mapDispatchToProps = (dispatch, props) => {
    return {

    };
};

export const SessionListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SessionListComponent);
