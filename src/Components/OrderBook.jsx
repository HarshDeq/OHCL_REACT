import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setAskData,
    setBidData,
    setOrderBookdata,
    setOrderBookSocketCreated,
} from '../Redux/orderBook/action';

const constanIndex ={
    count:1,
    amount:2,
    total:3,
    price:0
}

const OrderBook = () => {
    const dispatch = useDispatch();
    const { orderBooKSocketCreated, asks,bids } = useSelector(
        (state) => state?.orderBook
    );

    useEffect(() => {
        const socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
        console.log(orderBooKSocketCreated, 'open');

        if (!orderBooKSocketCreated) {
            const book = JSON.stringify({
                event: 'subscribe',
                channel: 'book',
                symbol: 'tBTCUSD',
                freq:'F0',
                prec:'P0'
            });
            socket.onopen = () => {
                console.log('Open');
                dispatch(setOrderBookSocketCreated(true));
                socket.send(book);
            };

            socket.onmessage = (e) => {
                const indexOfArrOfAskandBid = 1;
                const constantLengthWhenConnectionOpen = 50;
                const constantLengthOfSingleBidorAsk = 3;
                const indexOfAmount = 2;
                let arrOfAskandBid = JSON.parse(e.data);

                // console.log(arrOfAskandBid)

                if (
                    arrOfAskandBid[indexOfArrOfAskandBid]?.length ===
          constantLengthWhenConnectionOpen
                ) {
                    let askArr = [];
                    let bidArr = [];

                    arrOfAskandBid[indexOfArrOfAskandBid]?.forEach((item) => {
                        if (item[indexOfAmount] < 0) {
                            const indexOfNegativeNum = 2;
                            bidArr.push([
                                ...item.slice(0, 2),
                                Math.abs(item[indexOfNegativeNum]),
                            ]);
                        } else {
                            askArr.push(item);
                        }
                    });

                    dispatch(setOrderBookdata({ bids: bidArr, asks: askArr }));
                } else if (
                    arrOfAskandBid[indexOfArrOfAskandBid]?.length ===
          constantLengthOfSingleBidorAsk
                ) {
                    if (arrOfAskandBid[indexOfArrOfAskandBid][indexOfAmount] < 0) {
                        dispatch(
                            setBidData([
                                ...arrOfAskandBid[indexOfArrOfAskandBid].slice(0,2),
                                Math.abs(arrOfAskandBid[indexOfArrOfAskandBid][indexOfAmount]),
                            ])
                        );
                    } else {
                        dispatch(setAskData(arrOfAskandBid[indexOfArrOfAskandBid]));
                    }
                }
            };
        }
        socket.onclose = (e) => {
            dispatch(setOrderBookSocketCreated(false));
            console.log(e);
        };
    }, []);

   

    return (
        <div className="oder-book-conatiner">
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>Amount</th>
                            <th>Total</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                        {asks?.map((arr) => (
                            <tr key = {arr[constanIndex?.total]}>
                                <td>{arr[constanIndex?.count]}</td>
                                <td>{arr[constanIndex?.amount].toFixed(4)}</td>
                                <td>{arr[constanIndex?.total].toFixed(4)}</td>
                                <td>{arr[constanIndex?.price]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='vertical-line'></div>
            <div>
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
                       
                        {bids?.map((arr) => (
                            <tr key = {arr[3]}>
                                <td>{arr[0]}</td>
                                <td>{arr[3].toFixed(4)}</td>
                                <td>{arr[2].toFixed(4)}</td>
                                <td>{arr[1]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderBook;
