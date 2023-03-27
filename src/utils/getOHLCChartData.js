import { getRequest } from './axios';
import { HTTPS_REQUEST_BASE_URL } from './constants';
import {   notifyError, notifySuccess } from './notificationToast';

export const ohlcChartData = async (timeFrame,diffInTimeStamp,tradingPair)=>{

    const response = await getRequest(
        `${HTTPS_REQUEST_BASE_URL}/candles/trade:${timeFrame}:${tradingPair}/hist?start=${diffInTimeStamp}`
    );
    
    if(!response.error){
        notifySuccess('Data fetch succesfully')
    }
    else if(response.error){
        if(response.status=== 404){
            notifyError('Requets URL is Incorrect')
        }
        else{
            notifyError('Something went wrong')
        }
    }

    return response
}