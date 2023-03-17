import axios from 'axios';


export const getRequest = async (url) => {
    try{
        const response = await axios.get(
            url,
        );
        return response
    }catch(err){
        console.log(err)
    }
};


export const postRequest = async(url, requestData) =>{
    try{
        const response = await axios.post(
            url,requestData
        );
        return response
    }catch(err){
        console.log(err)
    }
}

export const putRequest = async(url, updateRequestData) =>{
    try{
        const response = await axios.put(
            url,updateRequestData
        );
        return response
    }catch(err){
        console.log(err)
    }
}