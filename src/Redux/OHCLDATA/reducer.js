import { SET_DATA } from "./actionTypes"


const init = {
    OHCL :[ ]
}


export const ohclReducer = (state=init,{payload, type}) =>{
    switch(type){

        case SET_DATA:
            return{
                ...state, OHCL:[...state.OHCL, ...payload]
            }


        default:
            return state
    }
}   