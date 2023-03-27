import React from 'react';
import { fixedFloatNumber } from '../utils/utilsForNumber';
import CustomChart from './Chart';

const ASKS_OPTIONS = {
    chart: {
        toolbar: {
            show: false,
        },
        height: 410,
        animations: {
            enabled: true,
        },
    },

    plotOptions: {
        bar: {
            horizontal: true,
            barHeight: '100%',
            columnWidth: '100%',
        },
    },

    tooltip: {
        enabled: false,
    },
    dataLabels: {
        enabled: false,
    },

    stroke: {
        show: false,
        width: 0,
    },

    yaxis: {
        reversed: false,

        labels: {
            show: false,
        },
    },
    xaxis: {
        labels: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    grid: {
        show: false,
    },
    fill: {
        colors: ['#FF0000'],
        opacity: 0.4,
        type: 'solid',
    },
    states: {
        hover: {
            filter: {
                type: 'none',
            },
        },
    },
};

const HEADERS = ['Price', 'Total', 'Amount', 'Count'];

const AsksOrderBookTable = (props) => {
    const { askOrderBook, askOrderBookKeys, listOfAsksSum } = props;
    return (
        <div className="position-relative">
            <div className="position-absolute">
                <CustomChart
                    data={listOfAsksSum}
                    options={ASKS_OPTIONS}
                    type="bar"
                    height="100%"
                    width="100%"
                />
            </div>
            <table>
                <thead>
                    <tr>
                        {HEADERS?.map((title) => (
                            <th key={title}>{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {askOrderBookKeys?.map((price, index) => (
                        <tr key={price} className="ask-animation">
                            <td>{price}</td>
                            <td>{fixedFloatNumber(listOfAsksSum[index], 4)}</td>
                            <td>{fixedFloatNumber(askOrderBook[price].amount, 5)}</td>
                            <td>{askOrderBook[price].count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AsksOrderBookTable;
