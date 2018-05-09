import * as React from 'react';
import {Session} from '../../entity/Session';

import { Link } from 'react-router-dom';

interface SessionComponentProps {
    session: Session;
    onSessionClick: (session: Session) => void;
}

export class SessionComponent extends React.Component<SessionComponentProps, {}> {
    render() {
        const {session} = this.props;
        return (
            <Link className="session" to={`session/${session._id}`}>
                <div className="session__name">{session.name}</div>
                <div className="session__active" />
            </Link>
        );
    }

    createSessionClickHandler(session: Session) {
        return  () => this.props.onSessionClick(session);
    }
}
