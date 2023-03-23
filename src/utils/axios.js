import axios from 'axios';

export const getRequest = async (url, config) => {
    try {
        const response = await axios.get(url, config);
        // console.log(response)
        return response;
    } catch (err) {
        console.log(err.response.status);
    }
};

export const postRequest = async (url, requestData, config) => {
    try {
        const response = await axios.post(url, requestData, config);
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const putRequest = async (url, updateRequestData, config) => {
    try {
        const response = await axios.put(url, updateRequestData, config);
        return response;
    } catch (err) {
        console.log(err);
    }
};
