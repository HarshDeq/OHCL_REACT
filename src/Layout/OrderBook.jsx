import React, {  useContext, useEffect, useState } from 'react';
import { TradingPairContext } from '../App';
import AsksOrderBookTable from '../Components/AsksOrderBookTable';
import BidOrderBookTable from '../Components/BidOrderBookTable';
import Spinner from '../Components/Spinner';
import { WEB_SOCKET_BASE_URL } from '../utils/constants';
import { getListOfSumOFOrderBook, subscribeOrderBook, updateAsksOrderBook, updateBidsOrderBook } from '../utils/OrderBook';
import useWebSocket from '../utils/useWebSocket';

const DEFAULT_COMPARISON_AMOUNT_INDEX = 0

const OrderBook = () => {
    const {tradingPair} = useContext(TradingPairContext)

    const [asksOrderBook, setAsksOrderBook] = useState({});
    const [bidsOrderBook, setBidsOrderBook] = useState({});

    const [isOpen,send,close,updateOrderBook,socket,openNewConnection] = useWebSocket()

    const [orderBookKeys, setOrderBookKeys] = useState({
        asksKeys: [],
        bidsKeys: [],
    });

    const [listOfSum, setListOfSum] = useState({
        asksSum: [],
        bidSum: [],
    });


    const updateAsks = (newOrder) => {
       
        const asks = updateAsksOrderBook(asksOrderBook,newOrder);

        const ASKS_KEYS = Object?.keys(asks);
        const ASK_SUM_LIST = getListOfSumOFOrderBook(ASKS_KEYS, asks);

        setOrderBookKeys((prevSate) => ({
            ...prevSate,
            asksKeys: ASKS_KEYS,
        }));

        setAsksOrderBook({ ...asks });

        setListOfSum((prevSate) => ({
            ...prevSate,
            asksSum: ASK_SUM_LIST,
        }));
    };

    const updateBids = (newOrder) => {
        const bids = updateBidsOrderBook( bidsOrderBook,newOrder);

        const BIDS_KEYS = Object?.keys(bids)?.reverse();

        const BID_SUM_LIST = getListOfSumOFOrderBook(BIDS_KEYS, bids);

        setOrderBookKeys((prevSate) => ({
            ...prevSate,
            bidsKeys: BIDS_KEYS,
        }));

        setBidsOrderBook({ ...bids });

        setListOfSum((prevSate) => ({
            ...prevSate,
            bidSum: BID_SUM_LIST,
        }));
    };

    const updateOrderBookBasedOnAmount = (order)=>{

        const AMOUNT_INDEX = 2;

        if (order[AMOUNT_INDEX] > DEFAULT_COMPARISON_AMOUNT_INDEX) {
            updateBids(order);
        } else {
            updateAsks(order);
        }
    }

    useEffect(() => {
        if(isOpen && socket){

            send(subscribeOrderBook(tradingPair))
            updateOrderBook(updateOrderBookBasedOnAmount)
        }

    }, [isOpen,socket]);

    useEffect(()=>{
        
        if(isOpen){
            close()
            setAsksOrderBook({})
            setBidsOrderBook({})
            setOrderBookKeys({
                asksKeys: [],
                bidsKeys: [],
            })

            setListOfSum({
                asksSum: [],
                bidSum: [],
            })
        }
        openNewConnection(WEB_SOCKET_BASE_URL)
        
    },[tradingPair])


    return (
        <div className="oder-book-conatiner">   

            { (orderBookKeys?.bidsKeys.length || orderBookKeys?.asksKeys.length)?
                <>
                    <BidOrderBookTable bidOrderBook={bidsOrderBook} bidOrderBookKeys={orderBookKeys?.bidsKeys} listOfBidsSum ={listOfSum?.bidSum} />

                    <div className="vertical-line"></div>

                    <AsksOrderBookTable askOrderBook={asksOrderBook} askOrderBookKeys={orderBookKeys?.asksKeys} listOfAsksSum ={listOfSum?.asksSum} />
                </> 
                : 
                <Spinner />   
            }
        </div>
    );
};

export default OrderBook;