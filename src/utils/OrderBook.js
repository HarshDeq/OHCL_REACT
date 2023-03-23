const constantIndexForOrder ={
    PRICE_INDEX : 0,
    COUNT_INDEX:1,
    AMOUNT_INDEX : 2
}

export const updateAsksOrderBook = (askOrderBook,newOrder)=>{

    const asks = askOrderBook

    if (newOrder[constantIndexForOrder.COUNT_INDEX] > 0) {
        asks[newOrder[constantIndexForOrder.PRICE_INDEX]] = {
            count:newOrder[constantIndexForOrder.COUNT_INDEX],
            amount: Math.abs(newOrder[constantIndexForOrder.AMOUNT_INDEX]),
        };
    } else {
        delete asks[newOrder[constantIndexForOrder.PRICE_INDEX]];
    }

    return asks
}


export const updateBidsOrderBook = (askOrderBook,newOrder)=>{

    const bids = askOrderBook;

    if (newOrder[constantIndexForOrder.COUNT_INDEX] > 0) {
        bids[newOrder[constantIndexForOrder.PRICE_INDEX]] = {count:newOrder[constantIndexForOrder.COUNT_INDEX], amount:newOrder[constantIndexForOrder.AMOUNT_INDEX]};
    } else {
        delete bids[newOrder[constantIndexForOrder.PRICE_INDEX]];
    }

    return bids

}


export const getListOfSumOFOrderBook = (orderBookKeys, orderBook) => {
    const INTIAL_INDEX = 0
    const listOfSum = [];

    orderBookKeys?.forEach((price, index) => {
        if (index === INTIAL_INDEX) {
            listOfSum.push(orderBook[price].amount);
        } else {
            listOfSum.push(orderBook[price].amount + listOfSum[index - 1]);
        }
    });

    return listOfSum;
};


