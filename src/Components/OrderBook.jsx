import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setNegativeData,
    setOrderBookdata,
    setOrderBookSocketCreated,
    setPostiveData,
} from '../Redux/orderBook/action';
// import { useDispatch, useSelector } from 'react-redux';

const OrderBook = () => {
    const dispatch = useDispatch();
    const {  orderBooKSocketCreated ,negative} = useSelector(
        (state) => state?.orderBook
    );

    useEffect(() => {
        const socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
        console.log(orderBooKSocketCreated, 'open')

        if (!orderBooKSocketCreated) {
            let book = JSON.stringify({
                event: 'subscribe',
                channel: 'book',
                symbol: 'tBTCUSD',
            });
            socket.onopen = () => {
                console.log('Open');
                dispatch(setOrderBookSocketCreated(true))
                socket.send(book);
            };

            socket.onmessage = (e) => {
                const indexOfArrOfAskandBid = 1
                const constantLengthWhenConnectionOpen = 50
                const constantLengthOfSingleBidorAsk = 3
                const indexOfAmount = 2
                let arrOfAskandBid = JSON.parse(e.data);


                // console.log(data)

                if (arrOfAskandBid[indexOfArrOfAskandBid]?.length === constantLengthWhenConnectionOpen) {
                    let pos = [];
                    let neg = [];

                    arrOfAskandBid[indexOfArrOfAskandBid]?.forEach((item) => {
                        if (item[indexOfArrOfAskandBid] < 0) {
                            neg.push(item);
                        } else {
                            pos.push(item);
                        }
                    });

                    dispatch(setOrderBookdata({ negative: neg, positive: pos }));
                } else if (data[indexOfArrOfAskandBid]?.length === constantLengthOfSingleBidorAsk) {
                    if (data[indexOfArrOfAskandBid][indexOfAmount] < 0) {
                        dispatch(setNegativeData(data[indexOfArrOfAskandBid]));
                    } else {
                        dispatch(setPostiveData(data[indexOfArrOfAskandBid]));
                    }
                }
            };
        }
        socket.onclose = (e) => {
            dispatch(setOrderBookSocketCreated(false))
            console.log(e);
        };

      
    }, []);

    useEffect(() => {
        console.log(negative);
    }, [negative]);

    return (
        <div className="oder-book-conatiner">
            <div>T1</div>
            <div>T1</div>
        </div>
    );
};

export default OrderBook;
