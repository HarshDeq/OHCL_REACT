import { getRequest } from './axios';
import { HTTPS_REQUEST_BASE_URL } from './constants';

export const ohlcChartDataPromise = (timeFrame,diffInTimeStamp)=>{

    const response = getRequest(
        `${HTTPS_REQUEST_BASE_URL}/candles/trade:${timeFrame}:tBTCUSD/hist?start=${diffInTimeStamp}`
    );
    return response

}