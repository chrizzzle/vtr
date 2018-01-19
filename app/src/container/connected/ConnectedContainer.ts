import {connect} from 'react-redux';
import {AppState} from '../../state/AppState';
import {ConnectedComponent} from '../../component/connected/ConnectedComponent';

export const mapStateToProps = (state: AppState, props) => {
    return {
        connected: state.ws.connected
    };
};

export const mapDispatchToProps = (dispatch, props) => {
    return {
    };
};

export const ConnectedContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedComponent);
