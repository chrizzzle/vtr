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
        const sessionList = sessions.length > 0
            ? sessions.map((session: Session) =>
                <SessionComponent key={session._id} session={session} onSessionClick={onSessionClick} />)
            : <div className="session-list__empty-text">No voting sessions available</div>;

        return (
            <div className="session-list">
                {sessionList}
            </div>
        );
    }
}
