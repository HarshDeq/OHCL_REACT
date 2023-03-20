import React, { useEffect, useState } from 'react'

const OrderBook = () => {

    const [asksData, setAsksData] = useState({
    })
    const [bidsData, setBidsData] = useState({
    })

    const [objKeys,setObjKeys] = useState({
        asksKeys:[],
        bidsKeys:[]
    })

    const [listOfSum,setListOfSum] = useState({
        asksSum:[]
        , bidSum:[]
    })

    
    const SOCKET_URL = 'wss://api-pub.bitfinex.com/ws/2'

    const getAListOfSum = (keys, arr)=>{

        const listOfSum =[]

        keys?.forEach((price, index)=>{
            if(index === 0){
                listOfSum.push(arr[price][1])
            }else{
                listOfSum.push((arr[price][1] + listOfSum[index-1]) )
            }
        })

        return listOfSum

    }


    const updataAskAndBid = (data)=>{
        const COUNT_INDEX = 1 , PRICE_INDEX = 0, AMOUNT_INDEX = 2
        const asks = asksData
        const bids = bidsData
       
        
        if(data[COUNT_INDEX] > 0){
            if(data[AMOUNT_INDEX] > 0){
                bids[data[PRICE_INDEX]] = [data[COUNT_INDEX], data[AMOUNT_INDEX]]
            }else if(data[AMOUNT_INDEX] < 0){
                asks[data[PRICE_INDEX]] = [data[COUNT_INDEX], Math.abs(data[AMOUNT_INDEX])]
            }
        }
        else {
            if(data[AMOUNT_INDEX] === 1){
                delete bids[ data[PRICE_INDEX]  ]
            }
            else if(data[AMOUNT_INDEX] === -1){
                delete asks[data[PRICE_INDEX]]
            }
        }
               
        const ASKS_KEYS = Object?.keys(asks)
        const BIDS_KEYS = Object?.keys(bids)?.reverse()

        const ASK_SUM_LIST = getAListOfSum(ASKS_KEYS,asks)
        const BID_SUM_LIST = getAListOfSum(BIDS_KEYS, bids)

        
        setObjKeys({
            asksKeys:ASKS_KEYS,
            bidsKeys:BIDS_KEYS
        })
        
        setAsksData({...asks})
        setBidsData({...bids})

        setListOfSum({
            asksSum:ASK_SUM_LIST,
            bidSum:BID_SUM_LIST
        })
        
        
    }

    const connect = ()=> {

        const socket = new WebSocket(SOCKET_URL)
       

        const BOOK = JSON.stringify({
            event: 'subscribe',
            channel: 'book',
            symbol: 'tBTCUSD',
            freq:'F0',
            prec:'P0'
        });

        socket.onopen=()=>{
            socket.send(BOOK)
        }
        
        socket.onmessage=(e)=>{
            const orderBookData = JSON.parse(e.data)[1]


            if(orderBookData?.length === 50){

                
                orderBookData?.forEach((data)=>{
                    updataAskAndBid(data)
                })
            }
            else if(orderBookData?.length === 3){
                updataAskAndBid(orderBookData)
            }


        }
        

        return () =>{
            socket.close()
        }

    }


    useEffect(()=>{
        connect()
    },[])


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
                       
                        {objKeys?.bidsKeys?.map((price, index) => (
                            <tr key ={price} className='bid-animation'>
                                <td>{bidsData[price][0]}</td>
                                <td>
                                    {bidsData[price][1]}
                                </td>
                                <td>
                                    {listOfSum?.bidSum[index]}

                                </td>
                                <td>
                                    {price}
                                </td>

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
                       
                        {objKeys?.asksKeys?.map((price, index) => (
                            <tr key ={price} className='ask-animation'>
                                <td>
                                    {price}
                                </td>
                                <td>
                                    {listOfSum?.asksSum[index]}

                                </td>
                                <td>
                                    {asksData[price][1]}
                                </td>
                                <td>{asksData[price][0]}</td>

                            </tr>
                            
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default OrderBook