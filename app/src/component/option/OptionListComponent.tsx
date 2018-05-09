import * as React from 'react';
import {Option} from '../../entity/Option';
import './OptionListComponent.scss';
import {OptionComponent} from './OptionComponent';
import {Session} from '../../entity/Session';
import {CountdownContainer} from '../../container/countdown/CountdownContainer';
import {TimerContainer} from '../../container/timer/TimerContainer';
import './OptionListComponent.css';
import {Vote} from '../../entity/Vote';
import {ChildProps, Mutation} from 'react-apollo';
import {VOTE_OPTION} from '../../container/option/OptionListContainer';

interface OptionListComponentProps {
    options: Option[];
    session: Session;
    votes: Vote[];
    loading: boolean;
}

export class OptionListComponent extends React.Component<ChildProps<{}, OptionListComponentProps>>  {

    render() {
        if (this.props.data.loading) {
            return <div>loading</div>;
        }
        const {options, session} = this.props.data;
        const activeClass = session.active ? 'option-list--active' : '';
        const error = false;

        return (
            <div className={`component option-list ${activeClass}`}>
                <CountdownContainer session={session} />
                <h2>{session.name}</h2>

                <TimerContainer session={session} />
                {Boolean(error) && <div className="alert alert-danger" role="alert">{error}</div>}

                { options.map(
                    (option: Option) => (
                        <Mutation
                            mutation={VOTE_OPTION}
                            variables={{
                                optionId: option._id,
                                sessionId: session._id
                            }}
                            key={option._id}
                        >

                            {voteOption => (
                                <OptionComponent
                                    option={option}
                                    onOptionClick={voteOption}
                                />
                            )}
                        </Mutation>
                        )
                    )
                }
            </div>
        );
    }
}
