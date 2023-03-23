import React, { useEffect, useState } from 'react';
import AsksOrderBookTable from '../Components/AsksOrderBookTable';
import BidOrderBookTable from '../Components/BidOrderBookTable';
import Spinner from '../Components/Spinner';
import { getListOfSumOFOrderBook, updateAsksOrderBook, updateBidsOrderBook } from '../utils/OrderBook';

const OrderBook = () => {
    const [asksOrderBook, setAsksOrderBook] = useState({});
    const [bidsOrderBook, setBidsOrderBook] = useState({});

    // const [open, response, socket] = useWebSocket(WEB_SOCKET_BASE_URL)

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
        const DEFAULT_COMPARISON_AMOUNT = 0
        const AMOUNT_INDEX = 2;

        if (order[AMOUNT_INDEX] > DEFAULT_COMPARISON_AMOUNT) {
            updateBids(order);
        } else {
            updateAsks(order);
        }

    }
  

    useEffect(() => {

        const SOCKET_URL = 'wss://api-pub.bitfinex.com/ws/2';

        const SOCKET = new WebSocket(SOCKET_URL);

        const BOOK = JSON.stringify({
            event: 'subscribe',
            channel: 'book',
            symbol: 'tBTCUSD',
            prec: 'P1',
            freq:'F1'
        });

        SOCKET.onopen = () => {
            SOCKET.send(BOOK);
        };

        SOCKET.onmessage = (e) => {
            const INITIAL_LENGTH_OF_ORDER_BOOK = 50
            const LENGTH_OF_ONE_ORDER = 3
            const INDEX_OF_ORDER_IN_RESPONSE = 1
                
            const orderBookData = JSON.parse(e.data)[INDEX_OF_ORDER_IN_RESPONSE];


            if (orderBookData?.length === INITIAL_LENGTH_OF_ORDER_BOOK) {
                orderBookData?.forEach((order) => {
                    updateOrderBookBasedOnAmount( order)
                });
            } else if (orderBookData?.length === LENGTH_OF_ONE_ORDER) {
                updateOrderBookBasedOnAmount(orderBookData)
            }
        };
    
        SOCKET.onclose=()=>{
            console.log('close')
            
        }

        return ()=>{
            SOCKET.close()
        }

       
        // if(open){
        //     socket.send(BOOK)
        // }


    }, []);

    // useEffect(()=>{

    //     const AMOUNT_INDEX = 2;
    //     const INDEX_OF_ORDER_IN_RESPONSE = 1
    //     const LENGTH_OF_ONE_ORDER = 3
    //     const INITIAL_LENGTH_OF_ORDER_BOOK = 50


    //     const order = response?.[INDEX_OF_ORDER_IN_RESPONSE]

    //     // console.log(order !== undefined, order)
           
                
    //     if ( order?.length === INITIAL_LENGTH_OF_ORDER_BOOK) {
    //         order?.forEach((newOrder) => {
    //             // console.log(newOrder,"new")
    //             if (newOrder[AMOUNT_INDEX] > 0) {
    //                 updateBids(newOrder);
    //             } else {
    //                 updateAsks(newOrder);
    //             }
                   
    //         });
    //     } 
    //     else if ( order?.length === LENGTH_OF_ONE_ORDER) {
    //         // console.log(order,"order")
    //         if (order[AMOUNT_INDEX] > 0) {
    //             updateBids(order);
    //         } else {
    //             updateAsks(order);
    //         }
    //     }

      
    // },[response])


    return (
        <div className="oder-book-conatiner">   

            { orderBookKeys?.bidsKeys.length    ||orderBookKeys?.asksKeys.length  ?
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
