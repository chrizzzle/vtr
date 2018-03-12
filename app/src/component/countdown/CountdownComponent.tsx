import * as React from 'react';
import './CountdownComponent.css';

interface CountdownComponentProps {
    count: number;
    show: boolean;
}

export class CountdownComponent extends React.Component<CountdownComponentProps, {}> {
    render() {
        const {count, show} = this.props;

        if (show) {
            return (
                <div className="countdown">
                    <div className="countdown__value">
                        {count}
                    </div>
                </div>
            );
        }

        return <div />;
    }
}
