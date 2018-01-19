import * as React from 'react';
import {Option} from '../../../entity/Option';
import './RankingComponent.css'

interface RankingComponentProps {
    options: Option[];
}

export class RankingComponent extends React.Component<RankingComponentProps, any> {
    render() {
        const {options} = this.props;

        return <ul className="ranking">
                {options.map((option: Option, index: number) =>
                    <li key={option._id}>
                        <span className="ranking__number">{index+1}.</span>&nbsp;
                        {option.name}
                    </li>
                )}
            </ul>
    }
}
