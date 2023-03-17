import React from 'react'
import Select from '../Components/Select'

// const ONE_MIN_TIME_FRAME = '1m'
const TIME_FRAMES = ['1m', '30m','1h','6h','12h','1D','1W', '1M']


const OHLC = () => {

    const handleTimeFrameChange =e=>{
        console.log(e.target.value)
    }

    return (
        <div >
            <div className='candlestick-timeframe-container'>
                <Select value = "1m" options = {TIME_FRAMES} onChange = {handleTimeFrameChange} />
            </div>
        </div>
    )
}

export default OHLC