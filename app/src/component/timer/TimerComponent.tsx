import * as React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import './TimerComponent.css';
import {Subscription} from 'react-apollo';
import {TIMER_SUBSCRIPTION} from '../../container/timer/TimerContainer';
import {Session} from '../../entity/Session';

interface TimerComponentProps {
    session: Session;
}

export class TimerComponent extends React.Component<TimerComponentProps, {}> {
    render() {
        const {session} = this.props;

        return (
            <Subscription
                subscription={TIMER_SUBSCRIPTION}
                variables={{sessionId: session._id}}
            >
                {(props) => (
                    !props.loading && (
                        <div className="timer">
                            <div className="timer__value">
                                <CircularProgressbar percentage={props.data.timerChanged.percent} textForPercentage={null} />
                            </div>

                            <div className="timer__time">
                                {props.data.timerChanged.timer}
                            </div>
                        </div>
                    )
                )}
            </Subscription>
        );
    }
}
