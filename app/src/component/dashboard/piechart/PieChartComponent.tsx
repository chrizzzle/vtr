import * as React from 'react';
import { Pie } from "react-chartjs";
import {Option} from '../../../entity/Option';
import {getVoteCountByOption} from '../../../container/dashboard/DashboardHelper';
import {Vote} from '../../../entity/Vote';

interface PieChartComponentProps {
    options: Option[];
    labels: string[];
    votes: Vote[];
}

export class PieChartComponent extends React.Component<PieChartComponentProps, any> {
    render() {
        const {options, labels, votes} = this.props;
        const data = options.map((option:Option) => {

            return {
                label: option.name,
                value: getVoteCountByOption(option, votes)
            }
        });

    return <Pie
            data={data}
            options={{
                responsive: true
            }}
            labels={labels}
            height="200" />
    }
}
