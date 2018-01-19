import * as React from 'react';
import './ConnectedComponent.css';

interface ConnectedComponentProps {
    connected: boolean;
}

export class ConnectedComponent extends React.Component<ConnectedComponentProps, any> {
    render() {
        const {connected} = this.props;
        const className = connected ? 'connected--active' : '';
        const content = connected ? 'connected' : 'not connected';

        return <div className={`component connected ${className}`}>{content}</div>;
    }
}
