import {connect} from 'react-redux';
import {AppState} from '../../state/AppState';
import {CountdownComponent} from '../../component/countdown/CountdownComponent';
import {Session} from '../../entity/Session';

export const mapStateToProps = (state: AppState, props) => {
    const session: Session = props.session;
    const count: number = session.countdown || 0;
    const show: boolean = session.countdown > 0;

    return {
        count,
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
