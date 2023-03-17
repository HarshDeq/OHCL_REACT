import axios from 'axios';
import {  SET_CANDLESTICK_DATA } from './actionTypes';

const setOHLCData = payload=>{
    return{
        type:SET_CANDLESTICK_DATA,
        payload
    };
};


export const formatData  =(payload) =>dispatch => {

    const constantIndex = {
        date:0,
        O:1,
        H:3,
        L:4,
        C:2
    }

    let formatedData = payload?.map(data=>{
        return {
            x:new Date(data[constantIndex?.date]),
            y:[data[constantIndex?.O],
                data[constantIndex?.H],
                data[constantIndex?.L],
                data[constantIndex?.C],]
            
        };
    });
    dispatch(setOHLCData(formatedData));
}; 

export const getCandleStickData = (timeFrame)=>dispatch=>{
    const config = {
        method: 'GET',
        url: `https://api-pub.bitfinex.com/v2/candles/trade%3A${timeFrame}%3AtBTCUSD/hist?limit=100`,
        headers: {accept: 'application/json'}
    };

    axios(config).then(response=>{
        const result = response?.data?.reverse()
        dispatch(formatData(result))
    }).catch(err=>{
        console.log(err)
    });
}