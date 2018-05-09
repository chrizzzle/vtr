import * as React from 'react';
import './CountdownComponent.css';
import {ChildProps} from 'react-apollo';

interface CountdownComponentProps {
    countdown: number;
    show: boolean;
}

export class CountdownComponent extends React.Component<ChildProps<{}, CountdownComponentProps>> {
    render() {
        const {countdown, show} = this.props.data;

        if (show) {
            return (
                <div className="countdown">
                    <div className="countdown__value">
                        {countdown}
                    </div>
                </div>
            );
        }

        return <div />;
    }
}
