import { SET_CANDLESTICK_DATA } from './actionTypes';


const init = {
    OHLC :[]
};


export const ohclReducer = (state=init,{payload, type}) =>{
    switch(type){
    case SET_CANDLESTICK_DATA:
        return{
            ...state, OHLC:payload
        };

   
    default:
        return state;
    }
};   