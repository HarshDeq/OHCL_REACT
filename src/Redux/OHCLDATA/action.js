import { RESET_DATA, SET_DATA } from "./actionTypes"

const setData = payload=>{
    return{
        type:SET_DATA,
        payload
    }
}

export const resetData = () =>{
    return {
        type:RESET_DATA
    }
}


export const formatData  =(payload) =>dispatch => {
    let formatedData = payload?.map(data=>{
        return {
            Date: new Date(data[0]),
        Open: data[1],
        High: data[2],
        Low: data[3],
        Close: data[4],
        Volume: data[5]
        }
    })
    

    dispatch(setData(formatedData))
} 