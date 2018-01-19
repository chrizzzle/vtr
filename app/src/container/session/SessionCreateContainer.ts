import {connect} from 'react-redux';
import {AppState} from '../../state/AppState';
import {SessionCreateComponent} from '../../component/session/SessionCreateComponent';

export const mapStateToProps = (state: AppState, props) => {
    return {

    };
};

export const mapDispatchToProps = (dispatch, props) => {
    return {
    };
};

export const SessionCreateContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SessionCreateComponent);
