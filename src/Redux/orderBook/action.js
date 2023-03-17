import { RESET_ORDER_BOOK_DATA,  SET_ASK_ORDER_BOOK_DATA,  SET_BID_ORDER_BOOK_DATA,  SET_ORDER_BOOK_DATA, SET_ORDER_BOOK_SOCKET_CREATED, } from './actionTypes';

export const setOrderBookdata = (payload)=>{
    return {
        type:SET_ORDER_BOOK_DATA,
        payload
    };   
};

export const resetOrderBook = ()=>{
    return {
        type:RESET_ORDER_BOOK_DATA
    };
};

export const setAskData = (payload)=>{
    return{
        type:SET_ASK_ORDER_BOOK_DATA,payload
    };
};

export const setBidData = (payload)=>{
    
    return{
        type:SET_BID_ORDER_BOOK_DATA,payload
    };
};


export const setOrderBookSocketCreated = created=>{
    return{
        type:SET_ORDER_BOOK_SOCKET_CREATED,
        payload:created
    }

}