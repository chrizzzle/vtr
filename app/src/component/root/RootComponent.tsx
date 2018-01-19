import * as React from 'react';
import {SessionListContainer} from '../../container/session/SessionListContainer';
import './RootComponent.css';

interface RootComponentProps {
    onSessionCreate: () => void;
}

export class RootComponent extends React.Component<RootComponentProps, any> {
    render() {
        const {onSessionCreate} = this.props;

        return <div className="root">
            <SessionListContainer />
            <button className="root__button" onClick={onSessionCreate}>+</button>
        </div>;
    }
}
