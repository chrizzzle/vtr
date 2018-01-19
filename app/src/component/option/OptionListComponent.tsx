import * as React from 'react';
import { Option } from '../../entity/Option';
import './OptionListComponent.css';
import {OptionComponent} from './OptionComponent';
import {Vote} from '../../entity/Vote';
import {getVoteCountByOption} from '../../container/dashboard/DashboardHelper';
import {Session} from '../../entity/Session';
import {Link} from 'react-router-dom';
import {CountdownContainer} from '../../container/countdown/CountdownContainer';
import {TimerContainer} from '../../container/timer/TimerContainer';

interface OptionListComponentProps {
    optionList: Option[];
    votes: Vote[];
    onOptionClick: (option: Option) => void;
    session: Session;
    error: string;
    startSession: (session: Session) => void;
    active: boolean;
}

export class OptionListComponent extends React.Component<OptionListComponentProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const {optionList, votes, session, error, active} = this.props;
        const activeClass = active ? 'option-list--active' : '';

        return <div className={`component option-list ${activeClass}`}>
            <CountdownContainer session={session} />
            <h2>{session.name}</h2>

            <TimerContainer session={session} />
            {Boolean(error) && <div className="alert alert-danger" role="alert">{error}</div>}

            { optionList.map((option: Option) =>
                <OptionComponent key={option._id}
                                 voteCount={getVoteCountByOption(option, votes)}
                                 option={option}
                                 onOptionClick={this.createOptionClickHandler(option)}/>)
            }

            <div className="option-list__button-wrapper">
                <Link className="option-list__button" to={`/`}>View Sessions</Link>
                <Link className="option-list__button" to={`/session/${session._id}/dashboard`}>View Dashboard</Link>
            </div>
            <div className="option-list__button" onClick={this.createSessionClickHandler(session)}>Start Session</div>
        </div>;
    }

    createOptionClickHandler(option: Option) {
        return () => {
            this.props.onOptionClick(option);
        }
    }

    createSessionClickHandler(session: Session) {
        return () => {
            this.props.startSession(session);
        }
    }
}
