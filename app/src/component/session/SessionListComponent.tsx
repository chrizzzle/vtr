import * as React from 'react';
import {Session} from '../../entity/Session';
import {SessionComponent} from './SessionComponent';
import './SessionListComponent.css';
import {ChildProps} from 'react-apollo/types';

interface SessionListComponentProps {
    onSessionClick: (session: Session) => void;
    loading: boolean;
    sessions: Session[];
}

export class SessionListComponent extends React.Component<ChildProps<{}, SessionListComponentProps>> {
    render() {
        if (this.props.data.loading) {
            return null;
        }
        const {sessions} = this.props.data;
        const {onSessionClick} = this.props.data;
        const sessionList = sessions && sessions.length > 0
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
