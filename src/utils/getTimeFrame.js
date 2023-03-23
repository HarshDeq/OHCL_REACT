import { TIME_FRAME, TIME_STAMPS } from './constants'

export const getTimeFrame = (timeStamp) => {

    let timeFrame

    if(TIME_STAMPS.oneHour === timeStamp ){
        timeFrame = TIME_FRAME.oneMin
    }
    else if(TIME_STAMPS.sixHour === timeStamp){
        timeFrame=TIME_FRAME.fiveMin
    }
    else if(TIME_STAMPS.oneDay === timeStamp){
        timeFrame=TIME_FRAME.fifteenMin
    }
    else if(TIME_STAMPS.threeDay === timeStamp){
        timeFrame=TIME_FRAME.thirtyMin
    }
    else if(TIME_STAMPS.sevenDay === timeStamp){
        timeFrame=TIME_FRAME.oneHour
    }
    else if(TIME_STAMPS.oneMonth === timeStamp){
        timeFrame=TIME_FRAME.sixHour
    }
    else if(TIME_STAMPS.threeMonth === timeStamp){
        timeFrame=TIME_FRAME.twelveHour
    }
    else if(TIME_STAMPS.oneYear === timeStamp){
        timeFrame=TIME_FRAME.oneDay
    }
    else if(TIME_STAMPS.threeYear === timeStamp){
        timeFrame=TIME_FRAME.oneWeek
    }

    return timeFrame

}