import {connect} from 'react-redux';
import {AppState} from '../../state/AppState';
import {Session} from '../../entity/Session';
import {TimerComponent} from '../../component/timer/TimerComponent';
import {getTimeString} from './TimerHelper';

export const mapStateToProps = (state: AppState, props) => {
    const session: Session = props.session;
    const timer: number = session.timer || 0;
    const display: string = getTimeString(timer);

    return {
        timer: display
    };
};

export const mapDispatchToProps = (dispatch, props) => {
    return {
    };
};

export const TimerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TimerComponent);
