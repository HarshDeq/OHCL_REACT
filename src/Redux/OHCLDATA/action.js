import axios from 'axios';
import {  SET_CANDLESTICK_DATA } from './actionTypes';

const setOHLCData = payload=>{
    return{
        type:SET_CANDLESTICK_DATA,
        payload
    };
};


export const formatData  =(payload) =>dispatch => {
    let formatedData = payload?.map(data=>{
        return {
            x:new Date(data[0]).toLocaleString('en-GB',{timezone:'Asia/Kolkata'}),
            y:[data[1],
                data[2],
                data[3],
                data[4],]
            
        };
    });
    dispatch(setOHLCData(formatedData));
}; 

export const getCandleStickData = (timeFrame)=>dispatch=>{
    const config = {
        method: 'GET',
        url: `https://api-pub.bitfinex.com/v2/candles/trade%3A${timeFrame}%3AtBTCUSD/hist`,
        headers: {accept: 'application/json'}
    };

    axios(config).then(response=>{
        const result = response?.data?.reverse()
        dispatch(formatData(result))
    }).catch(err=>{
        console.log(err)
    });
}