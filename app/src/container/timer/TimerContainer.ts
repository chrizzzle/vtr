import {connect} from 'react-redux';
import {AppState} from '../../state/AppState';
import {Session} from '../../entity/Session';
import {TimerComponent} from '../../component/timer/TimerComponent';
import {getTimeString} from './TimerHelper';

export const mapStateToProps = (state: AppState, props) => {
    const session: Session = props.session;
    const timerDisplay: string = getTimeString(session.timer || 0);
    const percent: number = session.percent;

    return {
        timer: timerDisplay,
        percent
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
