import {connect} from 'react-redux';
import {AppState} from '../../state/AppState';
import {CountdownComponent} from '../../component/countdown/CountdownComponent';
import {Session} from '../../entity/Session';

export const mapStateToProps = (state: AppState, props) => {
    const session: Session = props.session;
    const number: number = session.countdown || 0;
    const show: boolean = session.countdown > 0;

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
