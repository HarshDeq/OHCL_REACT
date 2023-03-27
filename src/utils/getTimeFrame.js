import {  TIME_DURATON, TIME_FRAME } from './constants'

export const getTimeFrame = (timeStamp) => {

    if(TIME_DURATON.oneHour === timeStamp ){
        return TIME_FRAME.oneMin
    }
    else if(TIME_DURATON.sixHour === timeStamp){
        return TIME_FRAME.fiveMin
    }
    else if(TIME_DURATON.oneDay === timeStamp){
        return TIME_FRAME.fifteenMin
    }
    else if(TIME_DURATON.threeDay === timeStamp){
        return TIME_FRAME.thirtyMin
    }
    else if(TIME_DURATON.sevenDay === timeStamp){
        return TIME_FRAME.oneHour
    }
    else if(TIME_DURATON.oneMonth === timeStamp){
        return TIME_FRAME.sixHour
    }
    else if(TIME_DURATON.threeMonth === timeStamp){
        return TIME_FRAME.twelveHour
    }
    else if(TIME_DURATON.oneYear === timeStamp){
        return TIME_FRAME.oneDay
    }
    else if(TIME_DURATON.threeYear === timeStamp){
        return TIME_FRAME.oneWeek
    }
}