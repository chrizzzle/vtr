import * as React from 'react';
import {Session} from '../../entity/Session';
import {SessionComponent} from './SessionComponent';
import './SessionListComponent.css';

interface SessionListComponentProps {
    sessions: Session[];
    onSessionClick: (session: Session) => void;
}

export class SessionListComponent extends React.Component<SessionListComponentProps, {}> {
    render() {
        const {sessions, onSessionClick} = this.props;

        return (
            <div className="session-list">
                {sessions.map((session: Session) =>
                    <SessionComponent key={session._id} session={session} onSessionClick={onSessionClick} />
                )}
            </div>
        );
    }
}
