import * as React from 'react';
import {Option} from '../../entity/Option';

interface OptionComponentProps {
    option: Option;
    user: User;
    onOptionClick: () => void;
    voteCount: number;
}

export class OptionComponent extends React.Component<OptionComponentProps, {}> {
    render() {
        const {option, voteCount} = this.props;

        return (
            <button className="component option-list__option" onClick={this.props.onOptionClick}>
                <div className="option-list__option-name">{option.name}</div>
                <div className="option-list__option-votes">{voteCount}</div>
            </button>
        );
    }
}
