import { getRequest, requestNotification } from './axios';
import { HTTPS_REQUEST_BASE_URL } from './constants';


export const ohlcChartData = async (timeFrame,diffInTimeStamp,tradingPair)=>{

    const response = await getRequest(
        `${HTTPS_REQUEST_BASE_URL}/candles/trade:${timeFrame}:${tradingPair}/hist?start=${diffInTimeStamp}&limit=500`
    );
    
    requestNotification(response.error, response.status)

    return response
}