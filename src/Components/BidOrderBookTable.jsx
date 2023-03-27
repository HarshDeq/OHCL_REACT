import React from 'react';
import { fixedFloatNumber } from '../utils/utilsForNumber';
import CustomChart from './Chart';

const BIDS_OPTIONS = {
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
            barHeight: '100',
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
        reversed: true,

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
        colors: ['#00FF00'],
        opacity: 0.5,
    },
    states: {
        hover: {
            filter: {
                type: 'none',
            },
        },
    },
};

const HEADERS = ['Count', 'Amount', 'Total', 'Price'];

const BidOrderBookTable = (props) => {
    const { bidOrderBook, bidOrderBookKeys, listOfBidsSum } = props;

    return (
        <div className="position-relative">
            <div className="position-absolute">
                <CustomChart
                    data={listOfBidsSum}
                    options={BIDS_OPTIONS}
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
                    {bidOrderBookKeys?.map((price, index) => (
                        <tr key={price} className="bid-animation">
                            <td>{bidOrderBook[price].count}</td>
                            <td>{fixedFloatNumber(bidOrderBook[price].amount, 5)}</td>
                            <td>{fixedFloatNumber(listOfBidsSum[index], 4)}</td>
                            <td>{price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BidOrderBookTable;
