import React, { useEffect, useState } from 'react';
import CustomChart from '../Components/Chart';
import { fixedFloatNumber } from '../utils/utilsForNumber';

const OrderBook = () => {
    const [asksData, setAsksData] = useState({});
    const [bidsData, setBidsData] = useState({});

    const [objKeys, setObjKeys] = useState({
        asksKeys: [],
        bidsKeys: [],
    });

    const [listOfSum, setListOfSum] = useState({
        asksSum: [],
        bidSum: [],
    });

    const SOCKET_URL = 'wss://api-pub.bitfinex.com/ws/2';

    const getAListOfSum = (keys, arr) => {
        const listOfSum = [];

        keys?.forEach((price, index) => {
            if (index === 0) {
                listOfSum.push(arr[price][1]);
            } else {
                listOfSum.push(arr[price][1] + listOfSum[index - 1]);
            }
        });

        return listOfSum;
    };

    const updateAsks = (data) => {
        const COUNT_INDEX = 1,
            PRICE_INDEX = 0,
            AMOUNT_INDEX = 2;
        const asks = asksData;
        if (data[COUNT_INDEX] > 0) {
            asks[data[PRICE_INDEX]] = [
                data[COUNT_INDEX],
                Math.abs(data[AMOUNT_INDEX]),
            ];
        } else {
            delete asks[data[PRICE_INDEX]];
        }

        const ASKS_KEYS = Object?.keys(asks);
        const ASK_SUM_LIST = getAListOfSum(ASKS_KEYS, asks);

        setObjKeys((prevSate) => ({
            ...prevSate,
            asksKeys: ASKS_KEYS,
        }));

        setAsksData({ ...asks });

        setListOfSum((prevSate) => ({
            ...prevSate,
            asksSum: ASK_SUM_LIST,
        }));
    };

    const updateBids = (data) => {
        const COUNT_INDEX = 1,
            PRICE_INDEX = 0,
            AMOUNT_INDEX = 2;
        const bids = bidsData;

        if (data[COUNT_INDEX] > 0) {
            bids[data[PRICE_INDEX]] = [data[COUNT_INDEX], data[AMOUNT_INDEX]];
        } else {
            delete bids[data[PRICE_INDEX]];
        }

        const BIDS_KEYS = Object?.keys(bids)?.reverse();

        const BID_SUM_LIST = getAListOfSum(BIDS_KEYS, bids);

        setObjKeys((prevSate) => ({
            ...prevSate,
            bidsKeys: BIDS_KEYS,
        }));

        setBidsData({ ...bids });

        setListOfSum((prevSate) => ({
            ...prevSate,
            bidSum: BID_SUM_LIST,
        }));
    };

    // const updataAskAndBid = (data)=>{
    //     const COUNT_INDEX = 1 , PRICE_INDEX = 0, AMOUNT_INDEX = 2
    //     const asks = asksData
    //     const bids = bidsData

    //     if(data[COUNT_INDEX] > 0){
    //         if(data[AMOUNT_INDEX] > 0){
    //             bids[data[PRICE_INDEX]] = [data[COUNT_INDEX], data[AMOUNT_INDEX]]
    //         }else if(data[AMOUNT_INDEX] < 0){
    //             asks[data[PRICE_INDEX]] = [data[COUNT_INDEX], Math.abs(data[AMOUNT_INDEX])]
    //         }
    //     }
    //     else {
    //         if(data[AMOUNT_INDEX] === 1){
    //             delete bids[ data[PRICE_INDEX]  ]
    //         }
    //         else if(data[AMOUNT_INDEX] === -1){
    //             delete asks[data[PRICE_INDEX]]
    //         }
    //     }

    //     const ASKS_KEYS = Object?.keys(asks)
    //     const BIDS_KEYS = Object?.keys(bids)?.reverse()

    //     const ASK_SUM_LIST = getAListOfSum(ASKS_KEYS,asks)
    //     const BID_SUM_LIST = getAListOfSum(BIDS_KEYS, bids)

    //     setObjKeys({
    //         asksKeys:ASKS_KEYS,
    //         bidsKeys:BIDS_KEYS
    //     })

    //     setAsksData({...asks})
    //     setBidsData({...bids})

    //     setListOfSum({
    //         asksSum:ASK_SUM_LIST,
    //         bidSum:BID_SUM_LIST
    //     })

    // }

    const connect = () => {
        const socket = new WebSocket(SOCKET_URL);

        const BOOK = JSON.stringify({
            event: 'subscribe',
            channel: 'book',
            symbol: 'tBTCUSD',
            freq: 'F0',
            prec: 'P0',
        });

        socket.onopen = () => {
            socket.send(BOOK);
        };

        socket.onmessage = (e) => {
            const orderBookData = JSON.parse(e.data)[1];

            const AMOUNT_INDEX = 2;

            if (orderBookData?.length === 50) {
                orderBookData?.forEach((data) => {
                    if (data[AMOUNT_INDEX] > 0) {
                        updateBids(data);
                    } else {
                        updateAsks(data);
                    }
                    // updataAskAndBid(data)
                });
            } else if (orderBookData?.length === 3) {
                if (orderBookData[AMOUNT_INDEX] > 0) {
                    updateBids(orderBookData);
                } else {
                    updateAsks(orderBookData);
                }
                // updataAskAndBid(orderBookData)
            }
        };

        return () => {
            socket.close();
        };
    };

    const bidsOptions = {
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
        },
        grid: {
            position: 'back',
        },
        fill: {
            colors: ['#00FF00'],
            opacity: 0.5,
        },
    };

    const asksOptions = {
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
            reversed: false,

            labels: {
                show: false,
            },
        },
        xaxis: {
            labels: {
                show: false,
            },
        },
        grid: {
            position: 'back',
        },
        fill: {
            colors: ['#FF0000'],
            opacity: 0.5,
        },
    };

    useEffect(() => {
        connect();
    }, []);

    return (
        <div className="oder-book-conatiner">
            <div className="position-relative">
                <div className="position-absolute">
                    <CustomChart
                        data={listOfSum?.bidSum}
                        options={bidsOptions}
                        type="bar"
                        height="100%"
                        width="100%"
                    />
                </div>
                <table style={{ zIndex: 4 }}>
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>Amount</th>
                            <th>Total</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {objKeys?.bidsKeys?.map((price, index) => (
                            <tr key={price} className="bid-animation">
                                <td>{bidsData[price][0]}</td>
                                <td>{fixedFloatNumber(bidsData[price][1], 5)}</td>
                                <td>{fixedFloatNumber(listOfSum?.bidSum[index], 4)}</td>
                                <td>{price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="vertical-line"></div>
            <div className="position-relative">
                <div className="position-absolute">
                    <CustomChart
                        data={listOfSum?.asksSum}
                        options={asksOptions}
                        type="bar"
                        height="100%"
                        width="100%"
                    />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Amount</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {objKeys?.asksKeys?.map((price, index) => (
                            <tr key={price} className="ask-animation">
                                <td>{price}</td>
                                <td>{fixedFloatNumber(listOfSum?.asksSum[index], 4)}</td>
                                <td>{fixedFloatNumber(asksData[price][1], 5)}</td>
                                <td>{asksData[price][0]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderBook;
