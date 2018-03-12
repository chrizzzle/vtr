import * as React from 'react';
import './VoteCountComponent.css';

interface VoteCountComponentProps {
    count: number;
}

export class VoteCountComponent extends React.Component<VoteCountComponentProps, {}> {
    render() {
        const {count} = this.props;

        return (
            <div className="votecount">
                <div className="votecount__text">
                    <span className="votecount__count">{count}</span>&nbsp;Votes
                </div>
            </div>
        );
    }
}
