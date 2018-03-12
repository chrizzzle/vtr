import * as React from 'react';
import './DashboardComponent.css';
import {BarChartComponent} from './barchart/BarChartComponent';
import {Option} from '../../entity/Option';
import {RankingComponent} from './ranking/RankingComponent';
import {PieChartComponent} from './piechart/PieChartComponent';
import {Session} from '../../entity/Session';
import {VoteCountComponent} from './votecount/VoteCountComponent';
import {Vote} from '../../entity/Vote';

interface DashboardComponentProps {
    votes: Vote[];
    optionNames: string[];
    optionsSorted: Option[];
    options: Option[];
    session: Session;
    voteCount: number;
    voteCountByOption: number[];
}

class DashboardComponent extends React.Component<DashboardComponentProps, {}> {
    render() {
        const {
            optionNames,
            optionsSorted,
            options,
            session,
            voteCountByOption,
            voteCount,
            votes
        } = this.props;

        return (
            <div className="dashboard">
                <h2>Session: {session.name}</h2>
                <hr/>
                <div className="row">
                    <div className="dashboard__component col-sm-6">
                        <h2>Bar Chart</h2>
                        <BarChartComponent data={voteCountByOption} labels={optionNames}/>
                    </div>

                    <div className="dashboard__component col-sm-6">
                        <h2>Ranking</h2>
                        <RankingComponent options={optionsSorted}/>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="dashboard__component col-sm-6">
                        <h2>Pie Chart</h2>
                        <PieChartComponent options={options} votes={votes} labels={optionNames}/>
                    </div>

                    <div className="dashboard__component col-sm-6">
                        <h2>Vote Count</h2>
                        <VoteCountComponent count={voteCount}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardComponent;
