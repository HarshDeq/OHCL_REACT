import { RESET_ORDER_BOOK_DATA, SET_NEGATIVE_BOOK_DATA, SET_ORDER_BOOK_DATA, SET_ORDER_BOOK_SOCKET_CREATED, SET_POSITIVE_BOOK_DATA } from './actionTypes';

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

export const setPostiveData = (payload)=>{
    return{
        type:SET_POSITIVE_BOOK_DATA,payload
    };
};

export const setNegativeData = (payload)=>{
    
    return{
        type:SET_NEGATIVE_BOOK_DATA,payload
    };
};


export const setOrderBookSocketCreated = created=>{
    return{
        type:SET_ORDER_BOOK_SOCKET_CREATED,
        payload:created
    }

}