import { TIME_FRAME, TIME_STAMPS } from './constants'

export const getTimeFrame = (timeStamp) => {

    if(TIME_STAMPS.oneHour === timeStamp ){
        return TIME_FRAME.oneMin
    }
    else if(TIME_STAMPS.sixHour === timeStamp){
        return TIME_FRAME.fiveMin
    }
    else if(TIME_STAMPS.oneDay === timeStamp){
        return TIME_FRAME.fifteenMin
    }
    else if(TIME_STAMPS.threeDay === timeStamp){
        return TIME_FRAME.thirtyMin
    }
    else if(TIME_STAMPS.sevenDay === timeStamp){
        return TIME_FRAME.oneHour
    }
    else if(TIME_STAMPS.oneMonth === timeStamp){
        return TIME_FRAME.sixHour
    }
    else if(TIME_STAMPS.threeMonth === timeStamp){
        return TIME_FRAME.twelveHour
    }
    else if(TIME_STAMPS.oneYear === timeStamp){
        return TIME_FRAME.oneDay
    }
    else if(TIME_STAMPS.threeYear === timeStamp){
        return TIME_FRAME.oneWeek
    }
}