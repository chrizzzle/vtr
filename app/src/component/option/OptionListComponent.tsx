import * as React from 'react';
import {Option} from '../../entity/Option';
import './OptionListComponent.scss';
import {OptionComponent} from './OptionComponent';
import {Session} from '../../entity/Session';
import {CountdownContainer} from '../../container/countdown/CountdownContainer';
import {TimerContainer} from '../../container/timer/TimerContainer';
import './OptionListComponent.css';
import {Vote} from '../../entity/Vote';
import {VoteCount} from '../../entity/VoteCount';

interface OptionListComponentProps {
    options: Option[];
    session: Session;
    user: User;
    votes: Vote[];
    loading: boolean;
    voteCount: VoteCount[];
    voteCountSubscribed: VoteCount[];
    mutate: any;
}

export class OptionListComponent extends React.Component<OptionListComponentProps>  {
    getVoteCountForOption (optionId: string): number {
        const initialVoteCount = this.props.voteCountSubscribed ?
            this.props.voteCountSubscribed :
            this.props.voteCount;
        const voteCount = initialVoteCount.find((current: VoteCount) => optionId === current.optionId);
        return voteCount ? voteCount.voteCount : 0;
    }

    onVote(optionId: string) {
        return () => {
            this.props.mutate({
                variables: {
                    optionId: optionId,
                    sessionId: this.props.session._id,
                    userId: this.props.user._id
                }
            });
        };
    }

    render() {
        if (this.props.loading) {
            return <div>loading</div>;
        }
        const {options, session, user} = this.props;
        const activeClass = session.active ? 'option-list--active' : '';
        const error = false;

        return (
            <div className={`component option-list ${activeClass}`}>
                <CountdownContainer session={session} />
                <h2>{session.name}</h2>
                <TimerContainer session={session} />

                {Boolean(error) && <div className="alert alert-danger" role="alert">{error}</div>}

                { options.map((option: Option) => (
                        <OptionComponent
                            key={option._id}
                            option={option}
                            user={user}
                            onOptionClick={this.onVote(option._id)}
                            voteCount={this.getVoteCountForOption(option._id)}
                        />
                    )
                )}
            </div>
        );
    }
}
