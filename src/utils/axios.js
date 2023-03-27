import axios from 'axios';
import { notifyError, notifySuccess } from './notificationToast';

export const getRequest = async (url, config) => {
    try {
        const response = await axios.get(url, config);
        return {
            error:false,
            data:response.data,
            status:response.status
        }
    } catch (err) {

        return {
            status:err.response.status,
            error:true
        }
    }
};

export const postRequest = async (url, requestData, config) => {
    try {
        const response = await axios.post(url, requestData, config);
        return {
            error:false,
            data:response.data,
            status:response.status
        }
    } catch (err) {
        return {
            status:err.response.status,
            error:true
        }
    }
};

export const putRequest = async (url, updateRequestData, config) => {
    try {
        const response = await axios.put(url, updateRequestData, config);
        return {
            error:false,
            data:response.data,
            status:response.status
        }
    } catch (err) {
        return {
            status:err.response.status,
            error:true
        }
    }
};


export const requestNotification = (error,status)=>{
    if(!error && status === 200){
        notifySuccess('Data fetch succesfully')
    }
    else if(error){
        if(status=== 404){
            notifyError('Requets URL is Incorrect')
        }
        else{
            notifyError('Something went wrong')
        }
    }
}
