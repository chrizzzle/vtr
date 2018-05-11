import * as React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import './TimerComponent.css';
import {Subscription} from 'react-apollo';
import {TIMER_SUBSCRIPTION} from '../../container/timer/TimerContainer';
import {Session} from '../../entity/Session';

interface TimerComponentProps {
    session: Session;
}

interface TimerComponentState {
    timer: Number;
    percent: Number;
}

export class TimerComponent extends React.Component<TimerComponentProps, TimerComponentState> {
    state = {
        timer: 100,
        percent: 100
    };

    componentWillReceiveProps (nextProps: any) {
        this.setState({
            timer: nextProps.session.timer,
            percent: nextProps.session.percent
        });
    }

    render() {
        const {session} = this.props;

        return (
            <Subscription
                subscription={TIMER_SUBSCRIPTION}
                variables={{sessionId: session._id}}
            >
                {(subscriptionProps) => {
                    return (

                        <div className="timer">
                            <div className="timer__value">
                                <CircularProgressbar
                                    percentage={this.state.percent}
                                    textForPercentage={null}
                                />
                            </div>

                            <div className="timer__time">
                                {this.state.timer}
                            </div>
                        </div>

                )}}
            </Subscription>
        );
    }
}
