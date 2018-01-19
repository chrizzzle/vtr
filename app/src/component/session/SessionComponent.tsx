import * as React from 'react';
import {Session} from '../../entity/Session';

import { Link } from 'react-router-dom'

interface SessionComponentProps {
    session: Session;
    onSessionClick: (session: Session) => void;
}

export class SessionComponent extends React.Component<SessionComponentProps, any> {
    render() {
        const {session} = this.props;
        return <Link className="session" to={`session/${session._id}/options`}>{session.name}</Link>;
    }

    createSessionClickHandler(session: Session) {
        return  () => this.props.onSessionClick(session);
    }
}
