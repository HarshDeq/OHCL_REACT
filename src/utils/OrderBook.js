const CONSTANT_INDEX_FOR_NEW_ORDER ={
    PRICE_INDEX : 0,
    COUNT_INDEX:1,
    AMOUNT_INDEX : 2
}

export const updateAsksOrderBook = (askOrderBook,newOrder)=>{

    const asks = askOrderBook

    if (newOrder[CONSTANT_INDEX_FOR_NEW_ORDER.COUNT_INDEX] > 0) {
        asks[newOrder[CONSTANT_INDEX_FOR_NEW_ORDER.PRICE_INDEX]] = {
            count:newOrder[CONSTANT_INDEX_FOR_NEW_ORDER.COUNT_INDEX],
            amount: Math.abs(newOrder[CONSTANT_INDEX_FOR_NEW_ORDER.AMOUNT_INDEX]),
        };
    } else {
        delete asks[newOrder[CONSTANT_INDEX_FOR_NEW_ORDER.PRICE_INDEX]];
    }

    return asks
}


export const updateBidsOrderBook = (bidOrderBook,newOrder)=>{

    const bids = bidOrderBook;

    if (newOrder[CONSTANT_INDEX_FOR_NEW_ORDER.COUNT_INDEX] > 0) {
        bids[newOrder[CONSTANT_INDEX_FOR_NEW_ORDER.PRICE_INDEX]] = {count:newOrder[CONSTANT_INDEX_FOR_NEW_ORDER.COUNT_INDEX], amount:newOrder[CONSTANT_INDEX_FOR_NEW_ORDER.AMOUNT_INDEX]};
    } else {
        delete bids[newOrder[CONSTANT_INDEX_FOR_NEW_ORDER.PRICE_INDEX]];
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


