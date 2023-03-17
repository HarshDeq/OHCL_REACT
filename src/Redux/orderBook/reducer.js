import { RESET_ORDER_BOOK_DATA, SET_ASK_ORDER_BOOK_DATA,SET_BID_ORDER_BOOK_DATA, SET_ORDER_BOOK_DATA, SET_ORDER_BOOK_SOCKET_CREATED} from './actionTypes';


const init = {
    asks:[],
    bids:[],
    orderBooKSocketCreated:false
};


const desce = 'desce'
const asce = 'aesce'


const popLastItem = (arr) =>{

    arr.pop()
    return arr
}

const sumOfAmount = (arr) => {

    let arrWithSum = []
    const indexOfLastSumofPrice = 3
    const indexOfCurrentItemPrice = 2

    for(let i=0;i<arr.length;i++){

        if(i ===0){
            arrWithSum.push([...arr[i].slice(0,3),arr[i][indexOfCurrentItemPrice]]) 
        }else{
            arrWithSum.push([...arr[i].slice(0,3),arr[i][indexOfCurrentItemPrice] +  arrWithSum[i-1][indexOfLastSumofPrice] ]) 
        }

    }

    return arrWithSum

}


const sortByPrice = (arr, sortBy)=>{
    
    const indexOfPrice = 0
    let sortedArr=[]
    
    if(sortBy === asce){
        
        sortedArr = arr?.sort((a,b)=>a[indexOfPrice] - b[indexOfPrice] )

    }
    else if(sortBy === desce){
        sortedArr = arr?.sort((a,b)=>b[indexOfPrice] - a[indexOfPrice] )
    }

    let arrWithSum = sumOfAmount(sortedArr)

    return arrWithSum
}





export const orderBookReducer = (state=init, {type, payload})=>{

   
    switch(type){


    case SET_ORDER_BOOK_DATA:
        return {
            ...state, bids:[...sortByPrice(payload?.bids,asce)] , asks:[...sortByPrice(payload?.asks,desce)]
        };

    case RESET_ORDER_BOOK_DATA:
        return {
            state :init
        };

    case SET_ASK_ORDER_BOOK_DATA:
        return {
            ...state, asks: [...popLastItem(
                sortByPrice([...state.asks,payload],desce)
            )]
        };
        
    case SET_BID_ORDER_BOOK_DATA:
        return {
            ...state, bids: [...popLastItem(
                sortByPrice([...state.bids,payload],asce)
            )]
        };

    case SET_ORDER_BOOK_SOCKET_CREATED:
        return {
            ...state, orderBooKSocketCreated:payload
        }

    default:
        return state;
    }
};