import * as React from 'react';
import './CountdownComponent.css';

interface CountdownComponentProps {
    number: number;
    show: boolean;
}

export class CountdownComponent extends React.Component<CountdownComponentProps, any> {
    render() {
        const {number, show} = this.props;

        if (show) {
            return <div className="countdown">
                <div className="countdown__value">
                    {number}
                </div>
            </div>;
        }

        return <div />;
    }
}
