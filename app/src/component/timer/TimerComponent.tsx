import * as React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import './TimerComponent.css';

interface TimerComponentProps {
    timer: string;
    percent: number;
}

export class TimerComponent extends React.Component<TimerComponentProps, {}> {
    render() {
        const {timer, percent} = this.props;

        return (
            <div className="timer">
                <div className="timer__value">
                    <CircularProgressbar percentage={percent} textForPercentage={null} />
                </div>

                <div className="timer__time">
                    {timer}
                </div>
            </div>
        );
    }
}
