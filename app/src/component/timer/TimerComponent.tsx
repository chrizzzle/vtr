import * as React from 'react';

interface TimerComponentProps {
    timer: string;
}

export class TimerComponent extends React.Component<TimerComponentProps, any> {
    render() {
        const {timer} = this.props;


        return <div className="timer">
            <div className="timer__value">
                {timer}
            </div>
        </div>;
    }
}
