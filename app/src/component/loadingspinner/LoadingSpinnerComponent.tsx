import * as React from 'react';
import './LoadingSpinnerComponent.css';

interface LoadingSpinnerComponentProps {
}

export class LoadingSpinnerComponent extends React.Component<LoadingSpinnerComponentProps, {}> {
    render() {
        return (
            <div className="loading-spinner">
                <div className="loading-spinner__wrapper">
                    <div className="loading-spinner__double-bounce1" />
                    <div className="loading-spinner__double-bounce2" />
                </div>
            </div>
        );
    }
}
