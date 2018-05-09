import * as React from 'react';
import {Option} from '../../entity/Option';
import {Query, Subscription} from 'react-apollo';
import {VOTE_COUNT, VOTE_SUBSCRIPTION} from '../../container/option/OptionListContainer';

interface OptionComponentProps {
    option: Option;
    onOptionClick: () => void;
}

export class OptionComponent extends React.Component<OptionComponentProps, {}> {
    render() {
        const {option} = this.props;

        return (
            <Query query={VOTE_COUNT} variables={{optionId: option._id}}>
                {({ loading, error, data: queryData }) => (
                    <button className="component option-list__option" onClick={this.props.onOptionClick}>
                        <div className="option-list__option-name">{option.name}</div>
                        <Subscription
                            subscription={VOTE_SUBSCRIPTION}
                            variables={{optionId: option._id}}
                        >
                            {(subscriptionData) => {
                                const voteCountSubscribed = subscriptionData.data
                                    ? subscriptionData.data.voteCount.voteCount
                                    : '';

                                const voteCountQueried = queryData.voteCount
                                    ? queryData.voteCount.voteCount
                                    : '';

                                return (
                                    <div className="option-list__option-votes">
                                        {voteCountSubscribed || voteCountQueried}
                                    </div>
                                );
                            }}
                        </Subscription>
                    </button>
                )}
            </Query>
        );
    }
}
