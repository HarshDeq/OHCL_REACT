import { RESET_ORDER_BOOK_DATA, SET_NEGATIVE_BOOK_DATA, SET_ORDER_BOOK_DATA, SET_ORDER_BOOK_SOCKET_CREATED, SET_POSITIVE_BOOK_DATA } from './actionTypes';


const init = {
    positive:[],
    negative:[],
    orderBooKSocketCreated:false
};


export const orderBookReducer = (state=init, {type, payload})=>{

    const popPush = (arr, newItem)=>{
        let newArr = arr;
        newArr.pop();
        newArr.push(newItem);
        return newArr;

    };

    switch(type){


    case SET_ORDER_BOOK_DATA:
        return {
            ...state, negative:payload?.negative, positive:payload?.positive
        };

    case RESET_ORDER_BOOK_DATA:
        return {
            state :init
        };

    case SET_POSITIVE_BOOK_DATA:
        return {
            ...state, positive:[...popPush(state?.positive,payload)]
        };
        
    case SET_NEGATIVE_BOOK_DATA:
        return {
            ...state, negative:[...popPush(state?.negative,payload)]
        };

    case SET_ORDER_BOOK_SOCKET_CREATED:
        return {
            ...state, orderBooKSocketCreated:payload
        }

    default:
        return state;
    }
};