import {connect} from 'react-redux';
import {AppState} from '../../state/AppState';
import {CountdownComponent} from '../../component/countdown/CountdownComponent';
import {Session} from '../../entity/Session';

export const mapStateToProps = (state: AppState, props) => {
    const session: Session = props.session;
    const number = state.ui.timer
        ? state.ui.timer.number
        : 0;
    const show = state.ui.timer
        ? state.ui.timer.sessionId === session._id && state.ui.timer.number > 0
        : false;

    console.log(state.ui.timer ? state.ui.timer.sessionId : 'null', number);

    return {
        number,
        show
    };
};

export const mapDispatchToProps = (dispatch, props) => {
    return {
    };
};

export const CountdownContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CountdownComponent);
