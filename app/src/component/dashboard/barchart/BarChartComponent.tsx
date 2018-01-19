import * as React from 'react';
import { Bar } from "react-chartjs";

interface BarChartComponentProps {
    data: number[];
    labels: string[];
}

export class BarChartComponent extends React.Component<BarChartComponentProps, any> {
    render() {
        const {data, labels} = this.props;
        const options = {
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        };

    return <Bar
            data={{
                datasets: [{
                    fillColor: 'rgba(220,220,220,1)',
                    strokeColor: 'rgba(220,220,220,1)',
                    pointColor: 'rgba(220,220,220,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: data
                }],
                labels
            }}
            options={options}
            height="200"/>
    }
}
